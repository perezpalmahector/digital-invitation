import { googleDriveConfig } from "../config/google-drive.config";

export interface FamiliaRecord {
  id: string;
  rowId?: number;
  usuario_id?: string;
  familia: string;
  adultos: number;
  ninos: number;
  telefono: string;
  estado: string;
  mensajeFamilia: string;
  [key: string]: unknown;
}

const DEFAULT_USUARIO_ID = "00000000-0000-0000-0000-000000000001";

const getSupabaseHeaders = () => {
  const url = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");
  const key = (process.env.SUPABASE_SERVICE_KEY || "").trim();

  if (!url || !key) {
    throw new Error(
      "Faltan las variables SUPABASE_URL o SUPABASE_SERVICE_KEY.",
    );
  }

  return {
    baseUrl: `${url}/rest/v1/familias`,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  };
};

const descargarSemillaDesdeDrive = async (): Promise<FamiliaRecord[]> => {
  try {
    const response = await fetch(googleDriveConfig.downloadUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!response.ok) return [];
    const datos: unknown = await response.json();
    if (Array.isArray(datos)) return datos as FamiliaRecord[];
    if (datos && typeof datos === "object" && "data" in datos) {
      return (datos as { data: FamiliaRecord[] }).data;
    }
    return [];
  } catch {
    return [];
  }
};
// =========================================
// 1. CONSULTAR FAMILIAS DESDE SUPABASE
// =========================================
// =========================================
// 1. CONSULTAR FAMILIAS DESDE SUPABASE
// =========================================
export const obtenerFamiliasDrive = async (
  usuarioId: string = DEFAULT_USUARIO_ID,
): Promise<FamiliaRecord[]> => {
  const { baseUrl, headers } = getSupabaseHeaders();

  const query = `${baseUrl}?usuario_id=eq.${encodeURIComponent(usuarioId)}&order=actualizado_en.desc`;
  const response = await fetch(query, { method: "GET", headers });

  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(`Error Supabase GET (${response.status}): ${detalle}`);
  }

  return (await response.json()) as FamiliaRecord[];
};

// =========================================
// 2. GUARDAR / SINCRONIZAR ARREGLO COMPLETO (UPSERT + DELETE)
// =========================================
export const guardarFamiliasDrive = async (
  familias: FamiliaRecord[],
  usuarioId: string = DEFAULT_USUARIO_ID,
): Promise<void> => {
  const { baseUrl, headers } = getSupabaseHeaders();

  // Obtenemos los IDs actuales en BD para detectar si alguno fue eliminado
  const resActuales = await fetch(
    `${baseUrl}?select=id&usuario_id=eq.${encodeURIComponent(usuarioId)}`,
    { method: "GET", headers },
  );

  if (resActuales.ok) {
    const existentes = (await resActuales.json()) as { id: string }[];
    const idsNuevos = new Set(familias.map((f) => f.id));
    const idsABorrar = existentes
      .map((e) => e.id)
      .filter((id) => !idsNuevos.has(id));

    for (const idBorrar of idsABorrar) {
      await fetch(`${baseUrl}?id=eq.${encodeURIComponent(idBorrar)}`, {
        method: "DELETE",
        headers,
      });
    }
  }

  if (familias.length === 0) return;

  // Preparamos las filas limpias para PostgreSQL
  const payload = familias.map((f) => ({
    id: f.id,
    rowId:
      f.rowId ??
      Number(`${Date.now()}${Math.floor(100 + Math.random() * 900)}`),
    usuario_id: f.usuario_id || usuarioId,
    familia: f.familia,
    adultos: Number(f.adultos) || 0,
    ninos: Number(f.ninos) || 0,
    telefono: f.telefono || "",
    estado: f.estado || "pendiente",
    mensajeFamilia: f.mensajeFamilia || "",
    actualizado_en: new Date().toISOString(),
  }));

  // Upsert: inserta las nuevas y actualiza las existentes en una sola petición
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(`Error Supabase UPSERT (${response.status}): ${detalle}`);
  }
};
