import type { InvitacionConfig } from "../types/config/invitacion.types";

export interface MensajeAgradecimiento {
  id: number;
  etiqueta: string;
  titulo: string;
  texto: string;
}

export interface LugarEvento {
  tipo: "ceremonia" | "recepcion";
  titulo: string;
  lugar: string;
  hora: string;
  direccion: string;
  referencia?: string;
  mapaUrl: string;
  sitioWeb?: string;
}

export interface ActividadItinerario {
  hora: string;
  titulo: string;
  descripcion: string;
  icono: "iglesia" | "recepcion" | "cena" | "brindis" | "vals" | "baile";
}

export interface InvitacionConfigConMensajes extends InvitacionConfig {
  colores?: {
    paloDeRosa: string;
    doradoChampagne: string;
    blancoHueso: string;
    rosaRubor: string;
    cremaMarfil: string;
  };
  mensajeSeleccionadoId?: number;
  mensajesAgradecimiento?: MensajeAgradecimiento[];
  ubicaciones?: {
    ceremonia: LugarEvento;
    recepcion: LugarEvento;
  };
  personasEspeciales?: {
    padres: {
      mama: string;
      papa: string;
    };
    padrinos: string[];
  };
  itinerario?: ActividadItinerario[];
  codigoVestimenta?: {
    etiqueta: string;
    descripcion: string;
    mujeres: string;
    hombres: string;
    coloresReservados: { nombre: string; hex: string }[];
    notaExtra?: string;
  };
  galeria?: {
    carpeta: string;
    imagenes: string[];
  };
  mesaRegalos?: {
    titulo: string;
    mensaje: string;
    lluviaSobres: boolean;
    mostrarDatosBancarios?: boolean;
    datosBancarios?: {
      banco: string;
      titular: string;
      cuenta: string;
      clabe: string;
    };
  };
}

export const invitacionConfig: InvitacionConfigConMensajes = {
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
    tieneReservacion: false,
  },

  contacto: {
    // Coloca aquí el número de Mary con código de país (ej. 5217711234567)
    whatsapp: "5217710000000",
    telefono: "7710000000",
    fechaLimiteConfirmacion: "10 de Diciembre de 2026",
  },

  multimedia: {
    portada: "/images/portada/mary.jpg",
    video: "/videos/Mary.mp4",
    musica: "/music/audio.mp3",
  },

  colores: {
    paloDeRosa: "#D59A9E",
    doradoChampagne: "#D4AF37",
    blancoHueso: "#F9F6F0",
    rosaRubor: "#F4C2C2",
    cremaMarfil: "#EFE6D5",
  },

  galeria: {
    carpeta: "/images/gallery",
    imagenes: ["gallery-1.jpg", "gallery-2.jpg", "gallery-3.jpg"],
  },

  mesaRegalos: {
    titulo: "Detalle de Obsequio",
    mensaje:
      "Tu presencia es el regalo más valioso y lo más importante en esta noche tan especial. Sin embargo, si deseas tener un detalle conmigo, cualquier obsequio que nazca de tu corazón será recibido con mucho cariño.",
    lluviaSobres: false,
    mostrarDatosBancarios: false,
    datosBancarios: {
      banco: "BBVA México",
      titular: "María Guadalupe Martinez Miranda",
      cuenta: "0000 0000 00",
      clabe: "0120 0000 0000 0000 00",
    },
  },

  ubicaciones: {
    ceremonia: {
      tipo: "ceremonia",
      titulo: "Ceremonia Religiosa",
      lugar: "Parroquia de Nuestra Señora de los Ángeles",
      hora: "5:00 PM (17:00 hrs)",
      direccion:
        "Monumentos Coloniales 5, SAHOP Chacón, 42186 Mineral de la Reforma, Hgo.",
      mapaUrl: "https://google.com",
      sitioWeb: "https://netlify.app",
    },
    recepcion: {
      tipo: "recepcion",
      titulo: "Recepción",
      lugar: 'Salón "Los Pinos"',
      hora: "Al terminar la ceremonia",
      direccion:
        "Av. 24 de Febrero 9 A, El Saucillo, 42186 Mineral de la Reforma, Hgo.",
      mapaUrl: "https://goo.gl",
    },
  },

  personasEspeciales: {
    padres: {
      mama: "María del Carmen Miranda Carrasco",
      papa: "Juan Aaron Martinez Jeronimo",
    },
    padrinos: ["Martín Martinez Jeronimo", "Jesus Martinez Jeronimo"],
  },

  itinerario: [
    {
      hora: "5:00 PM",
      titulo: "Ceremonia Religiosa",
      descripcion:
        "Misa de acción de gracias en la Parroquia de Nuestra Señora de los Ángeles.",
      icono: "iglesia",
    },
    {
      hora: "6:30 PM",
      titulo: "Recepción y Bienvenida",
      descripcion:
        'Llegada de invitados al Salón "Los Pinos" y cóctel de bienvenida.',
      icono: "recepcion",
    },
    {
      hora: "7:30 PM",
      titulo: "Presentación y Vals",
      descripcion: "Entrada oficial de Mary, vals familiar y momento especial.",
      icono: "vals",
    },
    {
      hora: "8:30 PM",
      titulo: "Brindis de Honor",
      descripcion: "Palabras de agradecimiento y brindis por esta nueva etapa.",
      icono: "brindis",
    },
    {
      hora: "9:00 PM",
      titulo: "Cena",
      descripcion:
        "Degustación de banquete preparado especialmente para ustedes.",
      icono: "cena",
    },
    {
      hora: "10:00 PM",
      titulo: "¡A Bailar!",
      descripcion: "Apertura de pista y fiesta toda la noche.",
      icono: "baile",
    },
  ],

  codigoVestimenta: {
    etiqueta: "Formal",
    descripcion:
      "Nos encantará verte lucir espectacular en esta noche tan especial.",
    mujeres: "Vestido largo o midi de noche, conjunto formal elegante.",
    hombres: "Traje formal o smoking, camisa de vestir.",
    coloresReservados: [
      { nombre: "Palo de Rosa", hex: "#D59A9E" },
      { nombre: "Rosa Rubor", hex: "#F4C2C2" },
    ],
    notaExtra:
      "Agradecemos reservar los tonos Palo de Rosa y Rosa Rubor exclusivamente para la festejada.",
  },

  mensajeSeleccionadoId: 1,

  mensajesAgradecimiento: [
    {
      id: 1,
      etiqueta:
        "XVIII Años - Emotivo Dios, Padres y Familia (Elegido para Mary)",
      titulo: "A Dios, a mis Padres y a mi Familia",
      texto:
        "Hace dieciocho años Dios me regaló el milagro de la vida y me puso en los brazos de los mejores padres del mundo. Hoy, con el corazón lleno de gratitud, agradezco al Cielo por cada bendición, a mis padres por sus desvelos, sacrificios y amor infinito, y a mi familia por ser siempre mi refugio y mi alegría. Todo lo que soy y cada sueño que hoy comienzo a cumplir, lleva la huella de su amor.",
    },
    {
      id: 2,
      etiqueta: "XV Años - Clásico y Emotivo",
      titulo: "Un sueño cumplido",
      texto:
        "Con la bendición de Dios y el amor infinito de mis padres, hoy dejo atrás mi niñez para comenzar una nueva etapa llena de ilusiones. Gracias por caminar siempre de mi mano.",
    },
    {
      id: 3,
      etiqueta: "XVIII Años - Nueva Etapa",
      titulo: "Abriendo mis alas",
      texto:
        "Agradezco a Dios por iluminar cada uno de mis pasos y a mis padres por darme raíces fuertes para crecer y alas para volar hacia mis sueños.",
    },
    {
      id: 4,
      etiqueta: "XV Años - Gratitud Familiar",
      titulo: "Mi mayor bendición",
      texto:
        "Señor, gracias por la familia que me diste. Papá y Mamá, gracias por cada esfuerzo, cada sonrisa y por hacer posible esta noche mágica que guardaré por siempre en mi corazón.",
    },
    {
      id: 5,
      etiqueta: "Graduación / Logro Académico",
      titulo: "Meta alcanzada",
      texto:
        "Este logro lleva la bendición de Dios y el esfuerzo silencioso de mis padres, quienes nunca dejaron de creer en mí. Gracias por impulsar cada uno de mis pasos.",
    },
    {
      id: 6,
      etiqueta: "XVIII Años - Corto y Elegante",
      titulo: "Gratitud infinita",
      texto:
        "A Dios por la vida, a mis padres por su amor eterno y a quienes me acompañan en este día tan especial. ¡Gracias por ser parte de mi historia!",
    },
    {
      id: 7,
      etiqueta: "Boda - Agradecimiento de los Novios",
      titulo: "Con la bendición de Dios y nuestros padres",
      texto:
        "Damos gracias a Dios por unir nuestras vidas y a nuestros padres por enseñarnos el verdadero significado del amor, el respeto y la familia.",
    },
    {
      id: 8,
      etiqueta: "XV Años - Espiritual",
      titulo: "Tu luz en mi camino",
      texto:
        "Hoy elevo mi oración a Dios para agradecerle por estos quince años de vida y por haber puesto en mi camino a los mejores padres del mundo.",
    },
    {
      id: 9,
      etiqueta: "XVIII Años - Poético",
      titulo: "Dieciocho primaveras",
      texto:
        "Han pasado dieciocho años desde que Dios me envió a los brazos de mis padres. Hoy celebro la vida agradeciendo cada instante de amor y sabiduría que me han brindado.",
    },
    {
      id: 10,
      etiqueta: "Bautizo / Primera Comunión",
      titulo: "En tus manos, Señor",
      texto:
        "Gracias Dios por recibirme en tu fe y gracias a mis padres y padrinos por guiar mi corazón por el camino del bien y el amor.",
    },
  ],
};
