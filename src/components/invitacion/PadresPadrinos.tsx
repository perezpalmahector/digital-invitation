import React from "react";
import { Heart, Award } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const PadresPadrinos: React.FC = () => {
    const personas = invitacionConfig.personasEspeciales;

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

    if (!personas) return null;

    return (
        <section
            id="padres-padrinos"
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "860px", margin: "0 auto" }}>
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
                        style={{
                            backgroundColor: colores.blancoHueso,
                            border: `1px solid ${colores.rosaRubor}`,
                            borderRadius: "1rem",
                            padding: "2.25rem 1.5rem",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <div
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
                        style={{
                            backgroundColor: colores.blancoHueso,
                            border: `1px solid ${colores.rosaRubor}`,
                            borderRadius: "1rem",
                            padding: "2.25rem 1.5rem",
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <div
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
