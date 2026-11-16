import { getStore } from "@netlify/blobs";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { googleDriveConfig } from "../config/google-drive.config";

export interface FamiliaRecord {
  id: string;
  rowId?: number;
  familia: string;
  adultos: number;
  ninos: number;
  telefono: string;
  estado: string;
  mensajeFamilia: string;
  [key: string]: unknown;
}

const STORE_NAME = "invitacion-digital";
const BLOB_KEY = "familias-data";
const LOCAL_FILE = path.join(process.cwd(), "data", "familias.json");

const extraerLista = (datos: unknown): FamiliaRecord[] => {
  if (Array.isArray(datos)) return datos as FamiliaRecord[];
  if (datos && typeof datos === "object") {
    if ("data" in datos && Array.isArray((datos as { data: unknown }).data)) {
      return (datos as { data: FamiliaRecord[] }).data;
    }
    if (
      "familias" in datos &&
      Array.isArray((datos as { familias: unknown }).familias)
    ) {
      return (datos as { familias: FamiliaRecord[] }).familias;
    }
  }
  return [];
};

const descargarSemillaDesdeDrive = async (): Promise<FamiliaRecord[]> => {
  const response = await fetch(googleDriveConfig.downloadUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    return [];
  }

  const datos: unknown = await response.json();
  return extraerLista(datos);
};

// =========================================
// LEER FAMILIAS (Netlify Blobs en producción / JSON en local)
// =========================================
export const obtenerFamiliasDrive = async (): Promise<FamiliaRecord[]> => {
  // En producción (Netlify) usa Netlify Blobs
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const store = getStore(STORE_NAME);
    const guardadas = await store.get(BLOB_KEY, { type: "json" });

    if (Array.isArray(guardadas)) {
      return guardadas as FamiliaRecord[];
    }

    // Si es la primera vez y el almacén está vacío, carga los datos iniciales de Drive
    const iniciales = await descargarSemillaDesdeDrive();
    if (iniciales.length > 0) {
      await store.setJSON(BLOB_KEY, iniciales);
    }
    return iniciales;
  }

  // En desarrollo local sigue usando data/familias.json
  try {
    const contenido = await readFile(LOCAL_FILE, "utf-8");
    return extraerLista(JSON.parse(contenido));
  } catch {
    const iniciales = await descargarSemillaDesdeDrive();
    await guardarFamiliasDrive(iniciales);
    return iniciales;
  }
};

// =========================================
// GUARDAR FAMILIAS DE FORMA PERMANENTE
// =========================================
export const guardarFamiliasDrive = async (
  familias: FamiliaRecord[],
): Promise<void> => {
  // En producción (Netlify) guarda de forma permanente en Netlify Blobs
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const store = getStore(STORE_NAME);
    await store.setJSON(BLOB_KEY, familias);
    return;
  }

  // En desarrollo local guarda en data/familias.json
  await mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(familias, null, 2), "utf-8");
};
