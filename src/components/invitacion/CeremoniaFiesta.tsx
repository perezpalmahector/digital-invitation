import React from "react";
import { Church, PartyPopper, Clock, MapPin, ExternalLink } from "lucide-react";
import { invitacionConfig } from "../../config/invitacion.config";

export const CeremoniaFiesta: React.FC = () => {
    const ubicaciones = invitacionConfig.ubicaciones;

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

    if (!ubicaciones) {
        return null;
    }

    const eventos = [ubicaciones.ceremonia, ubicaciones.recepcion];

    return (
        <section
            id="ceremonia-fiesta"
            style={{
                backgroundColor: colores.cremaMarfil,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "920px", margin: "0 auto" }}>
                {/* Subtítulo superior */}
                <span
                    style={{
                        color: colores.doradoChampagne,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                    }}
                >
                    Dónde y Cuándo
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
                    Ceremonia y Recepción
                </h2>

                {/* Ornamento divisorio dorado */}
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

                {/* Grid responsivo para Ceremonia y Fiesta */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                        gap: "1.75rem",
                    }}
                >
                    {eventos.map((item) => {
                        const esCeremonia = item.tipo === "ceremonia";

                        return (
                            <div
                                key={item.tipo}
                                style={{
                                    backgroundColor: colores.blancoHueso,
                                    border: `1px solid ${colores.rosaRubor}`,
                                    borderRadius: "1rem",
                                    padding: "2.25rem 1.75rem",
                                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    {/* Ícono circular */}
                                    <div
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            borderRadius: "50%",
                                            backgroundColor: colores.rosaRubor,
                                            color: "#5C3A3C",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto 1.25rem auto",
                                            border: `1px solid ${colores.doradoChampagne}`,
                                        }}
                                    >
                                        {esCeremonia ? (
                                            <Church size={28} strokeWidth={1.8} />
                                        ) : (
                                            <PartyPopper size={28} strokeWidth={1.8} />
                                        )}
                                    </div>

                                    {/* Título de tarjeta (Ceremonia / Recepción) */}
                                    <span
                                        style={{
                                            color: colores.doradoChampagne,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.14em",
                                            fontSize: "0.75rem",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {item.titulo}
                                    </span>

                                    {/* Nombre del lugar */}
                                    <h3
                                        style={{
                                            color: colores.paloDeRosa,
                                            fontFamily: "Georgia, serif",
                                            fontSize: "1.35rem",
                                            marginTop: "0.4rem",
                                            marginBottom: "1rem",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {item.lugar}
                                    </h3>

                                    {/* Horario */}
                                    <div
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            backgroundColor: colores.cremaMarfil,
                                            padding: "6px 14px",
                                            borderRadius: "9999px",
                                            color: "#5C3A3C",
                                            fontSize: "0.875rem",
                                            fontWeight: 600,
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        <Clock size={15} color={colores.doradoChampagne} />
                                        <span>{item.hora}</span>
                                    </div>

                                    {/* Dirección */}
                                    <p
                                        style={{
                                            color: "#57534e",
                                            fontSize: "0.95rem",
                                            lineHeight: 1.6,
                                            margin: "0 auto 1.5rem auto",
                                            maxWidth: "320px",
                                        }}
                                    >
                                        {item.direccion}
                                    </p>
                                </div>

                                {/* Botones de acción */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.65rem",
                                        width: "100%",
                                        maxWidth: "240px",
                                    }}
                                >
                                    <a
                                        href={item.mapaUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            backgroundColor: colores.paloDeRosa,
                                            color: colores.blancoHueso,
                                            textDecoration: "none",
                                            padding: "10px 18px",
                                            borderRadius: "9999px",
                                            fontSize: "0.875rem",
                                            fontWeight: 600,
                                            boxShadow: "0 2px 8px rgba(213, 154, 158, 0.35)",
                                        }}
                                    >
                                        <MapPin size={16} />
                                        <span>Ver ubicación</span>
                                    </a>

                                    {item.sitioWeb && (
                                        <a
                                            href={item.sitioWeb}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "6px",
                                                backgroundColor: "transparent",
                                                color: colores.paloDeRosa,
                                                border: `1px solid ${colores.doradoChampagne}`,
                                                textDecoration: "none",
                                                padding: "8px 16px",
                                                borderRadius: "9999px",
                                                fontSize: "0.8rem",
                                                fontWeight: 500,
                                            }}
                                        >
                                            <span>Sitio de la parroquia</span>
                                            <ExternalLink size={13} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CeremoniaFiesta;
