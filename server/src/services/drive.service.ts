import { googleDriveConfig } from "../config/google-drive.config";

export const obtenerFamiliasDrive = async (): Promise<unknown[]> => {
  const response = await fetch(googleDriveConfig.downloadUrl);

  if (!response.ok) {
    throw new Error(`Error Google Drive: ${response.status}`);
  }

  const contenido = await response.text();

  let datos: unknown;

  try {
    datos = JSON.parse(contenido);
  } catch {
    throw new Error("El archivo de Google Drive no contiene JSON válido.");
  }

  // Caso 1: JSON directamente como arreglo
  if (Array.isArray(datos)) {
    return datos;
  }

  // Caso 2: JSON con propiedad data
  if (
    typeof datos === "object" &&
    datos !== null &&
    "data" in datos &&
    Array.isArray(datos.data)
  ) {
    return datos.data;
  }

  // Caso 3: JSON con propiedad familias
  if (
    typeof datos === "object" &&
    datos !== null &&
    "familias" in datos &&
    Array.isArray(datos.familias)
  ) {
    return datos.familias;
  }

  throw new Error(
    "Estructura JSON incorrecta. Se esperaba un arreglo de familias.",
  );
};
