import { useState, type ReactNode } from "react";
import { Lock, LogIn, User, KeyRound, Eye, EyeOff } from "lucide-react";

interface RutaProtegidaAdminProps {
    children: ReactNode;
}

const USUARIO_ADMIN = "admin";
const PASSWORD_ADMIN = "mary2026#";
const STORAGE_KEY = "mary_xviii_admin_auth";

const RutaProtegidaAdmin = ({ children }: RutaProtegidaAdminProps) => {
    const [autenticado, setAutenticado] = useState<boolean>(() => {
        return sessionStorage.getItem(STORAGE_KEY) === "true";
    });

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mostrarPass, setMostrarPass] = useState(false);
    const [error, setError] = useState("");
    const [sacudir, setSacudir] = useState(false);

    const manejarLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (
            usuario.trim() === USUARIO_ADMIN &&
            password.trim() === PASSWORD_ADMIN
        ) {
            sessionStorage.setItem(STORAGE_KEY, "true");
            setAutenticado(true);
            setError("");
        } else {
            setError("Usuario o contraseña incorrectos.");
            setSacudir(false);
            setTimeout(() => setSacudir(true), 10);
        }
    };

    if (autenticado) {
        return <>{children}</>;
    }

    return (
        <section className="rpa-wrap">
            <style>{`
                .rpa-wrap {
                    min-height: 100vh;
                    min-height: 100svh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1.5rem;
                    box-sizing: border-box;
                    background: radial-gradient(circle at top, #F9F6F0 0%, #EFE6D5 100%);
                    font-family: system-ui, -apple-system, sans-serif;
                }

                .rpa-wrap * {
                    box-sizing: border-box;
                }

                .rpa-card {
                    width: 100%;
                    max-width: 410px;
                    background: #F9F6F0;
                    border: 1.5px solid #D4AF37;
                    border-radius: 22px;
                    padding: 10px;
                    box-shadow: 0 18px 40px rgba(92, 58, 60, 0.14);
                    animation: rpaEntrada 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                .rpa-card--error {
                    animation: rpaSacudida 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
                }

                .rpa-inner {
                    border: 1px solid rgba(212, 175, 55, 0.45);
                    border-radius: 15px;
                    padding: 2.25rem 1.75rem 2rem;
                    background: linear-gradient(180deg, #ffffff 0%, #F9F6F0 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }

                .rpa-candado {
                    width: 58px;
                    height: 58px;
                    border-radius: 50%;
                    background: #F4C2C2;
                    color: #5C3A3C;
                    border: 1.5px solid #D4AF37;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                    animation: rpaPulsoCandado 3s ease-in-out infinite;
                }

                .rpa-etiqueta {
                    color: #D4AF37;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                }

                .rpa-titulo {
                    color: #D59A9E;
                    font-family: Georgia, serif;
                    font-size: 1.75rem;
                    font-weight: 500;
                    margin: 0.35rem 0 0.2rem;
                    line-height: 1.2;
                }

                .rpa-subtitulo {
                    color: #795860;
                    font-family: Georgia, serif;
                    font-style: italic;
                    font-size: 0.95rem;
                    margin: 0;
                }
            `}</style>
            <style>{`
                .rpa-ornamento {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin: 1.1rem 0 1.5rem;
                    width: 100%;
                }

                .rpa-ornamento span:not(.rpa-estrella) {
                    height: 1px;
                    width: 52px;
                    background: #D4AF37;
                    opacity: 0.7;
                }

                .rpa-estrella {
                    color: #D4AF37;
                    font-size: 0.95rem;
                }

                .rpa-alerta {
                    width: 100%;
                    background: rgba(213, 154, 158, 0.18);
                    border: 1px solid #D59A9E;
                    color: #7a3e43;
                    border-radius: 10px;
                    padding: 0.6rem 0.85rem;
                    font-size: 0.84rem;
                    font-weight: 500;
                    margin-bottom: 1.1rem;
                    animation: rpaFadeAlerta 0.3s ease both;
                }

                .rpa-campo {
                    width: 100%;
                    text-align: left;
                    margin-bottom: 1.1rem;
                }

                .rpa-label {
                    display: block;
                    color: #5C3A3C;
                    font-size: 0.82rem;
                    font-weight: 600;
                    margin-bottom: 0.4rem;
                    padding-left: 2px;
                }

                .rpa-input-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 100%;
                }

                .rpa-input-icono {
                    position: absolute;
                    left: 13px;
                    color: #D59A9E;
                    display: flex;
                    align-items: center;
                    pointer-events: none;
                }

                .rpa-input {
                    width: 100%;
                    height: 44px;
                    padding: 0 38px 0 38px;
                    border-radius: 12px;
                    border: 1px solid #F4C2C2;
                    background: #EFE6D5;
                    color: #44403c;
                    font-size: 0.94rem;
                    outline: none;
                    transition: border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
                }

                .rpa-input:focus {
                    background: #ffffff;
                    border-color: #D4AF37;
                    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
                }

                .rpa-ojo {
                    position: absolute;
                    right: 11px;
                    background: transparent;
                    border: none;
                    color: #8f6924;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    padding: 4px;
                }

                .rpa-btn {
                    width: 100%;
                    height: 46px;
                    margin-top: 0.5rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #D59A9E, #bd8287);
                    color: #F9F6F0;
                    border: 1.5px solid #D4AF37;
                    border-radius: 9999px;
                    font-size: 0.95rem;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    cursor: pointer;
                    box-shadow: 0 6px 16px rgba(213, 154, 158, 0.4);
                    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
                }

                .rpa-btn:hover {
                    transform: translateY(-2px);
                    filter: brightness(1.04);
                    box-shadow: 0 10px 22px rgba(213, 154, 158, 0.52);
                }

                @keyframes rpaEntrada {
                    from { opacity: 0; transform: translateY(22px) scale(0.96); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes rpaSacudida {
                    10%, 90% { transform: translateX(-3px); }
                    20%, 80% { transform: translateX(5px); }
                    30%, 50%, 70% { transform: translateX(-7px); }
                    40%, 60% { transform: translateX(7px); }
                }

                @keyframes rpaPulsoCandado {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.35);
                    }
                    50% {
                        transform: scale(1.06);
                        box-shadow: 0 0 0 7px rgba(212, 175, 55, 0);
                    }
                }

                @keyframes rpaFadeAlerta {
                    from { opacity: 0; transform: translateY(-6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <form
                className={`rpa-card ${sacudir ? "rpa-card--error" : ""}`}
                onSubmit={manejarLogin}
            >
                <div className="rpa-inner">
                    <div className="rpa-candado">
                        <Lock size={25} strokeWidth={1.8} />
                    </div>

                    <span className="rpa-etiqueta">Panel de Control</span>
                    <h1 className="rpa-titulo">Acceso Administrador</h1>
                    <p className="rpa-subtitulo">XVIII Años de Mary</p>

                    <div className="rpa-ornamento">
                        <span />
                        <span className="rpa-estrella">✦</span>
                        <span />
                    </div>

                    {error && (
                        <div className="rpa-alerta" role="alert">
                            {error}
                        </div>
                    )}

                    <div className="rpa-campo">
                        <label htmlFor="admin-user" className="rpa-label">
                            Usuario
                        </label>
                        <div className="rpa-input-box">
                            <span className="rpa-input-icono">
                                <User size={17} />
                            </span>
                            <input
                                id="admin-user"
                                type="text"
                                className="rpa-input"
                                placeholder="Ingresa tu usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="rpa-campo" style={{ marginBottom: "1.35rem" }}>
                        <label htmlFor="admin-pass" className="rpa-label">
                            Contraseña
                        </label>
                        <div className="rpa-input-box">
                            <span className="rpa-input-icono">
                                <KeyRound size={17} />
                            </span>
                            <input
                                id="admin-pass"
                                type={mostrarPass ? "text" : "password"}
                                className="rpa-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="rpa-ojo"
                                onClick={() => setMostrarPass((prev) => !prev)}
                                aria-label="Mostrar u ocultar contraseña"
                            >
                                {mostrarPass ? <EyeOff size={17} /> : <Eye size={17} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="rpa-btn">
                        <LogIn size={18} />
                        <span>Ingresar al panel</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default RutaProtegidaAdmin;
