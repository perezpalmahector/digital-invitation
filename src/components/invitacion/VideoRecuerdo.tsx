import React, { useEffect, useRef, useState } from "react";
import { invitacionConfig } from "../../config/invitacion.config";

export const VideoRecuerdo: React.FC = () => {
  const { multimedia, personalizacion } = invitacionConfig;
  const [visible, setVisible] = useState(false);
  const seccionRef = useRef<HTMLElement | null>(null);

  const colores = {
    paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
    doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
    blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
    rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
    cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
  };

  useEffect(() => {
    const elemento = seccionRef.current;
    if (!elemento) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.18 }
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  if (!personalizacion.mostrarVideo || !multimedia.video) {
    return null;
  }

  return (
    <section
      ref={seccionRef}
      id="video-recuerdo"
      className={`vr-sec ${visible ? "vr-sec--activa" : ""}`}
      style={{
        backgroundColor: colores.blancoHueso,
        padding: "4.5rem 1.25rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        .vr-header {
          opacity: 0;
          transform: translateY(-16px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .vr-sec--activa .vr-header {
          opacity: 1;
          transform: translateY(0);
        }

        .vr-linea {
          transform: scaleX(0);
          transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.25s;
        }
        .vr-sec--activa .vr-linea {
          transform: scaleX(1);
        }

        .vr-marco {
          opacity: 0;
          clip-path: inset(0 18% 0 18% round 1rem);
          transform: scale(0.95);
          transition: opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      clip-path 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                      border-color 0.35s ease;
        }
        .vr-sec--activa .vr-marco {
          opacity: 1;
          clip-path: inset(0 0% 0 0% round 1rem);
          transform: scale(1);
          animation: vrHaloCine 4.5s ease-in-out 1s infinite;
        }
        .vr-marco:hover {
          border-color: ${colores.doradoChampagne} !important;
          transform: translateY(-3px) !important;
        }

        @keyframes vrHaloCine {
          0%, 100% {
            box-shadow: 0 10px 28px rgba(181, 115, 120, 0.14),
                        0 0 0 0 rgba(212, 175, 55, 0.25);
          }
          50% {
            box-shadow: 0 16px 36px rgba(212, 175, 55, 0.24),
                        0 0 0 6px rgba(212, 175, 55, 0);
          }
        }
      `}</style>

      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div className="vr-header">
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
              className="vr-linea"
              style={{
                height: "1px",
                width: "64px",
                backgroundColor: colores.doradoChampagne,
                transformOrigin: "right center",
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
              className="vr-linea"
              style={{
                height: "1px",
                width: "64px",
                backgroundColor: colores.doradoChampagne,
                transformOrigin: "left center",
              }}
            />
          </div>
        </div>

        {/* Marco del video */}
        <div
          className="vr-marco"
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
    </section >
  );
};

export default VideoRecuerdo;
