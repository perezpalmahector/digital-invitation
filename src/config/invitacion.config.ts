import type { InvitacionConfig } from "../types/config/invitacion.types";

export const invitacionConfig: InvitacionConfig = {
  general: {
    slug: "mary",
    nombre: "Mary",
    nombreCompleto: "María Guadalupe Martinez Miranda",
    edad: 18,
    tipoEvento: "XVIII Años",
    titulo: "Mis XVIII Años",
    descripcion: "Una noche mágica para celebrar mis 18 años",
  },

  evento: {
    fecha: "2026-12-18",
    hora: "17:00",
    zonaHoraria: "America/Mexico_City",
  },

  personalizacion: {
    tema: "mary-rose-champagne",
    mostrarMenu: true,
    mostrarSobre: true,
    mostrarGaleria: true,
    mostrarVideo: true,
    mostrarMesaRegalos: true,
    mostrarConfirmacion: true,
  },

  contacto: {
    whatsapp: "",
    telefono: "",
    fechaLimiteConfirmacion: "",
  },

  multimedia: {
    portada: "/images/portada/mary.jpg",
    video: "",
    musica: "",
  },
};
