import React from "react";
import {
    Church,
    Sparkles,
    Heart,
    Wine,
    Utensils,
    Music,
    Clock,
} from "lucide-react";
import {
    invitacionConfig,
    type ActividadItinerario,
} from "../../config/invitacion.config";

export const Itinerario: React.FC = () => {
    const actividades = invitacionConfig.itinerario ?? [];

    const colores = {
        paloDeRosa: invitacionConfig.colores?.paloDeRosa ?? "#D59A9E",
        doradoChampagne: invitacionConfig.colores?.doradoChampagne ?? "#D4AF37",
        blancoHueso: invitacionConfig.colores?.blancoHueso ?? "#F9F6F0",
        rosaRubor: invitacionConfig.colores?.rosaRubor ?? "#F4C2C2",
        cremaMarfil: invitacionConfig.colores?.cremaMarfil ?? "#EFE6D5",
    };

    if (actividades.length === 0) return null;

    const obtenerIcono = (tipo: ActividadItinerario["icono"]) => {
        switch (tipo) {
            case "iglesia":
                return <Church size={20} strokeWidth={1.8} />;
            case "recepcion":
                return <Sparkles size={20} strokeWidth={1.8} />;
            case "vals":
                return <Heart size={20} strokeWidth={1.8} />;
            case "brindis":
                return <Wine size={20} strokeWidth={1.8} />;
            case "cena":
                return <Utensils size={20} strokeWidth={1.8} />;
            case "baile":
                return <Music size={20} strokeWidth={1.8} />;
            default:
                return <Clock size={20} strokeWidth={1.8} />;
        }
    };

    return (
        <section
            id="itinerario"
            style={{
                backgroundColor: colores.blancoHueso,
                padding: "4.5rem 1.25rem",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: "720px", margin: "0 auto" }}>
                <span
                    style={{
                        color: colores.doradoChampagne,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                    }}
                >
                    Momentos Especiales
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
                    Itinerario del Evento
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

                {/* Lista de actividades */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        textAlign: "left",
                    }}
                >
                    {actividades.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: colores.cremaMarfil,
                                border: `1px solid ${colores.rosaRubor}`,
                                borderRadius: "1rem",
                                padding: "1.25rem 1.5rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "1.15rem",
                                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.03)",
                            }}
                        >
                            {/* Ícono circular */}
                            <div
                                style={{
                                    minWidth: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    backgroundColor: colores.rosaRubor,
                                    color: "#5C3A3C",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: `1px solid ${colores.doradoChampagne}`,
                                }}
                            >
                                {obtenerIcono(item.icono)}
                            </div>

                            {/* Contenido */}
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "6px",
                                        marginBottom: "0.25rem",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: colores.paloDeRosa,
                                            fontFamily: "Georgia, serif",
                                            fontSize: "1.15rem",
                                            fontWeight: 600,
                                            margin: 0,
                                        }}
                                    >
                                        {item.titulo}
                                    </h3>
                                    <span
                                        style={{
                                            backgroundColor: colores.blancoHueso,
                                            color: colores.doradoChampagne,
                                            border: `1px solid ${colores.doradoChampagne}`,
                                            padding: "2px 10px",
                                            borderRadius: "9999px",
                                            fontSize: "0.78rem",
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.hora}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        color: "#57534e",
                                        fontSize: "0.92rem",
                                        lineHeight: 1.5,
                                        margin: 0,
                                    }}
                                >
                                    {item.descripcion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Itinerario;
