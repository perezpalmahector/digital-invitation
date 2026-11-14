import { useState, type ReactNode } from "react";
import { Lock, LogIn } from "lucide-react";
import "../sitioprivado/SitioPrivado.scss";

interface RutaProtegidaAdminProps {
    children: ReactNode;
}

// Configura aquí tu usuario y contraseña fijos
const USUARIO_ADMIN = "admin";
const PASSWORD_ADMIN = "mary2026#";
const STORAGE_KEY = "mary_xviii_admin_auth";

const RutaProtegidaAdmin = ({ children }: RutaProtegidaAdminProps) => {
    const [autenticado, setAutenticado] = useState<boolean>(() => {
        return sessionStorage.getItem(STORAGE_KEY) === "true";
    });

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        }
    };

    if (autenticado) {
        return <>{children}</>;
    }

    return (
        <section className="sitio-privado">
            <form className="sitio-privado__card" onSubmit={manejarLogin}>
                <div className="sitio-privado__icono">
                    <Lock size={26} strokeWidth={1.6} />
                </div>

                <span className="sitio-privado__etiqueta">PANEL DE CONTROL</span>
                <h1>Acceso Administrador</h1>
                <p className="sitio-privado__subtitulo mb-3">XVIII Años de Mary</p>

                {error && (
                    <div className="alert alert-danger py-2 px-3 small mb-3" role="alert">
                        {error}
                    </div>
                )}

                <div className="text-start mb-3">
                    <label className="form-label small text-muted mb-1">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>

                <div className="text-start mb-4">
                    <label className="form-label small text-muted mb-1">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn w-100 d-flex justify-content-center align-items-center gap-2 text-white"
                    style={{
                        background: "linear-gradient(135deg, #d59a9e, #bd858b)",
                        borderRadius: "12px",
                        padding: "10px",
                        fontWeight: 500,
                    }}
                >
                    <LogIn size={17} />
                    <span>Ingresar al panel</span>
                </button>
            </form>
        </section>
    );
};

export default RutaProtegidaAdmin;
