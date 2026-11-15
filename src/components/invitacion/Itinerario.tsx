import React, { useEffect, useRef, useState } from "react";
import {
    Church,
    Sparkles,
    Heart,
    Wine,
    Utensils,
    Music,
    Clock,
} from "lucide-react";
import {
    invitacionConfig,
    type ActividadItinerario,
} from "../../config/invitacion.config";

export const Itinerario: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const seccionRef = useRef<HTMLElement | null>(null);
    const actividades = invitacionConfig.itinerario ?? [];

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
            { threshold: 0.12 }
        );

        observer.observe(elemento);
        return () => observer.disconnect();
    }, []);

    if (actividades.length === 0) return null;

    const obtenerIcono = (tipo: ActividadItinerario["icono"]) => {
        switch (tipo) {
            case "iglesia":
                return <Church size={20} strokeWidth={1.8} />;
            case "recepcion":
                return <Sparkles size={20} strokeWidth={1.8} />;
            case "vals":
                return <Heart size={20} strokeWidth={1.8} />;
            case "brindis":
                return <Wine size={20} strokeWidth={1.8} />;
            case "cena":
                return <Utensils size={20} strokeWidth={1.8} />;
            case "baile":
                return <Music size={20} strokeWidth={1.8} />;
            default:
                return <Clock size={20} strokeWidth={1.8} />;
        }
    };

    return (
        <section
            ref={seccionRef}
            id="itinerario"
            className={`it-sec ${visible ? "it-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.blancoHueso,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .it-header {
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .it-sec--activa .it-header {
                    opacity: 1;
                    transform: translateY(0);
                }

                .it-lista {
                    position: relative;
                }

                .it-lista::before {
                    content: "";
                    position: absolute;
                    left: 38px;
                    top: 24px;
                    bottom: 24px;
                    width: 2px;
                    background: linear-gradient(
                        180deg,
                        transparent 0%,
                        ${colores.doradoChampagne} 15%,
                        ${colores.doradoChampagne} 85%,
                        transparent 100%
                    );
                    opacity: 0.45;
                    z-index: 0;
                }

                .it-item {
                    position: relative;
                    z-index: 1;
                    opacity: 0;
                    transform: translateY(24px) scale(0.98);
                    transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                                box-shadow 0.3s ease;
                }

                .it-sec--activa .it-item {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .it-item:hover {
                    transform: translateX(6px) !important;
                    box-shadow: 0 10px 24px rgba(181, 115, 120, 0.14) !important;
                }

                .it-icono {
                    animation: itOlaTiempo 4.5s ease-in-out infinite;
                }

                .it-hora {
                    transition: background-color 0.3s ease, color 0.3s ease;
                }
                .it-item:hover .it-hora {
                    background-color: ${colores.doradoChampagne} !important;
                    color: #ffffff !important;
                }

                @keyframes itOlaTiempo {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
                    }
                    25% {
                        transform: scale(1.09);
                        box-shadow: 0 0 0 6px rgba(212, 175, 55, 0);
                    }
                    50% {
                        transform: scale(1);
                    }
                }
            `}</style>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
                <div className="it-header">
                    <span
                        style={{
                            color: colores.doradoChampagne,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        Momentos Especiales
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
                        Itinerario del Evento
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "1.5rem 0 2.5rem 0",
                        }}
                    >
                        <span style={{ height: "1px", width: "64px", backgroundColor: colores.doradoChampagne }} />
                        <span style={{ margin: "0 12px", fontSize: "1.1rem", color: colores.doradoChampagne }}>✦</span>
                        <span style={{ height: "1px", width: "64px", backgroundColor: colores.doradoChampagne }} />
                    </div>
                </div>

                <div
                    className="it-lista"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        textAlign: "left",
                    }}
                >
                    {actividades.map((item, idx) => (
                        <div
                            key={idx}
                            className="it-item"
                            style={{
                                backgroundColor: colores.cremaMarfil,
                                border: `1px solid ${colores.rosaRubor}`,
                                borderRadius: "1rem",
                                padding: "1.25rem 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1.15rem",
                                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.03)",
                                transitionDelay: `${0.12 + idx * 0.12}s`,
                            }}
                        >
                            <div
                                className="it-icono"
                                style={{
                                    minWidth: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    backgroundColor: colores.rosaRubor,
                                    color: "#5C3A3C",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: `1px solid ${colores.doradoChampagne}`,
                                    animationDelay: `${idx * 0.45}s`,
                                }}
                            >
                                {obtenerIcono(item.icono)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "6px",
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: colores.paloDeRosa,
                                            fontFamily: "Georgia, serif",
                                            fontSize: "1.15rem",
                                            fontWeight: 600,
                                            margin: 0,
                                        }}
                                    >
                                        {item.titulo}
                                    </h3>
                                    <span
                                        className="it-hora"
                                        style={{
                                            backgroundColor: colores.blancoHueso,
                                            color: colores.doradoChampagne,
                                            border: `1px solid ${colores.doradoChampagne}`,
                                            padding: "2px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "0.78rem",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.hora}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        color: "#57534e",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.5,
                                        margin: 0,
                                    }}
                                >
                                    {item.descripcion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Itinerario;
