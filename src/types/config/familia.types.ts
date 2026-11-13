export type EstadoInvitacion =
  | "pendiente"
  | "enviada"
  | "confirmada"
  | "cancelada";

export interface FamiliaInvitada {
  id: string;
  familia: string;
  adultos: number;
  ninos: number;
  telefono: string;
  mensajeFamilia: string;
  estado: EstadoInvitacion;
}
