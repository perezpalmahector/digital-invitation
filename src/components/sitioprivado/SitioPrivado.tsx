import { Lock } from "lucide-react";
import "./SitioPrivado.scss";

const SitioPrivado = () => {
    return (
        <section className="sitio-privado">
            <div className="sitio-privado__card">
                <div className="sitio-privado__icono">
                    <Lock size={28} strokeWidth={1.6} />
                </div>

                <span className="sitio-privado__etiqueta">ACCESO RESTRINGIDO</span>

                <h1>Invitación Privada</h1>

                <p className="sitio-privado__subtitulo">XVIII Años de Mary</p>

                <div className="sitio-privado__separador">
                    <span />
                    <span>✧</span>
                    <span />
                </div>

                <p className="sitio-privado__mensaje">
                    Este sitio es exclusivo para invitados. Para ver tu invitación
                    personalizada, por favor ingresa a través del enlace único que
                    recibiste por WhatsApp.
                </p>

                <span className="sitio-privado__firma">Con cariño, Mary</span>
            </div>
        </section>
    );
};

export default SitioPrivado;
