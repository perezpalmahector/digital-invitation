import React, { useEffect, useRef, useState } from "react";
import { Gift, Mail, Copy, Check } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const MesaRegalos: React.FC = () => {
    const { mesaRegalos, personalizacion } = invitacionConfig;
    const [copiado, setCopiado] = useState(false);
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
            { threshold: 0.15 }
        );

        observer.observe(elemento);
        return () => observer.disconnect();
    }, []);

    if (!personalizacion.mostrarMesaRegalos || !mesaRegalos) {
        return null;
    }

    const mostrarTarjetaBancaria =
        Boolean(mesaRegalos.mostrarDatosBancarios) &&
        Boolean(mesaRegalos.datosBancarios);
    const hayTarjetas = mesaRegalos.lluviaSobres || mostrarTarjetaBancaria;

    const copiarClabe = () => {
        const textoACopiar =
            mesaRegalos.datosBancarios?.clabe ||
            mesaRegalos.datosBancarios?.cuenta ||
            "";
        if (!textoACopiar) return;

        navigator.clipboard.writeText(textoACopiar.replace(/\s+/g, ""));
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2500);
    };

    return (
        <section
            ref={seccionRef}
            id="mesa-regalos"
            className={`mr-sec ${visible ? "mr-sec--activa" : ""}`}
            style={{
                backgroundColor: colores.blancoHueso,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                .mr-header {
                    opacity: 0;
                    transform: translateY(18px);
                    transition: opacity 0.8s ease, transform 0.8s ease;
                }
                .mr-sec--activa .mr-header {
                    opacity: 1;
                    transform: translateY(0);
                }

                .mr-mensaje {
                    opacity: 0;
                    transform: scale(0.96) translateY(14px);
                    transition: opacity 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s,
                                transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s;
                }
                .mr-sec--activa .mr-mensaje {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }

                .mr-card {
                    opacity: 0;
                    transform: translateY(26px) scale(0.94);
                    transition: opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                                transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                                box-shadow 0.35s ease;
                }
                .mr-card--2 {
                    transition-delay: 0.45s;
                }
                .mr-sec--activa .mr-card {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                .mr-card:hover {
                    transform: translateY(-5px) !important;
                    box-shadow: 0 14px 28px rgba(181, 115, 120, 0.16) !important;
                }

                .mr-sobre svg {
                    animation: mrFlotarSobre 3s ease-in-out infinite;
                }

                .mr-regalo svg {
                    animation: mrSacudidaRegalo 3.4s ease-in-out infinite;
                }

                .mr-btn-copiar {
                    transition: transform 0.25s ease, background-color 0.3s ease, box-shadow 0.25s ease;
                }
                .mr-btn-copiar:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 14px rgba(213, 154, 158, 0.45);
                }

                @keyframes mrFlotarSobre {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-4px) rotate(-4deg); }
                }

                @keyframes mrSacudidaRegalo {
                    0%, 100% { transform: rotate(0deg) scale(1); }
                    12% { transform: rotate(-9deg) scale(1.08); }
                    24% { transform: rotate(9deg) scale(1.08); }
                    36% { transform: rotate(-5deg); }
                    48% { transform: rotate(5deg); }
                    60% { transform: rotate(0deg) scale(1); }
                }
            `}</style>
            <div style={{ maxWidth: "740px", margin: "0 auto" }}>
                <div className="mr-header">
                    <span
                        style={{
                            color: colores.doradoChampagne,
                            textTransform: "uppercase",
                            letterSpacing: "0.18em",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                        }}
                    >
                        Sugerencia de Obsequio
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
                        {mesaRegalos.titulo}
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

                <p
                    className="mr-mensaje"
                    style={{
                        color: "#57534e",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        maxWidth: "580px",
                        margin: hayTarjetas ? "0 auto 2rem auto" : "0 auto",
                    }}
                >
                    {mesaRegalos.mensaje}
                </p>

                {hayTarjetas && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {mesaRegalos.lluviaSobres && (
                            <div
                                className="mr-card"
                                style={{
                                    backgroundColor: colores.cremaMarfil,
                                    border: `1px solid ${colores.rosaRubor}`,
                                    borderRadius: "1rem",
                                    padding: "2rem 1.5rem",
                                    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    className="mr-sobre"
                                    style={{
                                        width: "54px",
                                        height: "54px",
                                        borderRadius: "50%",
                                        backgroundColor: colores.rosaRubor,
                                        color: "#5C3A3C",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                        border: `1px solid ${colores.doradoChampagne}`,
                                    }}
                                >
                                    <Mail size={24} strokeWidth={1.8} />
                                </div>

                                <h3
                                    style={{
                                        color: colores.paloDeRosa,
                                        fontFamily: "Georgia, serif",
                                        fontSize: "1.25rem",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    Lluvia de Sobres
                                </h3>

                                <p
                                    style={{
                                        color: "#57534e",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.6,
                                        margin: 0,
                                    }}
                                >
                                    En el salón contaremos con un cofre especial para depositar tu
                                    sobre con cariño.
                                </p>
                            </div>
                        )}
                        {mostrarTarjetaBancaria && mesaRegalos.datosBancarios && (
                            <div
                                className="mr-card mr-card--2"
                                style={{
                                    backgroundColor: colores.cremaMarfil,
                                    border: `1px solid ${colores.rosaRubor}`,
                                    borderRadius: "1rem",
                                    padding: "2rem 1.5rem",
                                    boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    className="mr-regalo"
                                    style={{
                                        width: "54px",
                                        height: "54px",
                                        borderRadius: "50%",
                                        backgroundColor: colores.rosaRubor,
                                        color: "#5C3A3C",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginBottom: "1rem",
                                        border: `1px solid ${colores.doradoChampagne}`,
                                    }}
                                >
                                    <Gift size={24} strokeWidth={1.8} />
                                </div>

                                <h3
                                    style={{
                                        color: colores.paloDeRosa,
                                        fontFamily: "Georgia, serif",
                                        fontSize: "1.25rem",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    Transferencia Bancaria
                                </h3>

                                <div
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "#44403c",
                                        lineHeight: 1.7,
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <div>
                                        <strong>Banco:</strong> {mesaRegalos.datosBancarios.banco}
                                    </div>
                                    <div>
                                        <strong>Titular:</strong> {mesaRegalos.datosBancarios.titular}
                                    </div>
                                    <div>
                                        <strong>Cuenta:</strong> {mesaRegalos.datosBancarios.cuenta}
                                    </div>
                                    <div>
                                        <strong>CLABE:</strong> {mesaRegalos.datosBancarios.clabe}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={copiarClabe}
                                    className="mr-btn-copiar"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        backgroundColor: copiado ? "#6b8e6e" : colores.paloDeRosa,
                                        color: colores.blancoHueso,
                                        border: "none",
                                        padding: "8px 16px",
                                        borderRadius: "9999px",
                                        fontSize: "0.85rem",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                    }}
                                >
                                    {copiado ? <Check size={15} /> : <Copy size={15} />}
                                    <span>{copiado ? "¡CLABE Copiada!" : "Copiar CLABE"}</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MesaRegalos;
