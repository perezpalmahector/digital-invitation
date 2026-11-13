import type { FamiliaInvitada } from "../types/config/familia.types";

// const API_URL = "http://localhost:3001/api/familias";
const API_URL = "/api/familias";

export const obtenerFamilias = async (): Promise<FamiliaInvitada[]> => {
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

  return resultado.data as FamiliaInvitada[];
};

export const obtenerFamiliaPorId = async (
  id: string,
): Promise<FamiliaInvitada | undefined> => {
  const familias = await obtenerFamilias();

  return familias.find((familia) => familia.id === id);
};

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
