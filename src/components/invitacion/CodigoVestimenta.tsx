import React, { useEffect, useRef, useState } from "react";
import { Shirt, Sparkles } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const CodigoVestimenta: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const seccionRef = useRef<HTMLElement | null>(null);
    const dressCode = invitacionConfig.codigoVestimenta;

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

    if (!dressCode || dressCode.mostrar === false) return null;

    return (
        <section
            ref={seccionRef}
            id="codigo-vestimenta"
            className={`cv-sec ${visible ? "cv-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .cv-header {
                    opacity: 0;
                    transform: translateY(16px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .cv-sec--activa .cv-header {
                    opacity: 1;
                    transform: translateY(0);
                }

                .cv-tarjeta {
                    opacity: 0;
                    filter: blur(6px);
                    transform: scale(0.95) translateY(20px);
                    transition: opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                                filter 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                                transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
                }
                .cv-sec--activa .cv-tarjeta {
                    opacity: 1;
                    filter: blur(0);
                    transform: scale(1) translateY(0);
                }

                .cv-prenda svg {
                    transform-origin: top center;
                    animation: cvPercha 3.8s ease-in-out infinite;
                }

                .cv-caja-genero {
                    transition: transform 0.35s ease, box-shadow 0.35s ease;
                }
                .cv-caja-genero:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 20px rgba(181, 115, 120, 0.14);
                }

                .cv-muestra-color {
                    animation: cvPulsoColor 2.6s ease-in-out infinite;
                }

                .cv-destello-nota {
                    animation: cvBrilloSparkle 3s ease-in-out infinite;
                }

                @keyframes cvPercha {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(7deg); }
                    75% { transform: rotate(-7deg); }
                }

                @keyframes cvPulsoColor {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(213, 154, 158, 0.55);
                    }
                    50% {
                        transform: scale(1.18);
                        box-shadow: 0 0 0 5px rgba(213, 154, 158, 0);
                    }
                }

                @keyframes cvBrilloSparkle {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
                    50% { transform: scale(1.25) rotate(20deg); opacity: 1; }
                }
            `}</style>
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                <div className="cv-header">
                    <span
                        style={{
                            color: colores.doradoChampagne,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        Dress Code
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
                        Código de Vestimenta
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
                    className="cv-tarjeta"
                    style={{
                        backgroundColor: colores.blancoHueso,
                        border: `1px solid ${colores.rosaRubor}`,
                        borderRadius: "1rem",
                        padding: "2.5rem 1.75rem",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    <div
                        className="cv-prenda"
                        style={{
                            width: "58px",
                            height: "58px",
                            borderRadius: "50%",
                            backgroundColor: colores.rosaRubor,
                            color: "#5C3A3C",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 1rem auto",
                            border: `1px solid ${colores.doradoChampagne}`,
                        }}
                    >
                        <Shirt size={26} strokeWidth={1.8} />
                    </div>

                    <h3
                        style={{
                            color: colores.doradoChampagne,
                            fontFamily: "Georgia, serif",
                            fontSize: "1.65rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            margin: "0 0 0.75rem 0",
                        }}
                    >
                        {dressCode.etiqueta}
                    </h3>

                    <p
                        style={{
                            color: "#57534e",
                            fontSize: "0.98rem",
                            maxWidth: "520px",
                            margin: "0 auto 1.75rem auto",
                            lineHeight: 1.6,
                        }}
                    >
                        {dressCode.descripcion}
                    </p>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "1rem",
                            marginBottom: "1.75rem",
                        }}
                    >
                        <div
                            className="cv-caja-genero"
                            style={{
                                backgroundColor: colores.cremaMarfil,
                                borderRadius: "0.75rem",
                                padding: "1.15rem",
                                border: `1px solid ${colores.rosaRubor}`,
                            }}
                        >
                            <strong
                                style={{
                                    display: "block",
                                    color: colores.paloDeRosa,
                                    fontFamily: "Georgia, serif",
                                    fontSize: "1.05rem",
                                    marginBottom: "0.35rem",
                                }}
                            >
                                Mujeres
                            </strong>
                            <span style={{ color: "#57534e", fontSize: "0.9rem" }}>
                                {dressCode.mujeres}
                            </span>
                        </div>

                        <div
                            className="cv-caja-genero"
                            style={{
                                backgroundColor: colores.cremaMarfil,
                                borderRadius: "0.75rem",
                                padding: "1.15rem",
                                border: `1px solid ${colores.rosaRubor}`,
                            }}
                        >
                            <strong
                                style={{
                                    display: "block",
                                    color: colores.paloDeRosa,
                                    fontFamily: "Georgia, serif",
                                    fontSize: "1.05rem",
                                    marginBottom: "0.35rem",
                                }}
                            >
                                Hombres
                            </strong>
                            <span style={{ color: "#57534e", fontSize: "0.9rem" }}>
                                {dressCode.hombres}
                            </span>
                        </div>
                    </div>

                    {dressCode.coloresReservados.length > 0 && (
                        <div
                            style={{
                                borderTop: `1px solid ${colores.rosaRubor}`,
                                paddingTop: "1.25rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "1rem",
                                    marginBottom: "0.75rem",
                                    flexWrap: "wrap",
                                }}
                            >
                                {dressCode.coloresReservados.map((c, idx) => (
                                    <div
                                        key={c.nombre}
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            backgroundColor: colores.cremaMarfil,
                                            padding: "4px 12px",
                                            borderRadius: "9999px",
                                            fontSize: "0.8rem",
                                            color: "#5C3A3C",
                                        }}
                                    >
                                        <span
                                            className="cv-muestra-color"
                                            style={{
                                                width: "14px",
                                                height: "14px",
                                                borderRadius: "50%",
                                                backgroundColor: c.hex,
                                                border: "1px solid #d6d3d1",
                                                animationDelay: `${idx * 0.6}s`,
                                            }}
                                        />
                                        <span>{c.nombre}</span>
                                    </div>
                                ))}
                            </div>

                            {dressCode.notaExtra && (
                                <p
                                    style={{
                                        color: "#78716c",
                                        fontSize: "0.85rem",
                                        fontStyle: "italic",
                                        margin: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "6px",
                                    }}
                                >
                                    <Sparkles size={14} color={colores.doradoChampagne} className="cv-destello-nota" />
                                    <span>{dressCode.notaExtra}</span>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CodigoVestimenta;
