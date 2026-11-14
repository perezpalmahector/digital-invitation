import React from "react";
import { invitacionConfig } from "../../config/invitacion.config";

export const VideoRecuerdo: React.FC = () => {
  const { multimedia, personalizacion } = invitacionConfig;

  const colores = {
    paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
    doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
    blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
    rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
    cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
  };

  if (!personalizacion.mostrarVideo || !multimedia.video) {
    return null;
  }

  return (
    <section
      id="video-recuerdo"
      style={{
        backgroundColor: colores.blancoHueso,
        padding: "4.5rem 1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <span
          style={{
            color: colores.doradoChampagne,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            fontSize: "0.75rem",
            fontWeight: 600,
          }}
        >
          Un Vistazo Especial
        </span>

        <h2
          style={{
            color: colores.paloDeRosa,
            fontFamily: "Georgia, serif",
            fontSize: "2rem",
            marginTop: "0.5rem",
            fontWeight: 500,
          }}
        >
          Recuerdos de {invitacionConfig.general.nombre}
        </h2>

        {/* Ornamento dorado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1.5rem 0 2.5rem 0",
          }}
        >
          <span
            style={{
              height: "1px",
              width: "64px",
              backgroundColor: colores.doradoChampagne,
            }}
          />
          <span
            style={{
              margin: "0 12px",
              fontSize: "1.1rem",
              color: colores.doradoChampagne,
            }}
          >
            ✦
          </span>
          <span
            style={{
              height: "1px",
              width: "64px",
              backgroundColor: colores.doradoChampagne,
            }}
          />
        </div>

        {/* Marco del video */}
        <div
          style={{
            backgroundColor: colores.cremaMarfil,
            border: `1px solid ${colores.rosaRubor}`,
            borderRadius: "1rem",
            padding: "0.75rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
          }}
        >
          <video
            src={multimedia.video}
            poster={multimedia.portada}
            controls
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              maxHeight: "480px",
              borderRadius: "0.75rem",
              display: "block",
              backgroundColor: "#1c1917",
            }}
          >
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoRecuerdo;
