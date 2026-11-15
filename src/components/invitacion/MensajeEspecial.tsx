import React, { useEffect, useRef, useState } from "react";
import { invitacionConfig } from "../../config/invitacion.config";

export const MensajeEspecial: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const seccionRef = useRef<HTMLElement | null>(null);

    const mensajes = invitacionConfig.mensajesAgradecimiento ?? [];
    const idElegido = invitacionConfig.mensajeSeleccionadoId ?? 1;

    // Busca el mensaje elegido para esta invitación (por defecto el #1)
    const mensajeElegido =
        mensajes.find((msg) => msg.id === idElegido) ?? mensajes[0];

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

    // Detecta cuando el invitado baja hasta esta sección
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

    if (!mensajeElegido) {
        return null;
    }

    return (
        <section
            ref={seccionRef}
            id="mensaje-especial"
            className={`mensaje-especial ${visible ? "mensaje-especial--visible" : ""}`}
            style={{
                backgroundColor: colores.blancoHueso,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            {/* Estilos y animaciones encapsulados */}
            <style>{`
                .mensaje-especial__anim {
                    opacity: 0;
                    transform: translateY(22px);
                    transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
                }

                .mensaje-especial--visible .mensaje-especial__anim {
                    opacity: 1;
                    transform: translateY(0);
                }

                .mensaje-especial__delay-1 { transition-delay: 0.1s; }
                .mensaje-especial__delay-2 { transition-delay: 0.25s; }
                .mensaje-especial__delay-3 { transition-delay: 0.4s; }
                .mensaje-especial__delay-4 { transition-delay: 0.6s; }
                .mensaje-especial__delay-5 { transition-delay: 0.85s; }

                .mensaje-especial__linea {
                    transform: scaleX(0);
                    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.45s;
                }

                .mensaje-especial--visible .mensaje-especial__linea {
                    transform: scaleX(1);
                }

                .mensaje-especial__estrella {
                    display: inline-block;
                    animation: brilloEstrella 3.5s ease-in-out infinite;
                }

                .mensaje-especial__tarjeta {
                    overflow: hidden;
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }

                .mensaje-especial__tarjeta:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 14px 30px rgba(181, 115, 120, 0.14) !important;
                }

                .mensaje-especial__tarjeta::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -130%;
                    width: 55%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.55) 50%,
                        transparent 100%
                    );
                    transform: skewX(-20deg);
                    pointer-events: none;
                }

                .mensaje-especial--visible .mensaje-especial__tarjeta::after {
                    animation: destelloCarta 1.6s ease-out 0.9s forwards;
                }

                .mensaje-especial__comillas {
                    display: inline-block;
                    animation: flotarComillas 3.2s ease-in-out infinite;
                }

                @keyframes brilloEstrella {
                    0%, 100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 0.85;
                    }
                    50% {
                        transform: scale(1.25) rotate(18deg);
                        opacity: 1;
                    }
                }

                @keyframes destelloCarta {
                    0% { left: -130%; }
                    100% { left: 160%; }
                }

                @keyframes flotarComillas {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
            `}</style>
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
                {/* Subtítulo */}
                <span
                    className="mensaje-especial__anim mensaje-especial__delay-1"
                    style={{
                        display: "inline-block",
                        color: colores.doradoChampagne,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                    }}
                >
                    Palabras del Corazón • {invitacionConfig.general.tipoEvento}
                </span>

                {/* Título principal */}
                <h2
                    className="mensaje-especial__anim mensaje-especial__delay-2"
                    style={{
                        color: colores.paloDeRosa,
                        fontFamily: "Georgia, serif",
                        fontSize: "2rem",
                        marginTop: "0.5rem",
                        fontWeight: 500,
                    }}
                >
                    {mensajeElegido.titulo}
                </h2>

                {/* Ornamento dorado */}
                <div
                    className="mensaje-especial__anim mensaje-especial__delay-3"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "1.5rem 0",
                    }}
                >
                    <span
                        className="mensaje-especial__linea"
                        style={{
                            height: "1px",
                            width: "64px",
                            backgroundColor: colores.doradoChampagne,
                            transformOrigin: "right center",
                        }}
                    />
                    <span
                        className="mensaje-especial__estrella"
                        style={{
                            margin: "0 12px",
                            fontSize: "1.1rem",
                            color: colores.doradoChampagne,
                        }}
                    >
                        ✦
                    </span>
                    <span
                        className="mensaje-especial__linea"
                        style={{
                            height: "1px",
                            width: "64px",
                            backgroundColor: colores.doradoChampagne,
                            transformOrigin: "left center",
                        }}
                    />
                </div>

                {/* Tarjeta elegante del mensaje único */}
                <div
                    className="mensaje-especial__anim mensaje-especial__delay-4 mensaje-especial__tarjeta"
                    style={{
                        backgroundColor: colores.cremaMarfil,
                        border: `1px solid ${colores.rosaRubor}`,
                        borderRadius: "1rem",
                        padding: "2.75rem 2rem",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                        position: "relative",
                    }}
                >
                    {/* Comillas decorativas */}
                    <div
                        className="mensaje-especial__comillas"
                        style={{
                            color: colores.doradoChampagne,
                            fontFamily: "Georgia, serif",
                            fontSize: "2.5rem",
                            lineHeight: 1,
                            marginBottom: "0.5rem",
                            opacity: 0.7,
                        }}
                    >
                        “
                    </div>

                    {/* Cuerpo del mensaje */}
                    <p
                        style={{
                            color: "#44403c",
                            fontFamily: "Georgia, serif",
                            fontStyle: "italic",
                            fontSize: "1.12rem",
                            lineHeight: 1.85,
                            margin: "0 auto",
                            maxWidth: "600px",
                        }}
                    >
                        {mensajeElegido.texto}
                    </p>

                    {/* Separador sutil */}
                    <div
                        style={{
                            width: "40px",
                            height: "1px",
                            backgroundColor: colores.doradoChampagne,
                            margin: "1.75rem auto 1rem auto",
                            opacity: 0.6,
                        }}
                    />

                    {/* Firma de Mary */}
                    <p
                        className="mensaje-especial__anim mensaje-especial__delay-5"
                        style={{
                            color: colores.paloDeRosa,
                            fontFamily: "Georgia, serif",
                            fontSize: "1.2rem",
                            fontWeight: 500,
                            margin: 0,
                        }}
                    >
                        Con amor, {invitacionConfig.general.nombre}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MensajeEspecial;
