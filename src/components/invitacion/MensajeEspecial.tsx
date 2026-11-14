import React from "react";
import { invitacionConfig } from "../../config/invitacion.config";

export const MensajeEspecial: React.FC = () => {
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

    if (!mensajeElegido) {
        return null;
    }

    return (
        <section
            id="mensaje-especial"
            style={{
                backgroundColor: colores.blancoHueso,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
                {/* Subtítulo */}
                <span
                    style={{
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
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "1.5rem 0",
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

                {/* Tarjeta elegante del mensaje único */}
                <div
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
