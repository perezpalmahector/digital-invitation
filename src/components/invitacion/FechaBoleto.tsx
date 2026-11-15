import { useEffect, useRef, useState } from "react";
import { Sparkles, Ticket, Calendar, Clock, Heart, Crown } from "lucide-react";
import "./FechaBoleto.scss";
import { invitacionConfig } from "../../config/invitacion.config";

interface FechaBoletoProps {
    tituloEvento: string;
    nombreFestejada: string;
    fecha: string;
    hora: string;
    codigoFamilia?: string;
    nombreFamilia?: string;
    mensajeFamilia?: string;
    adultos?: number;
    ninos?: number;
}

interface CirculoRascaProps {
    etiqueta: string;
    valor: string;
    subvalor?: string;
    revelado: boolean;
    onRevelar: () => void;
}

const CirculoRasca = ({
    etiqueta,
    valor,
    subvalor,
    revelado,
    onRevelar,
}: CirculoRascaProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const raspandoRef = useRef(false);
    const completadoRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = 116;
        canvas.width = size;
        canvas.height = size;

        const grad = ctx.createLinearGradient(0, 0, size, size);
        grad.addColorStop(0, "#e6c768");
        grad.addColorStop(0.5, "#d4af37");
        grad.addColorStop(1, "#b48d28");

        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#ffffff";
        ctx.font = "italic 12px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText("Raspa aquí", size / 2, size / 2 - 2);
        ctx.font = "14px Georgia, serif";
        ctx.fillText("✧", size / 2, size / 2 + 16);
    }, []);

    const verificarPorcentaje = () => {
        if (completadoRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let transparentes = 0;
        const total = pixels.length / 4;

        for (let i = 3; i < pixels.length; i += 4) {
            if ((pixels.at(i) ?? 255) < 128) transparentes++;
        }

        if (transparentes / total > 0.4) {
            completadoRef.current = true;
            onRevelar();
        }
    };

    const rasparEn = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas || completadoRef.current) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * canvas.width;
        const y = ((clientY - rect.top) / rect.height) * canvas.height;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 18, 0, Math.PI * 2);
        ctx.fill();

        verificarPorcentaje();
    };

    return (
        <div className="rasca-item">
            <span className="rasca-item__etiqueta">{etiqueta}</span>

            <div
                className={`rasca-circulo ${revelado ? "rasca-circulo--revelado" : ""
                    }`}
            >
                <div className="rasca-circulo__contenido">
                    <strong>{valor}</strong>
                    {subvalor && <span>{subvalor}</span>}
                </div>

                {!revelado && (
                    <canvas
                        ref={canvasRef}
                        className="rasca-circulo__canvas"
                        onMouseDown={(e) => {
                            raspandoRef.current = true;
                            rasparEn(e.clientX, e.clientY);
                        }}
                        onMouseMove={(e) => {
                            if (raspandoRef.current) rasparEn(e.clientX, e.clientY);
                        }}
                        onMouseUp={() => {
                            raspandoRef.current = false;
                        }}
                        onMouseLeave={() => {
                            raspandoRef.current = false;
                        }}
                        onTouchStart={(e) => {
                            raspandoRef.current = true;
                            const touch = e.touches.item(0);
                            if (touch) rasparEn(touch.clientX, touch.clientY);
                        }}
                        onTouchMove={(e) => {
                            const touch = e.touches.item(0);
                            if (touch) rasparEn(touch.clientX, touch.clientY);
                        }}
                        onTouchEnd={() => {
                            raspandoRef.current = false;
                        }}
                    />
                )}
            </div>
        </div>
    );
};
const FechaBoleto = ({
    tituloEvento,
    nombreFestejada,
    fecha,
    hora,
    codigoFamilia,
    nombreFamilia = "Invitados Especiales",
    mensajeFamilia = "Es un honor compartir con ustedes este día tan especial en mi vida.",
    adultos,
    ninos,
}: FechaBoletoProps) => {
    const [revelados, setRevelados] = useState({
        dia: false,
        mes: false,
        hora: false,
    });

    const fechaObj = new Date(`${fecha}T12:00:00`);
    const diaNumero = fechaObj.toLocaleDateString("es-MX", { day: "2-digit" });
    const diaSemana = fechaObj.toLocaleDateString("es-MX", { weekday: "short" });
    const mesNombre = fechaObj.toLocaleDateString("es-MX", { month: "short" });
    const anioNumero = fechaObj.toLocaleDateString("es-MX", { year: "numeric" });
    const fechaLarga = fechaObj.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const todosRevelados = revelados.dia && revelados.mes && revelados.hora;
    const esReservado = invitacionConfig.personalizacion?.tieneReservacion ?? false;

    const saludoFamilia = /^familia\b/i.test(nombreFamilia.trim())
        ? nombreFamilia.trim()
        : `Familia ${nombreFamilia.trim()}`;

    const totalPases = (adultos ?? 0) + (ninos ?? 0);
    const folioTicket = codigoFamilia || `MARY-XVIII-${diaNumero}12`;

    return (
        <section className="fecha-boleto">
            <div className="fecha-boleto__contenedor">
                <header className="fecha-boleto__header">
                    <span className="fecha-boleto__eyebrow">
                        <Sparkles size={14} /> RESERVA LA FECHA <Sparkles size={14} />
                    </span>
                    <h2>Descubre el gran día</h2>
                    <p>Raspa los círculos dorados para revelar cuándo celebraremos</p>
                </header>

                <div className="rasca-grid">
                    <CirculoRasca
                        etiqueta="DÍA"
                        valor={diaNumero}
                        subvalor={diaSemana.replace(".", "")}
                        revelado={revelados.dia}
                        onRevelar={() => setRevelados((prev) => ({ ...prev, dia: true }))}
                    />

                    <CirculoRasca
                        etiqueta="MES Y AÑO"
                        valor={mesNombre.replace(".", "").toUpperCase()}
                        subvalor={anioNumero}
                        revelado={revelados.mes}
                        onRevelar={() => setRevelados((prev) => ({ ...prev, mes: true }))}
                    />

                    <CirculoRasca
                        etiqueta="HORA"
                        valor={hora}
                        subvalor="hrs."
                        revelado={revelados.hora}
                        onRevelar={() => setRevelados((prev) => ({ ...prev, hora: true }))}
                    />
                </div>

                {!todosRevelados && (
                    <button
                        type="button"
                        className="fecha-boleto__btn-revelar"
                        onClick={() => setRevelados({ dia: true, mes: true, hora: true })}
                    >
                        Descubrir todo ahora
                    </button>
                )}

                <article
                    className={`boleto-ticket ${todosRevelados ? "boleto-ticket--destacado" : ""
                        }`}
                >
                    <div className="boleto-ticket__cuerpo">
                        <div className="boleto-ticket__marco-interno">
                            <div className="boleto-ticket__top-bar">
                                <span className="boleto-ticket__tag">
                                    <Crown size={13} /> PASE OFICIAL
                                </span>
                                <span className="boleto-ticket__folio">XVIII • VIP</span>
                            </div>

                            <span className="boleto-ticket__evento">{tituloEvento}</span>
                            <h3 className="boleto-ticket__festejada">{nombreFestejada}</h3>

                            <div className="boleto-ticket__fecha-box">
                                <div>
                                    <Calendar size={14} />
                                    <span>{fechaLarga}</span>
                                </div>
                                <span className="boleto-ticket__punto">•</span>
                                <div>
                                    <Clock size={14} />
                                    <span>{hora} hrs.</span>
                                </div>
                            </div>

                            <blockquote className="boleto-ticket__mensaje">
                                <Heart size={13} className="boleto-ticket__corazon" />
                                <p>"{mensajeFamilia}"</p>
                                <span>— Con cariño, {nombreFestejada}</span>
                            </blockquote>
                        </div>
                    </div>

                    <div className="boleto-ticket__divisor" aria-hidden="true">
                        <span className="boleto-ticket__muesca boleto-ticket__muesca--a" />
                        <span className="boleto-ticket__linea-punteada" />
                        <span className="boleto-ticket__muesca boleto-ticket__muesca--b" />
                    </div>

                    <div className="boleto-ticket__talon">
                        <div className="boleto-ticket__talon-inner">
                            <div className="boleto-ticket__talon-icono">
                                <Ticket size={18} />
                            </div>

                            <span className="boleto-ticket__para">
                                {esReservado ? "RESERVADO PARA" : "INVITACIÓN PARA"}
                            </span>
                            <h4 className="boleto-ticket__familia">{saludoFamilia}</h4>
                            {!esReservado && (
                                <small className="boleto-ticket__nota-libre">
                                    Lugares conforme vayan llegando
                                </small>
                            )}

                            {totalPases > 0 && (
                                <div className="boleto-ticket__pases">
                                    <span className="boleto-ticket__pases-total">
                                        {totalPases} {totalPases === 1 ? "PASE" : "PASES"}
                                    </span>
                                    <div className="boleto-ticket__pases-detalle">
                                        {adultos !== undefined && adultos > 0 && (
                                            <span>
                                                {adultos} {adultos === 1 ? "Adulto" : "Adultos"}
                                            </span>
                                        )}
                                        {ninos !== undefined && ninos > 0 && (
                                            <span>
                                                {ninos} {ninos === 1 ? "Niño" : "Niños"}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="boleto-ticket__barcode" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                            <small className="boleto-ticket__codigo-texto">
                                {folioTicket}
                            </small>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default FechaBoleto;
