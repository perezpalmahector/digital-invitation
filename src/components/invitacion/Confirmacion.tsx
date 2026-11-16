import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, CheckCircle2, XCircle, Users } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";
import { actualizarFamilia } from "../../services/familias.service";

interface ConfirmacionProps {
    familiaId?: string;
    nombreFamilia?: string;
    adultos?: number;
    ninos?: number;
}

export const Confirmacion: React.FC<ConfirmacionProps> = ({
    familiaId,
    nombreFamilia = "Invitado Especial",
    adultos = 1,
    ninos = 0,
}) => {
    const { contacto, general, personalizacion } = invitacionConfig;
    const [visible, setVisible] = useState(false);
    const seccionRef = useRef<HTMLElement | null>(null);

    const [asistencia, setAsistencia] = useState<"si" | "no">("si");
    const [mensajePersonal, setMensajePersonal] = useState("");
    const [confirmando, setConfirmando] = useState(false);

    const esReservado = personalizacion?.tieneReservacion ?? false;

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

    if (!personalizacion.mostrarConfirmacion) {
        return null;
    }

    const enviarWhatsApp = async () => {
        if (confirmando) return;

        const params = new URLSearchParams(window.location.search);
        const idFamiliaActual = familiaId || params.get("familia") || "";

        if (idFamiliaActual) {
            try {
                setConfirmando(true);
                const nuevoEstado = asistencia === "si" ? "confirmada" : "cancelada";

                await actualizarFamilia(idFamiliaActual, {
                    estado: nuevoEstado,
                    ...(mensajePersonal.trim()
                        ? { mensajeFamilia: mensajePersonal.trim() }
                        : {}),
                });
            } catch (error) {
                console.error("No se pudo actualizar el estado en BD:", error);
            } finally {
                setConfirmando(false);
            }
        }

        const telefonoLimpio = (contacto.whatsapp || "").replace(/\D/g, "");

        const pasesTexto =
            ninos > 0
                ? `${adultos} adulto(s) y ${ninos} niño(s)`
                : `${adultos} adulto(s)`;

        const estrella = "\u2726";
        const corazon = "\u2665";

        const textoConfirmacion =
            asistencia === "si"
                ? `¡Hola ${general.nombre}! ${estrella} Somos *${nombreFamilia}* y confirmamos con mucha alegría nuestra asistencia a tus *${general.tipoEvento}* (${pasesTexto}).`
                : `Hola ${general.nombre}, somos *${nombreFamilia}*. Lamentablemente no podremos acompañarte en tus *${general.tipoEvento}*, pero te enviamos nuestros mejores deseos.`;

        const notaAdicional = mensajePersonal.trim()
            ? `\n\n${corazon} Mensaje para ti: "${mensajePersonal.trim()}"`
            : "";


        const mensajeCompleto = encodeURIComponent(
            `${textoConfirmacion}${notaAdicional}`
        );

        const urlWhatsApp = telefonoLimpio
            ? "https://wa.me/" + telefonoLimpio + "?text=" + mensajeCompleto
            : "https://wa.me?text=" + mensajeCompleto;

        window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
    };
    return (
        <section
            ref={seccionRef}
            id="confirmacion"
            className={`rsvp-sec ${visible ? "rsvp-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem 5.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .rsvp-header {
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .rsvp-sec--activa .rsvp-header {
                    opacity: 1;
                    transform: translateY(0);
                }

                .rsvp-card {
                    opacity: 0;
                    transform: translateY(28px) scale(0.97);
                    transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s,
                                transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
                }
                .rsvp-sec--activa .rsvp-card {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .rsvp-opcion {
                    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                                background-color 0.3s ease,
                                color 0.3s ease,
                                box-shadow 0.3s ease;
                }
                .rsvp-opcion:hover {
                    transform: translateY(-2px);
                }
                .rsvp-opcion--activa {
                    transform: scale(1.04);
                    box-shadow: 0 6px 14px rgba(181, 115, 120, 0.28);
                }

                .rsvp-textarea {
                    transition: border-color 0.3s ease, box-shadow 0.3s ease;
                    outline: none;
                }
                .rsvp-textarea:focus {
                    border-color: ${colores.doradoChampagne} !important;
                    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.18);
                }

                .rsvp-btn-wa {
                    animation: rsvpPulsoWa 2.8s ease-in-out infinite;
                    transition: transform 0.25s ease, filter 0.25s ease;
                }
                .rsvp-btn-wa:hover:not(:disabled) {
                    transform: scale(1.05);
                    filter: brightness(1.05);
                }
                .rsvp-btn-wa svg {
                    animation: rsvpIconoWa 2.8s ease-in-out infinite;
                }

                @keyframes rsvpPulsoWa {
                    0%, 100% {
                        box-shadow: 0 4px 14px rgba(213, 154, 158, 0.45),
                                    0 0 0 0 rgba(212, 175, 55, 0.45);
                    }
                    50% {
                        box-shadow: 0 6px 18px rgba(213, 154, 158, 0.55),
                                    0 0 0 8px rgba(212, 175, 55, 0);
                    }
                }

                @keyframes rsvpIconoWa {
                    0%, 100% { transform: rotate(0deg); }
                    15% { transform: rotate(-12deg) scale(1.12); }
                    30% { transform: rotate(10deg) scale(1.12); }
                    45% { transform: rotate(0deg) scale(1); }
                }
            `}</style>
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
                <div className="rsvp-header">
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

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "1.5rem 0 2rem 0",
                        }}
                    >
                        <span style={{ height: "1px", width: "64px", backgroundColor: colores.doradoChampagne }} />
                        <span style={{ margin: "0 12px", fontSize: "1.1rem", color: colores.doradoChampagne }}>✦</span>
                        <span style={{ height: "1px", width: "64px", backgroundColor: colores.doradoChampagne }} />
                    </div>
                </div>

                <div
                    className="rsvp-card"
                    style={{
                        backgroundColor: colores.blancoHueso,
                        border: `1px solid ${colores.rosaRubor}`,
                        borderRadius: "1rem",
                        padding: "2.25rem 1.75rem",
                        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                    }}
                >
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
                                {esReservado ? "Pases reservados:" : "Pases asignados:"}{" "}
                                <strong>{adultos} adulto(s)</strong>
                                {ninos > 0 ? ` y ${ninos} niño(s)` : ""}
                            </span>
                        </div>
                    </div>

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
                            className={`rsvp-opcion ${asistencia === "si" ? "rsvp-opcion--activa" : ""}`}
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
                            className={`rsvp-opcion ${asistencia === "no" ? "rsvp-opcion--activa" : ""}`}
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
                            className="rsvp-textarea"
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

                    <button
                        type="button"
                        onClick={() => void enviarWhatsApp()}
                        disabled={confirmando}
                        className="rsvp-btn-wa"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            background: `linear-gradient(135deg, ${colores.paloDeRosa}, #bd8287)`,
                            color: colores.blancoHueso,
                            border: `1.5px solid ${colores.doradoChampagne}`,
                            padding: "12px 26px",
                            borderRadius: "9999px",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            cursor: confirmando ? "wait" : "pointer",
                            opacity: confirmando ? 0.75 : 1,
                        }}
                    >
                        <MessageCircle size={19} />
                        <span>
                            {confirmando
                                ? "Registrando respuesta..."
                                : "Enviar confirmación por WhatsApp"}
                        </span>
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
