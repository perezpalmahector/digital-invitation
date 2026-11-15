import React, { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const Galeria: React.FC = () => {
    const { galeria, personalizacion } = invitacionConfig;
    const [fotoSeleccionada, setFotoSeleccionada] = useState<number | null>(null);
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
            { threshold: 0.12 }
        );

        observer.observe(elemento);
        return () => observer.disconnect();
    }, []);

    if (
        !personalizacion.mostrarGaleria ||
        !galeria ||
        galeria.imagenes.length === 0
    ) {
        return null;
    }

    const rutasImagenes = galeria.imagenes.map(
        (nombre) => `${galeria.carpeta}/${nombre}`
    );

    const anteriorFoto = () => {
        if (fotoSeleccionada === null) return;
        setFotoSeleccionada(
            fotoSeleccionada === 0
                ? rutasImagenes.length - 1
                : fotoSeleccionada - 1
        );
    };

    const siguienteFoto = () => {
        if (fotoSeleccionada === null) return;
        setFotoSeleccionada(
            fotoSeleccionada === rutasImagenes.length - 1
                ? 0
                : fotoSeleccionada + 1
        );
    };

    return (
        <section
            ref={seccionRef}
            id="galeria"
            className={`gal-sec ${visible ? "gal-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .gal-header {
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .gal-sec--activa .gal-header {
                    opacity: 1;
                    transform: translateY(0);
                }

                .gal-marco {
                    opacity: 0;
                    transform: translateY(28px) rotate(-2deg) scale(0.96);
                    transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                                transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                                box-shadow 0.35s ease,
                                border-color 0.35s ease;
                }
                .gal-marco:nth-child(even) {
                    transform: translateY(28px) rotate(2deg) scale(0.96);
                }
                .gal-sec--activa .gal-marco {
                    opacity: 1;
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                .gal-marco:hover {
                    transform: translateY(-6px) !important;
                    border-color: ${colores.doradoChampagne} !important;
                    box-shadow: 0 14px 28px rgba(181, 115, 120, 0.2) !important;
                }

                .gal-img {
                    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                                filter 0.4s ease;
                }
                .gal-marco:hover .gal-img {
                    transform: scale(1.07);
                    filter: brightness(1.03);
                }

                .gal-modal-fondo {
                    animation: galFadeFondo 0.3s ease forwards;
                }
                .gal-modal-foto {
                    animation: galZoomFoto 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
                .gal-modal-btn {
                    transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
                }
                .gal-modal-btn:hover {
                    transform: scale(1.12);
                    background-color: ${colores.doradoChampagne} !important;
                    color: #ffffff !important;
                }

                @keyframes galFadeFondo {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes galZoomFoto {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                <div className="gal-header">
                    <span
                        style={{
                            color: colores.doradoChampagne,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        Sesión Fotográfica
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
                        Galería de Momentos
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
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "1.25rem",
                    }}
                >
                    {rutasImagenes.map((src, idx) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => setFotoSeleccionada(idx)}
                            className="gal-marco"
                            style={{
                                padding: "8px",
                                backgroundColor: colores.blancoHueso,
                                border: `1px solid ${colores.rosaRubor}`,
                                borderRadius: "0.85rem",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                cursor: "pointer",
                                overflow: "hidden",
                                transitionDelay: `${0.1 + idx * 0.12}s`,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Galería Mary ${idx + 1}`}
                                loading="lazy"
                                className="gal-img"
                                style={{
                                    width: "100%",
                                    height: "280px",
                                    objectFit: "cover",
                                    borderRadius: "0.6rem",
                                    display: "block",
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
            {fotoSeleccionada !== null && (
                <div
                    onClick={() => setFotoSeleccionada(null)}
                    className="gal-modal-fondo"
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(28, 25, 23, 0.88)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setFotoSeleccionada(null)}
                        aria-label="Cerrar galería"
                        className="gal-modal-btn"
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            backgroundColor: colores.blancoHueso,
                            color: "#5C3A3C",
                            border: "none",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <X size={20} />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            anteriorFoto();
                        }}
                        aria-label="Foto anterior"
                        className="gal-modal-btn"
                        style={{
                            backgroundColor: colores.blancoHueso,
                            color: "#5C3A3C",
                            border: "none",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            marginRight: "10px",
                        }}
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <img
                        key={fotoSeleccionada}
                        src={rutasImagenes[fotoSeleccionada]}
                        alt={`Foto ampliada ${fotoSeleccionada + 1}`}
                        onClick={(e) => e.stopPropagation()}
                        className="gal-modal-foto"
                        style={{
                            maxWidth: "82vw",
                            maxHeight: "82vh",
                            borderRadius: "0.75rem",
                            border: `2px solid ${colores.doradoChampagne}`,
                        }}
                    />

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            siguienteFoto();
                        }}
                        aria-label="Foto siguiente"
                        className="gal-modal-btn"
                        style={{
                            backgroundColor: colores.blancoHueso,
                            color: "#5C3A3C",
                            border: "none",
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            marginLeft: "10px",
                        }}
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>
            )}
        </section>
    );
};

export default Galeria;
