import React, { useEffect, useRef, useState } from "react";
import { Heart, Award } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const PadresPadrinos: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const seccionRef = useRef<HTMLElement | null>(null);
    const personas = invitacionConfig.personasEspeciales;

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

    if (!personas) return null;

    return (
        <section
            ref={seccionRef}
            id="padres-padrinos"
            className={`pp-sec ${visible ? "pp-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .pp-titulo {
                    opacity: 0;
                    transform: translateY(-16px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .pp-sec--activa .pp-titulo {
                    opacity: 1;
                    transform: translateY(0);
                }

                .pp-card-izq {
                    opacity: 0;
                    transform: translateX(-36px);
                    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                                transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s,
                                box-shadow 0.4s ease;
                }
                .pp-card-der {
                    opacity: 0;
                    transform: translateX(36px);
                    transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s,
                                transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.35s,
                                box-shadow 0.4s ease;
                }
                .pp-sec--activa .pp-card-izq,
                .pp-sec--activa .pp-card-der {
                    opacity: 1;
                    transform: translateX(0);
                }

                .pp-card-izq:hover,
                .pp-card-der:hover {
                    box-shadow: 0 14px 28px rgba(181, 115, 120, 0.18) !important;
                }

                .pp-corazon svg {
                    animation: ppLatido 2.4s ease-in-out infinite;
                }
                .pp-medalla svg {
                    animation: ppBalanceo 3.4s ease-in-out infinite;
                }

                .pp-ampersand {
                    display: inline-block;
                    animation: ppGiroSuave 5s ease-in-out infinite;
                }

                @keyframes ppLatido {
                    0%, 100% { transform: scale(1); }
                    20% { transform: scale(1.22); }
                    40% { transform: scale(1); }
                    60% { transform: scale(1.14); }
                }

                @keyframes ppBalanceo {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-10deg); }
                    75% { transform: rotate(10deg); }
                }

                @keyframes ppGiroSuave {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.15) rotate(6deg); }
                }
            `}</style>
            <div style={{ maxWidth: "860px", margin: "0 auto" }}>
                <div className="pp-titulo">
                    <span
                        style={{
                            color: colores.doradoChampagne,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        Con la Bendición de Quienes Amo
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
                        Mis Padres y Padrinos
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
                </div>

                {/* Tarjetas de Padres y Padrinos */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                        gap: "1.75rem",
                    }}
                >
                    {/* Tarjeta Mis Padres */}
                    <div
                        className="pp-card-izq"
                        style={{
                            backgroundColor: colores.blancoHueso,
                            border: `1px solid ${colores.rosaRubor}`,
                            borderRadius: "1rem",
                            padding: "2.25rem 1.5rem",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <div
                            className="pp-corazon"
                            style={{
                                width: "52px",
                                height: "52px",
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
                            <Heart size={24} strokeWidth={1.8} />
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
                            Mis Padres
                        </span>

                        <div style={{ marginTop: "1rem" }}>
                            <p
                                style={{
                                    color: "#44403c",
                                    fontFamily: "Georgia, serif",
                                    fontSize: "1.15rem",
                                    margin: "0.4rem 0",
                                }}
                            >
                                {personas.padres.mama}
                            </p>
                            <span
                                className="pp-ampersand"
                                style={{
                                    color: colores.doradoChampagne,
                                    fontFamily: "Georgia, serif",
                                    fontStyle: "italic",
                                    fontSize: "1rem",
                                }}
                            >
                                &amp;
                            </span>
                            <p
                                style={{
                                    color: "#44403c",
                                    fontFamily: "Georgia, serif",
                                    fontSize: "1.15rem",
                                    margin: "0.4rem 0",
                                }}
                            >
                                {personas.padres.papa}
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta Mis Padrinos */}
                    <div
                        className="pp-card-der"
                        style={{
                            backgroundColor: colores.blancoHueso,
                            border: `1px solid ${colores.rosaRubor}`,
                            borderRadius: "1rem",
                            padding: "2.25rem 1.5rem",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <div
                            className="pp-medalla"
                            style={{
                                width: "52px",
                                height: "52px",
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
                            <Award size={24} strokeWidth={1.8} />
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
                            Mis Padrinos
                        </span>

                        <div style={{ marginTop: "1rem" }}>
                            {personas.padrinos.map((padrino, idx) => (
                                <React.Fragment key={padrino}>
                                    <p
                                        style={{
                                            color: "#44403c",
                                            fontFamily: "Georgia, serif",
                                            fontSize: "1.15rem",
                                            margin: "0.4rem 0",
                                        }}
                                    >
                                        {padrino}
                                    </p>
                                    {idx < personas.padrinos.length - 1 && (
                                        <span
                                            className="pp-ampersand"
                                            style={{
                                                color: colores.doradoChampagne,
                                                fontFamily: "Georgia, serif",
                                                fontStyle: "italic",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            &amp;
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PadresPadrinos;
