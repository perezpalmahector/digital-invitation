import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
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

const TMP_FILE = path.join(os.tmpdir(), "familias.json");
const BUNDLED_FILE = path.join(process.cwd(), "data", "familias.json");
const ACTIVE_FILE = process.env.NETLIFY ? TMP_FILE : BUNDLED_FILE;

export const obtenerFamiliasDrive = async (): Promise<FamiliaRecord[]> => {
  // 1. Lee el archivo activo (/tmp/familias.json en Netlify o data/familias.json en local)
  try {
    const contenido = await readFile(ACTIVE_FILE, "utf-8");
    const parsed = JSON.parse(contenido);
    if (Array.isArray(parsed)) {
      return parsed as FamiliaRecord[];
    }
  } catch {
    // Si aún no existe en /tmp (primera ejecución en Netlify), continúa al paso 2
  }

  // 2. Lee el archivo base empaquetado en el deploy (data/familias.json)
  try {
    const baseData = await readFile(BUNDLED_FILE, "utf-8");
    const parsed = JSON.parse(baseData);
    if (Array.isArray(parsed)) {
      await guardarFamiliasDrive(parsed as FamiliaRecord[]);
      return parsed as FamiliaRecord[];
    }
  } catch {
    // Si tampoco existe data/familias.json, intenta descargar de Drive como último recurso
  }

  // 3. Respaldo desde Google Drive
  const response = await fetch(googleDriveConfig.downloadUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!response.ok) {
    throw new Error(`Error Google Drive: ${response.status}`);
  }

  const datos: unknown = await response.json();
  const listaInicial = Array.isArray(datos)
    ? datos
    : datos &&
        typeof datos === "object" &&
        "data" in datos &&
        Array.isArray((datos as { data: unknown }).data)
      ? (datos as { data: FamiliaRecord[] }).data
      : datos &&
          typeof datos === "object" &&
          "familias" in datos &&
          Array.isArray((datos as { familias: unknown }).familias)
        ? (datos as { familias: FamiliaRecord[] }).familias
        : [];

  await guardarFamiliasDrive(listaInicial as FamiliaRecord[]);
  return listaInicial as FamiliaRecord[];
};

export const guardarFamiliasDrive = async (
  familias: FamiliaRecord[],
): Promise<void> => {
  await mkdir(path.dirname(ACTIVE_FILE), { recursive: true });
  await writeFile(ACTIVE_FILE, JSON.stringify(familias, null, 2), "utf-8");
};
