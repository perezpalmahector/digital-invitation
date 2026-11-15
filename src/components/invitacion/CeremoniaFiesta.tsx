import React, { useEffect, useRef, useState } from "react";
import { Church, PartyPopper, Clock, MapPin, ExternalLink } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const CeremoniaFiesta: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const seccionRef = useRef<HTMLElement | null>(null);
    const ubicaciones = invitacionConfig.ubicaciones;

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
            { threshold: 0.15 }
        );

        observer.observe(elemento);
        return () => observer.disconnect();
    }, []);

    if (!ubicaciones) {
        return null;
    }

    const eventos = [ubicaciones.ceremonia, ubicaciones.recepcion];

    return (
        <section
            ref={seccionRef}
            id="ceremonia-fiesta"
            className={`cf-sec ${visible ? "cf-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .cf-header {
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .cf-sec--activa .cf-header {
                    opacity: 1;
                    transform: translateY(0);
                }
                .cf-grid {
                    perspective: 1000px;
                }
                .cf-card {
                    opacity: 0;
                    transform: rotateX(16deg) translateY(28px) scale(0.97);
                    transform-origin: top center;
                    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                                box-shadow 0.35s ease;
                }
                .cf-card--0 { transition-delay: 0.15s; }
                .cf-card--1 { transition-delay: 0.32s; }
                .cf-sec--activa .cf-card {
                    opacity: 1;
                    transform: rotateX(0deg) translateY(0) scale(1);
                }
                .cf-card:hover {
                    transform: translateY(-6px) !important;
                    box-shadow: 0 16px 32px rgba(181, 115, 120, 0.18) !important;
                }
                .cf-icono-iglesia svg {
                    transform-origin: top center;
                    animation: cfCampana 3.6s ease-in-out infinite;
                }
                .cf-icono-fiesta svg {
                    animation: cfFestejo 3.2s ease-in-out 0.6s infinite;
                }
                .cf-pin {
                    animation: cfRebotePin 2.2s ease-in-out infinite;
                }
                .cf-btn-mapa {
                    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
                }
                .cf-btn-mapa:hover {
                    transform: scale(1.04);
                    filter: brightness(1.04);
                    box-shadow: 0 6px 16px rgba(213, 154, 158, 0.5) !important;
                }
                .cf-btn-web {
                    transition: background-color 0.25s ease, transform 0.25s ease;
                }
                .cf-btn-web:hover {
                    background-color: rgba(212, 175, 55, 0.12) !important;
                    transform: scale(1.03);
                }
                @keyframes cfCampana {
                    0%, 100% { transform: rotate(0deg); }
                    12% { transform: rotate(9deg); }
                    24% { transform: rotate(-8deg); }
                    36% { transform: rotate(5deg); }
                    48% { transform: rotate(-3deg); }
                    60% { transform: rotate(0deg); }
                }
                @keyframes cfFestejo {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    20% { transform: translateY(-4px) rotate(-8deg) scale(1.08); }
                    40% { transform: translateY(0) rotate(5deg); }
                    55% { transform: translateY(-2px) rotate(0deg); }
                }
                @keyframes cfRebotePin {
                    0%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-3px); }
                    70% { transform: translateY(1px); }
                }
            `}</style>
            <div style={{ maxWidth: "920px", margin: "0 auto" }}>
                <div className="cf-header">
                    <span
                        style={{
                            color: colores.doradoChampagne,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        Dónde y Cuándo
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
                        Ceremonia y Recepción
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
                    className="cf-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                        gap: "1.75rem",
                    }}
                >
                    {eventos.map((item, idx) => {
                        const esCeremonia = item.tipo === "ceremonia";

                        return (
                            <div
                                key={item.tipo}
                                className={`cf-card cf-card--${idx}`}
                                style={{
                                    backgroundColor: colores.blancoHueso,
                                    border: `1px solid ${colores.rosaRubor}`,
                                    borderRadius: "1rem",
                                    padding: "2.25rem 1.75rem",
                                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <div
                                        className={esCeremonia ? "cf-icono-iglesia" : "cf-icono-fiesta"}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "50%",
                                            backgroundColor: colores.rosaRubor,
                                            color: "#5C3A3C",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 1.25rem auto",
                                            border: `1px solid ${colores.doradoChampagne}`,
                                        }}
                                    >
                                        {esCeremonia ? <Church size={28} strokeWidth={1.8} /> : <PartyPopper size={28} strokeWidth={1.8} />}
                                    </div>

                                    <span
                                        style={{
                                            color: colores.doradoChampagne,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.14em",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.titulo}
                                    </span>

                                    <h3
                                        style={{
                                            color: colores.paloDeRosa,
                                            fontFamily: "Georgia, serif",
                                            fontSize: "1.35rem",
                                            marginTop: "0.4rem",
                                            marginBottom: "1rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.lugar}
                                    </h3>

                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            backgroundColor: colores.cremaMarfil,
                                            padding: "6px 14px",
                                            borderRadius: "9999px",
                                            color: "#5C3A3C",
                                            fontSize: "0.875rem",
                                            fontWeight: 600,
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        <Clock size={15} color={colores.doradoChampagne} />
                                        <span>{item.hora}</span>
                                    </div>

                                    <p
                                        style={{
                                            color: "#57534e",
                                            fontSize: "0.95rem",
                                            lineHeight: 1.6,
                                            margin: "0 auto 1.5rem auto",
                                            maxWidth: "320px",
                                        }}
                                    >
                                        {item.direccion}
                                    </p>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.65rem",
                                        width: "100%",
                                        maxWidth: "240px",
                                    }}
                                >
                                    <a
                                        href={item.mapaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cf-btn-mapa"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            backgroundColor: colores.paloDeRosa,
                                            color: colores.blancoHueso,
                                            textDecoration: "none",
                                            padding: "10px 18px",
                                            borderRadius: "9999px",
                                            fontSize: "0.875rem",
                                            fontWeight: 600,
                                            boxShadow: "0 2px 8px rgba(213, 154, 158, 0.35)",
                                        }}
                                    >
                                        <MapPin size={16} className="cf-pin" />
                                        <span>Ver ubicación</span>
                                    </a>

                                    {item.sitioWeb && (
                                        <a
                                            href={item.sitioWeb}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cf-btn-web"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "6px",
                                                backgroundColor: "transparent",
                                                color: colores.paloDeRosa,
                                                border: `1px solid ${colores.doradoChampagne}`,
                                                textDecoration: "none",
                                                padding: "8px 16px",
                                                borderRadius: "9999px",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                            }}
                                        >
                                            <span>Sitio de la parroquia</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CeremoniaFiesta;
