import React, { useState } from "react";
import { Gift, Mail, Copy, Check } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const MesaRegalos: React.FC = () => {
    const { mesaRegalos, personalizacion } = invitacionConfig;
    const [copiado, setCopiado] = useState(false);

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

    if (!personalizacion.mostrarMesaRegalos || !mesaRegalos) {
        return null;
    }

    const copiarClabe = () => {
        const textoACopiar =
            mesaRegalos.datosBancarios?.clabe ||
            mesaRegalos.datosBancarios?.cuenta ||
            "";
        if (!textoACopiar) return;

        navigator.clipboard.writeText(textoACopiar);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2500);
    };

    return (
        <section
            id="mesa-regalos"
            style={{
                backgroundColor: colores.blancoHueso,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "740px", margin: "0 auto" }}>
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

                <p
                    style={{
                        color: "#57534e",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        maxWidth: "580px",
                        margin: "0 auto 2rem auto",
                    }}
                >
                    {mesaRegalos.mensaje}
                </p>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                        gap: "1.5rem",
                    }}
                >
                    {/* Tarjeta Lluvia de Sobres */}
                    {mesaRegalos.lluviaSobres && (
                        <div
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

                    {/* Tarjeta Datos Bancarios */}
                    {mesaRegalos.datosBancarios && (
                        <div
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
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    backgroundColor: colores.paloDeRosa,
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
            </div>
        </section>
    );
};

export default MesaRegalos;
