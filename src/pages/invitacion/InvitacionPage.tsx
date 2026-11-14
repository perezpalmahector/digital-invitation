import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";

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

    // Control de música
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [reproduciendo, setReproduciendo] = useState(false);

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
            } catch (err) {
                console.error(err);
                setError("No fue posible consultar la invitación.");
            } finally {
                setCargando(false);
            }
        };

        void cargarFamilia();
    }, []);

    // Reproducir automáticamente cuando entran a Inicio
    useEffect(() => {
        if (!invitacionAbierta || !audioRef.current) return;

        audioRef.current
            .play()
            .then(() => {
                setReproduciendo(true);
            })
            .catch(() => {
                setReproduciendo(false);
            });
    }, [invitacionAbierta]);

    const alternarAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (reproduciendo) {
            audio.pause();
            setReproduciendo(false);
        } else {
            audio
                .play()
                .then(() => setReproduciendo(true))
                .catch(() => setReproduciendo(false));
        }
    };

    const manejarRegresarAlSobre = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setReproduciendo(false);
        }
        setInvitacionAbierta(false);
        window.scrollTo(0, 0);
    };

    const { general, evento } = invitacionConfig;

    if (cargando) {
        return (
            <div
                className="d-flex justify-content-center align-items-center vh-100"
                style={{
                    background: "#f9f6f0",
                    color: "#795860",
                    fontFamily: "Georgia, serif",
                }}
            >
                Preparando tu invitación...
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="d-flex justify-content-center align-items-center vh-100"
                style={{
                    background: "#f9f6f0",
                    color: "#795860",
                    fontFamily: "Georgia, serif",
                }}
            >
                {error}
            </div>
        );
    }

    return (
        <>
            {/* Elemento de audio persistente */}
            <audio ref={audioRef} src="/music/audio.mp3" loop preload="auto" />

            {!invitacionAbierta ? (
                <SobreAnimado
                    nombreFamilia={familia?.familia}
                    onAbrir={() => {
                        // Aprovechamos el clic en el sello para desbloquear el autoplay en celulares
                        if (audioRef.current) {
                            audioRef.current
                                .play()
                                .then(() => setReproduciendo(true))
                                .catch(() => setReproduciendo(false));
                        }
                        setInvitacionAbierta(true);
                    }}
                />
            ) : (
                <main className="invitacion-main">
                    {/* Botón fijo para regresar al sobre */}
                    <button
                        type="button"
                        onClick={manejarRegresarAlSobre}
                        className="btn-regresar-sobre"
                    >
                        <span className="btn-regresar-sobre__icono">
                            <ArrowLeft size={14} strokeWidth={2.2} />
                        </span>
                        <span>Regresar al sobre</span>
                    </button>

                    {/* Botón flotante fijo para reproducir / pausar música en toda la página */}
                    <button
                        type="button"
                        onClick={alternarAudio}
                        className={`btn-audio-flotante ${reproduciendo ? "btn-audio-flotante--activo" : ""
                            }`}
                        aria-label={reproduciendo ? "Pausar música" : "Reproducir música"}
                        title={reproduciendo ? "Pausar música" : "Reproducir música"}
                    >
                        <span className="btn-audio-flotante__icono">
                            {reproduciendo ? (
                                <Volume2 size={15} strokeWidth={2.2} />
                            ) : (
                                <VolumeX size={15} strokeWidth={2.2} />
                            )}
                        </span>
                        <span>{reproduciendo ? "Música" : "Reproducir"}</span>
                    </button>

                    <Inicio
                        nombre={general.nombre}
                        nombreCompleto={general.nombreCompleto}
                        titulo={general.titulo}
                        fecha={evento.fecha}
                        hora={evento.hora}
                    />

                    {/* Aquí debajo puedes ir agregando tus demás secciones con scroll normal */}
                </main>
            )}
        </>
    );
};

export default InvitacionPage;
