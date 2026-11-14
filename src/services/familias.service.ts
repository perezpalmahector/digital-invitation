import type { FamiliaInvitada } from "../types/config/familia.types";

const API_URL = "/api/familias";

export type FamiliaConRowId = FamiliaInvitada & {
  rowId?: number;
};

export type NuevaFamiliaInput = Omit<FamiliaInvitada, "id"> & {
  rowId?: number;
};

/**
 * Genera un rowId numérico único de 16 dígitos (ej. 1794614400123842)
 * seguro dentro de Number.MAX_SAFE_INTEGER.
 */
export const generarRowId = (): number => {
  const timestamp = Date.now(); // 13 dígitos
  const aleatorio = Math.floor(100 + Math.random() * 900); // 3 dígitos
  return Number(`${timestamp}${aleatorio}`);
};

/**
 * Genera el identificador textual para las URLs de invitación
 * basado en el rowId numérico (ej. "FAM-1794614400123842").
 */
export const generarIdFamilia = (rowId: number = generarRowId()): string => {
  return `FAM-${rowId}`;
};

// =========================================
// CONSULTAR TODAS LAS FAMILIAS (GET)
// =========================================
export const obtenerFamilias = async (): Promise<FamiliaConRowId[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No fue posible consultar las familias.");
  }

  const resultado: unknown = await response.json();

  if (
    typeof resultado !== "object" ||
    resultado === null ||
    !("success" in resultado) ||
    resultado.success !== true ||
    !("data" in resultado) ||
    !Array.isArray(resultado.data)
  ) {
    throw new Error("La respuesta de la API no contiene un arreglo válido.");
  }

  return resultado.data as FamiliaConRowId[];
};

// =========================================
// CONSULTAR FAMILIA POR ID O ROWID
// =========================================
export const obtenerFamiliaPorId = async (
  id: string,
): Promise<FamiliaConRowId | undefined> => {
  const familias = await obtenerFamilias();

  return familias.find(
    (familia) =>
      familia.id === id ||
      (familia.rowId !== undefined && String(familia.rowId) === id),
  );
};

// =========================================
// INSERTAR NUEVA FAMILIA (POST)
// =========================================
export const crearFamilia = async (
  datos: NuevaFamiliaInput,
): Promise<FamiliaConRowId> => {
  const rowId = datos.rowId ?? generarRowId();
  const id = generarIdFamilia(rowId);

  const nuevaFamilia: FamiliaConRowId = {
    ...datos,
    rowId,
    id,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaFamilia),
  });

  const resultado = await response.json();

  if (!response.ok || !resultado.success) {
    throw new Error(
      resultado.message || "No fue posible registrar la nueva familia.",
    );
  }

  return resultado.data as FamiliaConRowId;
};

// =========================================
// MODIFICAR FAMILIA EXISTENTE (PUT)
// =========================================
export const actualizarFamilia = async (
  id: string,
  datos: Partial<Omit<FamiliaConRowId, "id" | "rowId">>,
): Promise<FamiliaConRowId> => {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const resultado = await response.json();

  if (!response.ok || !resultado.success) {
    throw new Error(
      resultado.message || "No fue posible actualizar la familia.",
    );
  }

  return resultado.data as FamiliaConRowId;
};

// =========================================
// ELIMINAR FAMILIA (DELETE)
// =========================================
export const eliminarFamilia = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  const resultado = await response.json();

  if (!response.ok || !resultado.success) {
    throw new Error(resultado.message || "No fue posible eliminar la familia.");
  }
};

// =========================================
// RESUMEN DE INVITADOS
// =========================================
export const obtenerResumenFamilias = async () => {
  const familias = await obtenerFamilias();

  return {
    totalFamilias: familias.length,

    totalAdultos: familias.reduce(
      (total, familia) => total + familia.adultos,
      0,
    ),

    totalNinos: familias.reduce((total, familia) => total + familia.ninos, 0),

    totalInvitados: familias.reduce(
      (total, familia) => total + familia.adultos + familia.ninos,
      0,
    ),
  };
};
