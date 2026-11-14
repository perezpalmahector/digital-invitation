import React, { useState } from "react";
import { MessageCircle, CheckCircle2, XCircle, Users } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

interface ConfirmacionProps {
    nombreFamilia?: string;
    adultos?: number;
    ninos?: number;
}

export const Confirmacion: React.FC<ConfirmacionProps> = ({
    nombreFamilia = "Invitado Especial",
    adultos = 1,
    ninos = 0,
}) => {
    const { contacto, general, personalizacion } = invitacionConfig;

    const [asistencia, setAsistencia] = useState<"si" | "no">("si");
    const [mensajePersonal, setMensajePersonal] = useState("");

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

    if (!personalizacion.mostrarConfirmacion) {
        return null;
    }

    const enviarWhatsApp = () => {
        const telefonoLimpio = (contacto.whatsapp || "").replace(/\D/g, "");

        const pasesTexto =
            ninos > 0
                ? `${adultos} adulto(s) y ${ninos} niño(s)`
                : `${adultos} adulto(s)`;

        const textoConfirmacion =
            asistencia === "si"
                ? `¡Hola ${general.nombre}! ✨ Somos *${nombreFamilia}* y confirmamos con mucha alegría nuestra asistencia a tus *${general.tipoEvento}* (${pasesTexto}).`
                : `Hola ${general.nombre}, somos *${nombreFamilia}*. Lamentablemente no podremos acompañarte en tus *${general.tipoEvento}*, pero te enviamos nuestros mejores deseos.`;

        const notaAdicional = mensajePersonal.trim()
            ? `\n\n💌 Mensaje para ti: "${mensajePersonal.trim()}"`
            : "";

        const mensajeCompleto = encodeURIComponent(
            `${textoConfirmacion}${notaAdicional}`
        );

        const urlWhatsApp = telefonoLimpio
            ? `https://wa.me{telefonoLimpio}?text=${mensajeCompleto}`
            : `https://wa.me{mensajeCompleto}`;

        window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
    };

    return (
        <section
            id="confirmacion"
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem 5.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
                <span
                    style={{
                        color: colores.doradoChampagne,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                    }}
                >
                    R.S.V.P.
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
                    Confirma tu Asistencia
                </h2>

                {/* Ornamento dorado */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "1.5rem 0 2rem 0",
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

                {/* Tarjeta de confirmación */}
                <div
                    style={{
                        backgroundColor: colores.blancoHueso,
                        border: `1px solid ${colores.rosaRubor}`,
                        borderRadius: "1rem",
                        padding: "2.25rem 1.75rem",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    {/* Datos de la familia invitada */}
                    <div
                        style={{
                            backgroundColor: colores.cremaMarfil,
                            borderRadius: "0.75rem",
                            padding: "1rem",
                            marginBottom: "1.5rem",
                            border: `1px solid ${colores.rosaRubor}`,
                        }}
                    >
                        <p
                            style={{
                                color: colores.paloDeRosa,
                                fontFamily: "Georgia, serif",
                                fontSize: "1.2rem",
                                fontWeight: 600,
                                margin: "0 0 0.35rem 0",
                            }}
                        >
                            {nombreFamilia}
                        </p>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                color: "#5C3A3C",
                                fontSize: "0.88rem",
                            }}
                        >
                            <Users size={15} color={colores.doradoChampagne} />
                            <span>
                                Pases reservados: <strong>{adultos} adulto(s)</strong>
                                {ninos > 0 ? ` y ${ninos} niño(s)` : ""}
                            </span>
                        </div>
                    </div>

                    {/* Selector Sí / No */}
                    <div
                        style={{
                            display: "flex",
                            gap: "0.75rem",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setAsistencia("si")}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "10px 18px",
                                borderRadius: "9999px",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                border: `1px solid ${colores.doradoChampagne}`,
                                backgroundColor:
                                    asistencia === "si" ? colores.paloDeRosa : colores.blancoHueso,
                                color:
                                    asistencia === "si" ? colores.blancoHueso : colores.paloDeRosa,
                            }}
                        >
                            <CheckCircle2 size={16} />
                            <span>¡Sí, asistiremos!</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setAsistencia("no")}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "10px 18px",
                                borderRadius: "9999px",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                border: `1px solid ${colores.rosaRubor}`,
                                backgroundColor:
                                    asistencia === "no" ? "#78716c" : colores.blancoHueso,
                                color: asistencia === "no" ? colores.blancoHueso : "#78716c",
                            }}
                        >
                            <XCircle size={16} />
                            <span>No podremos asistir</span>
                        </button>
                    </div>

                    {/* Mensaje opcional de la familia para Mary */}
                    <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
                        <label
                            htmlFor="mensaje-familia-whatsapp"
                            style={{
                                display: "block",
                                color: "#5C3A3C",
                                fontSize: "0.88rem",
                                fontWeight: 600,
                                marginBottom: "0.45rem",
                            }}
                        >
                            Escribe un mensaje o felicitación para {general.nombre} (opcional):
                        </label>
                        <textarea
                            id="mensaje-familia-whatsapp"
                            rows={3}
                            value={mensajePersonal}
                            onChange={(e) => setMensajePersonal(e.target.value)}
                            placeholder="Ej. ¡Muchas felicidades Mary! Ahí estaremos celebrando contigo..."
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                borderRadius: "0.75rem",
                                border: `1px solid ${colores.rosaRubor}`,
                                backgroundColor: "#ffffff",
                                color: "#44403c",
                                fontSize: "0.92rem",
                                fontFamily: "inherit",
                                resize: "vertical",
                            }}
                        />
                    </div>

                    {/* Botón enviar por WhatsApp */}
                    <button
                        type="button"
                        onClick={enviarWhatsApp}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            backgroundColor: "#25D366",
                            color: "#ffffff",
                            border: "none",
                            padding: "12px 26px",
                            borderRadius: "9999px",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
                        }}
                    >
                        <MessageCircle size={19} />
                        <span>Enviar confirmación por WhatsApp</span>
                    </button>

                    {contacto.fechaLimiteConfirmacion && (
                        <p
                            style={{
                                color: "#78716c",
                                fontSize: "0.82rem",
                                marginTop: "1rem",
                                marginBottom: 0,
                            }}
                        >
                            Favor de confirmar antes del{" "}
                            <strong>{contacto.fechaLimiteConfirmacion}</strong>.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Confirmacion;
