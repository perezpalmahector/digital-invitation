import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const Galeria: React.FC = () => {
    const { galeria, personalizacion } = invitacionConfig;
    const [fotoSeleccionada, setFotoSeleccionada] = useState<number | null>(null);

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

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
            id="galeria"
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "960px", margin: "0 auto" }}>
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

                {/* Cuadrícula de fotos gallery-n.jpg */}
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
                            style={{
                                padding: "8px",
                                backgroundColor: colores.blancoHueso,
                                border: `1px solid ${colores.rosaRubor}`,
                                borderRadius: "0.85rem",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                cursor: "pointer",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={src}
                                alt={`Galería Mary ${idx + 1}`}
                                loading="lazy"
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

            {/* Modal Lightbox al hacer clic */}
            {fotoSeleccionada !== null && (
                <div
                    onClick={() => setFotoSeleccionada(null)}
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
                        src={rutasImagenes[fotoSeleccionada]}
                        alt={`Foto ampliada ${fotoSeleccionada + 1}`}
                        onClick={(e) => e.stopPropagation()}
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
