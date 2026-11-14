import { useState } from "react";
import { MailOpen } from "lucide-react";
import "./SobreAnimado.scss";

interface SobreAnimadoProps {
    onAbrir: () => void;
    nombreFamilia?: string;
}

const SobreAnimado = ({ onAbrir, nombreFamilia }: SobreAnimadoProps) => {
    const [abriendo, setAbriendo] = useState(false);

    const manejarApertura = () => {
        if (abriendo) return;
        setAbriendo(true);

        window.setTimeout(() => {
            onAbrir();
        }, 1400);
    };

    // Evita decir "Familia Familia López" si el nombre ya incluye la palabra "Familia"
    const saludoFamilia = nombreFamilia
        ? /^familia\b/i.test(nombreFamilia.trim())
            ? nombreFamilia.trim()
            : `Familia ${nombreFamilia.trim()}`
        : null;

    return (
        <section
            className={`sobre-animado ${abriendo ? "sobre-animado--abriendo" : ""}`}
        >
            <div className="sobre-animado__contenido">
                {saludoFamilia && (
                    <p className="sobre-animado__familia">{saludoFamilia}</p>
                )}

                <h1 className="sobre-animado__titulo">
                    Tienes una invitación muy especial
                </h1>

                <div className="sobre-animado__envoltura">
                    <img
                        src="/images/Envelope.png"
                        alt="Sobre de invitación de los XVIII años de Mary"
                        className="sobre-animado__imagen"
                    />

                    <button
                        type="button"
                        className="sobre-animado__sello"
                        onClick={manejarApertura}
                        disabled={abriendo}
                        aria-label="Abrir invitación"
                    >
                        <MailOpen size={25} strokeWidth={1.7} />
                    </button>
                </div>

                <p className="sobre-animado__instruccion">
                    Toca el sello para descubrir tu invitación
                </p>

                <span className="sobre-animado__firma">Con cariño, Mary</span>
            </div>
        </section>
    );
};

export default SobreAnimado;
