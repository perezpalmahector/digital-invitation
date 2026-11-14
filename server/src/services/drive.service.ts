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

// Usa carpeta temporal en Netlify o una carpeta local data/
const DATA_DIR = process.env.NETLIFY
  ? os.tmpdir()
  : path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "familias.json");

export const obtenerFamiliasDrive = async (): Promise<FamiliaRecord[]> => {
  // 1. Si ya existe el archivo con cambios guardados, lo lee directo
  try {
    const contenidoLocal = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(contenidoLocal);
    if (Array.isArray(parsed)) {
      return parsed as FamiliaRecord[];
    }
  } catch {
    // Si aún no existe, continúa para descargarlo de Google Drive
  }

  // 2. Descarga tus familias iniciales desde tu Google Drive actual
  const response = await fetch(googleDriveConfig.downloadUrl);
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
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE_PATH, JSON.stringify(familias, null, 2), "utf-8");
};
