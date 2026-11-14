import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import SobreAnimado from "../../components/sobre/SobreAnimado";
import Inicio from "../../components/invitacion/Inicio";

import { obtenerFamiliaPorId } from "../../services/familias.service";
import { invitacionConfig } from "../../config/invitacion.config";

import type { FamiliaInvitada } from "../../types/config/familia.types";

const InvitacionPage = () => {
    const [familia, setFamilia] = useState<FamiliaInvitada | undefined>();
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [invitacionAbierta, setInvitacionAbierta] = useState(false);

    useEffect(() => {
        const cargarFamilia = async () => {
            const parametros = new URLSearchParams(window.location.search);
            const familiaId = parametros.get("familia");

            if (!familiaId) {
                setError("No se especificó una familia.");
                setCargando(false);
                return;
            }

            try {
                const resultado = await obtenerFamiliaPorId(familiaId);

                if (!resultado) {
                    setError("No encontramos esta invitación.");
                    return;
                }

                setFamilia(resultado);
            } catch (error) {
                console.error(error);
                setError("No fue posible consultar la invitación.");
            } finally {
                setCargando(false);
            }
        };

        void cargarFamilia();
    }, []);

    const { general, evento } = invitacionConfig;

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f9f6f0", color: "#795860", fontFamily: "Georgia, serif" }}>
                Preparando tu invitación...
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#f9f6f0", color: "#795860", fontFamily: "Georgia, serif" }}>
                {error}
            </div>
        );
    }

    return (
        <>
            {!invitacionAbierta ? (
                <SobreAnimado
                    nombreFamilia={familia?.familia}
                    onAbrir={() => setInvitacionAbierta(true)}
                />
            ) : (
                <main className="invitacion-main">
                    <button
                        type="button"
                        onClick={() => {
                            setInvitacionAbierta(false);
                            window.scrollTo(0, 0);
                        }}
                        className="btn-regresar-sobre"
                    >
                        <span className="btn-regresar-sobre__icono">
                            <ArrowLeft size={14} strokeWidth={2.2} />
                        </span>
                        <span>Regresar al sobre</span>
                    </button>

                    <Inicio
                        nombre={general.nombre}
                        nombreCompleto={general.nombreCompleto}
                        titulo={general.titulo}
                        fecha={evento.fecha}
                        hora={evento.hora}
                    />
                </main>
            )}
        </>
    );
};

export default InvitacionPage;
