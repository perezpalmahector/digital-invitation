export interface InvitacionConfig {
  general: {
    slug: string;
    nombre: string;
    nombreCompleto: string;
    edad: number;
    tipoEvento: string;
    titulo: string;
    descripcion: string;
  };

  evento: {
    fecha: string;
    hora: string;
    zonaHoraria: string;
  };

  personalizacion: {
    tema: string;
    mostrarMenu: boolean;
    mostrarSobre: boolean;
    mostrarGaleria: boolean;
    mostrarVideo: boolean;
    mostrarMesaRegalos: boolean;
    mostrarConfirmacion: boolean;
  };

  contacto: {
    whatsapp: string;
    telefono: string;
    fechaLimiteConfirmacion: string;
  };

  multimedia: {
    portada: string;
    video: string;
    musica: string;
  };
}
