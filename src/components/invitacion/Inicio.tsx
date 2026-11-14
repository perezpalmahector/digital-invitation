import { useEffect, useState } from "react";
import "./Inicio.scss";

interface InicioProps {
    nombre: string;
    nombreCompleto: string;
    titulo: string;
    fecha: string;
    hora: string;
}

interface TiempoRestante {
    dias: number;
    horas: number;
    minutos: number;
    segundos: number;
}

const calcularTiempo = (fecha: string, hora: string): TiempoRestante => {
    const destino = new Date(`${fecha}T${hora}:00`).getTime();
    const diferencia = Math.max(0, destino - Date.now());

    return {
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((diferencia / (1000 * 60)) % 60),
        segundos: Math.floor((diferencia / 1000) % 60),
    };
};

const Inicio = ({
    nombre,
    nombreCompleto,
    titulo,
    fecha,
    hora,
}: InicioProps) => {
    const [tiempo, setTiempo] = useState<TiempoRestante>(() =>
        calcularTiempo(fecha, hora)
    );

    useEffect(() => {
        const intervalo = window.setInterval(() => {
            setTiempo(calcularTiempo(fecha, hora));
        }, 1000);

        return () => window.clearInterval(intervalo);
    }, [fecha, hora]);

    const fechaFormateada = new Date(`${fecha}T12:00:00`).toLocaleDateString(
        "es-MX",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

    return (
        <section className="inicio-mary">
            {/* Foto protagonista */}
            <div className="inicio-foto-hero">
                <div className="inicio-marco">
                    <img
                        src="/images/Mary-18.png"
                        alt={`Mary, ${nombreCompleto}`}
                        className="inicio-imagen"
                    />
                </div>
            </div>

            {/* Contenido ordenado */}
            <div className="inicio-contenido">
                <header className="inicio-encabezado">
                    <span className="inicio-etiqueta">
                        CON LA BENDICIÓN DE DIOS Y DE MIS PADRES
                    </span>

                    <p className="inicio-presentacion">
                        Tenemos el honor de invitarte a celebrar
                    </p>

                    <h1>{titulo}</h1>

                    <h2 className="inicio-nombre">{nombre}</h2>

                    <p className="inicio-nombre-completo">{nombreCompleto}</p>
                </header>

                <div className="inicio-tarjeta-datos">
                    <div className="inicio-separador">
                        <span />
                        <span className="inicio-diamante">✧</span>
                        <span />
                    </div>

                    <div className="inicio-fecha">
                        <span>UNA FECHA PARA RECORDAR</span>
                        <h3>{fechaFormateada}</h3>
                        <p>{hora} hrs.</p>
                    </div>

                    <div className="inicio-cuenta">
                        <h3>Falta muy poco para celebrar</h3>

                        <div className="cuenta-grid">
                            <div className="cuenta-item">
                                <strong>{tiempo.dias}</strong>
                                <span>Días</span>
                            </div>

                            <div className="cuenta-item">
                                <strong>{tiempo.horas}</strong>
                                <span>Horas</span>
                            </div>

                            <div className="cuenta-item">
                                <strong>{tiempo.minutos}</strong>
                                <span>Minutos</span>
                            </div>

                            <div className="cuenta-item">
                                <strong>{tiempo.segundos}</strong>
                                <span>Segundos</span>
                            </div>
                        </div>
                    </div>

                    <p className="inicio-frase">
                        "Los momentos especiales se convierten en recuerdos que duran para
                        siempre."
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Inicio;
