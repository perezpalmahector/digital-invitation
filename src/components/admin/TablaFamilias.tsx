
import {
    useMemo,
    useState,
    useEffect,
    useCallback
} from "react";

import {
    Search,
    MessageCircle,
    Copy,
    Users,
    Baby,
    UserRound,
    Eye,
    CheckCircle2,
    Clock,
    Send,
    RefreshCw,
    X
} from "lucide-react";

import { obtenerFamilias } from "../../services/familias.service";

import type {
    FamiliaInvitada,
    EstadoInvitacion
} from "../../types/config/familia.types";

import "./TablaFamilias.scss";

const TablaFamilias = () => {

    // =========================================
    // ESTADOS
    // =========================================

    const [familias, setFamilias] = useState<FamiliaInvitada[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos");

    const [familiaSeleccionada, setFamiliaSeleccionada] =
        useState<FamiliaInvitada | null>(null);

    const [mensajeCopiado, setMensajeCopiado] = useState("");

    // =========================================
    // CARGAR FAMILIAS DESDE API
    // =========================================

    const cargarFamilias = useCallback(async () => {
        try {
            setCargando(true);
            setError("");

            const datos = await obtenerFamilias();

            setFamilias(datos);

        } catch (err) {
            console.error("Error al cargar familias:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Error al consultar las familias."
            );

        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        void cargarFamilias();
    }, [cargarFamilias]);

    // =========================================
    // RESUMEN DE INVITADOS
    // =========================================

    const resumen = useMemo(() => ({
        totalFamilias: familias.length,

        totalAdultos: familias.reduce(
            (total, familia) => total + familia.adultos,
            0
        ),

        totalNinos: familias.reduce(
            (total, familia) => total + familia.ninos,
            0
        ),

        totalInvitados: familias.reduce(
            (total, familia) =>
                total + familia.adultos + familia.ninos,
            0
        )
    }), [familias]);

    // =========================================
    // ENLACE INDIVIDUAL
    // =========================================

    const obtenerLinkInvitacion = (familia: FamiliaInvitada) => {
        return `${window.location.origin}/invitacion?familia=${encodeURIComponent(familia.id)}`;
    };

    // =========================================
    // MENSAJE PERSONALIZADO
    // =========================================

    const obtenerMensaje = (familia: FamiliaInvitada) => {
        const link = obtenerLinkInvitacion(familia);

        return `${familia.mensajeFamilia}

Nos encantará contar con su presencia.

🎉 Celebración de los XVIII años de Mary
📅 18 de diciembre de 2026
🕒 3:00 PM

🎟️ Su invitación familiar:
${link}

Por favor, confirmen su asistencia.

¡Los esperamos con mucho cariño!`;
    };

    // =========================================
    // ENVIAR WHATSAPP
    // =========================================

    const enviarWhatsApp = (familia: FamiliaInvitada) => {
        if (!familia.telefono) {
            alert("Esta familia no tiene un teléfono registrado.");
            return;
        }

        const telefono = familia.telefono.replace(/\D/g, "");

        const telefonoCompleto = telefono.startsWith("52")
            ? telefono
            : `52${telefono}`;

        const mensaje = encodeURIComponent(obtenerMensaje(familia));

        const url = `https://wa.me/${telefonoCompleto}?text=${mensaje}`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    // =========================================
    // COPIAR ENLACE
    // =========================================

    const copiarLink = async (familia: FamiliaInvitada) => {
        const link = obtenerLinkInvitacion(familia);

        try {
            await navigator.clipboard.writeText(link);

            setMensajeCopiado(familia.id);

            window.setTimeout(() => {
                setMensajeCopiado("");
            }, 2500);

        } catch {
            alert("No fue posible copiar el enlace. Intenta nuevamente.");
        }
    };

    // =========================================
    // FILTRAR FAMILIAS
    // =========================================

    const familiasFiltradas = useMemo(() => {
        return familias.filter((familia) => {

            const coincideBusqueda =
                (familia.familia || "")
                    .toLowerCase()
                    .includes(busqueda.toLowerCase()) ||
                (familia.telefono || "")
                    .includes(busqueda);

            const coincideEstado =
                filtroEstado === "todos" ||
                familia.estado === filtroEstado;

            return coincideBusqueda && coincideEstado;

        });
    }, [familias, busqueda, filtroEstado]);

    // =========================================
    // ESTADOS VISUALES
    // =========================================

    const obtenerEstado = (estado: EstadoInvitacion) => {

        const estados = {
            pendiente: {
                texto: "Pendiente",
                clase: "estado-pendiente",
                icono: <Clock size={14} />
            },

            enviada: {
                texto: "Enviada",
                clase: "estado-enviada",
                icono: <Send size={14} />
            },

            confirmada: {
                texto: "Confirmada",
                clase: "estado-confirmada",
                icono: <CheckCircle2 size={14} />
            },

            cancelada: {
                texto: "Cancelada",
                clase: "estado-cancelada",
                icono: <Clock size={14} />
            }
        };

        return estados[estado];
    };

    // =========================================
    // INTERFAZ
    // =========================================

    return (
        <section className="admin-familias container-fluid py-4">

            {/* ENCABEZADO */}

            <div className="familias-header mb-4">

                <div className="familias-header-content">

                    <span className="familias-eyebrow">
                        <span className="familias-eyebrow-line"></span>
                        ADMINISTRACIÓN DE INVITADOS
                        <span className="familias-eyebrow-line"></span>
                    </span>

                    <h1>
                        Familias <span>invitadas</span>
                    </h1>

                    <p>
                        Administra y organiza las invitaciones de los
                        <strong> XVIII años de Mary</strong>.
                        <br />
                        Consulta invitados, comparte invitaciones y lleva
                        el control de las confirmaciones.
                    </p>

                </div>

                <button
                    className="btn-actualizar-familias"
                    onClick={() => void cargarFamilias()}
                    disabled={cargando}
                >
                    <RefreshCw
                        size={17}
                        className={cargando ? "spin" : ""}
                    />

                    <span>
                        {cargando ? "Actualizando..." : "Actualizar"}
                    </span>
                </button>

            </div>

            {/* CARGANDO */}

            {cargando && (
                <div className="text-center py-5">

                    <div
                        className="spinner-border"
                        style={{ color: "#D4AF37" }}
                        role="status"
                    />

                    <p className="mt-3">
                        Consultando familias desde Google Drive...
                    </p>

                </div>
            )}

            {/* ERROR */}

            {error && (
                <div className="alert alert-danger">

                    {error}

                    <button
                        className="btn btn-outline-danger ms-3"
                        onClick={() => void cargarFamilias()}
                    >
                        Reintentar
                    </button>

                </div>
            )}

            {!cargando && !error && (
                <>

                    {/* =====================================
                        ESTADÍSTICAS DE INVITADOS
                    ===================================== */}

                    <div className="familias-stats mb-4">

                        {/* FAMILIAS */}

                        <div className="familia-stat-card">

                            <div className="stat-icon stat-icon-rosa">
                                <Users size={23} />
                            </div>

                            <div className="stat-content">
                                <span>Familias</span>
                                <h3>{resumen.totalFamilias}</h3>
                                <small>Grupos invitados</small>
                            </div>

                        </div>

                        {/* ADULTOS */}

                        <div className="familia-stat-card">

                            <div className="stat-icon stat-icon-dorado">
                                <UserRound size={23} />
                            </div>

                            <div className="stat-content">
                                <span>Adultos</span>
                                <h3>{resumen.totalAdultos}</h3>
                                <small>Invitados adultos</small>
                            </div>

                        </div>

                        {/* NIÑOS */}

                        <div className="familia-stat-card">

                            <div className="stat-icon stat-icon-rosa">
                                <Baby size={23} />
                            </div>

                            <div className="stat-content">
                                <span>Niños</span>
                                <h3>{resumen.totalNinos}</h3>
                                <small>Pequeños invitados</small>
                            </div>

                        </div>

                        {/* TOTAL */}

                        <div className="familia-stat-card stat-total">

                            <div className="stat-icon stat-icon-total">
                                <Users size={23} />
                            </div>

                            <div className="stat-content">
                                <span>Total invitados</span>
                                <h3>{resumen.totalInvitados}</h3>
                                <small>Personas en total</small>
                            </div>

                        </div>

                    </div>

                    {/* =====================================
                        TABLA DE FAMILIAS
                    ===================================== */}

                    <div className="familias-card">

                        {/* ENCABEZADO Y FILTROS */}

                        <div className="familias-toolbar">

                            <div>
                                <h4>Listado de familias</h4>

                                <p>
                                    Consulta y comparte las invitaciones.
                                </p>
                            </div>

                            <div className="familias-filtros">

                                {/* BUSCADOR */}

                                <div className="familia-search">

                                    <Search size={18} />

                                    <input
                                        type="text"
                                        placeholder="Buscar familia o teléfono..."
                                        value={busqueda}
                                        onChange={(e) =>
                                            setBusqueda(e.target.value)
                                        }
                                    />

                                </div>

                                {/* FILTRO DE ESTADO */}

                                <select
                                    value={filtroEstado}
                                    onChange={(e) =>
                                        setFiltroEstado(e.target.value)
                                    }
                                    aria-label="Filtrar por estado"
                                >
                                    <option value="todos">
                                        Todos los estados
                                    </option>

                                    <option value="pendiente">
                                        Pendientes
                                    </option>

                                    <option value="enviada">
                                        Enviadas
                                    </option>

                                    <option value="confirmada">
                                        Confirmadas
                                    </option>

                                    <option value="cancelada">
                                        Canceladas
                                    </option>

                                </select>

                            </div>

                        </div>

                        {/* CONTENEDOR RESPONSIVO */}

                        <div className="table-responsive">

                            <table className="table familias-table align-middle">

                                <thead>
                                    <tr>
                                        <th>Familia</th>
                                        <th>Adultos</th>
                                        <th>Niños</th>
                                        <th>Teléfono</th>
                                        <th>Estado</th>
                                        <th>Mensaje</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {familiasFiltradas.map((familia) => {

                                        const estado = obtenerEstado(
                                            familia.estado
                                        );

                                        return (

                                            <tr key={familia.id}>

                                                {/* FAMILIA */}

                                                <td>
                                                    <strong>
                                                        {familia.familia}
                                                    </strong>

                                                    <small>
                                                        {familia.id}
                                                    </small>
                                                </td>

                                                {/* ADULTOS */}

                                                <td>
                                                    {familia.adultos}
                                                </td>

                                                {/* NIÑOS */}

                                                <td>
                                                    {familia.ninos}
                                                </td>

                                                {/* TELÉFONO */}

                                                <td>
                                                    {familia.telefono || "Sin teléfono"}
                                                </td>

                                                {/* ESTADO */}

                                                <td>

                                                    <span
                                                        className={`estado-badge ${estado.clase}`}
                                                    >
                                                        {estado.icono}
                                                        {estado.texto}
                                                    </span>

                                                </td>

                                                {/* MENSAJE */}

                                                <td>

                                                    <button
                                                        className="btn-message"
                                                        onClick={() =>
                                                            setFamiliaSeleccionada(familia)
                                                        }
                                                        title="Ver mensaje personalizado"
                                                    >
                                                        <Eye size={16} />
                                                        Ver mensaje
                                                    </button>

                                                </td>

                                                {/* ACCIONES */}

                                                <td>

                                                    <div className="familia-actions">

                                                        {/* WHATSAPP */}

                                                        <button
                                                            className="btn-whatsapp"
                                                            onClick={() =>
                                                                enviarWhatsApp(familia)
                                                            }
                                                            disabled={!familia.telefono}
                                                            title="Enviar por WhatsApp"
                                                        >
                                                            <MessageCircle size={17} />

                                                            <span>
                                                                WhatsApp
                                                            </span>
                                                        </button>

                                                        {/* COPIAR LINK */}

                                                        <button
                                                            className="btn-copy"
                                                            onClick={() =>
                                                                void copiarLink(familia)
                                                            }
                                                            title="Copiar enlace individual"
                                                        >
                                                            <Copy size={16} />

                                                            <span>
                                                                {mensajeCopiado === familia.id
                                                                    ? "Copiado"
                                                                    : "Copiar link"}
                                                            </span>
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        );

                                    })}

                                    {/* SIN RESULTADOS */}

                                    {familiasFiltradas.length === 0 && (

                                        <tr>

                                            <td
                                                colSpan={7}
                                                className="text-center py-5"
                                            >
                                                No se encontraron familias.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* PIE DE TABLA */}

                        <div className="familias-footer">

                            Mostrando {familiasFiltradas.length} de{" "}
                            {familias.length} familias

                        </div>

                    </div>

                    {/* =====================================
                        MODAL DE MENSAJE PERSONALIZADO
                    ===================================== */}

                    {familiaSeleccionada && (

                        <div
                            className="mensaje-overlay"
                            onClick={() =>
                                setFamiliaSeleccionada(null)
                            }
                        >

                            <div
                                className="mensaje-modal"
                                onClick={(e) => e.stopPropagation()}
                            >

                                {/* ENCABEZADO DEL MODAL */}

                                <div className="mensaje-modal-header">

                                    <div>

                                        <span>
                                            INVITACIÓN PERSONALIZADA
                                        </span>

                                        <h4>
                                            {familiaSeleccionada.familia}
                                        </h4>

                                    </div>

                                    <button
                                        onClick={() =>
                                            setFamiliaSeleccionada(null)
                                        }
                                        aria-label="Cerrar"
                                    >
                                        <X size={20} />
                                    </button>

                                </div>

                                {/* VISTA PREVIA */}

                                <div className="mensaje-preview">

                                    {obtenerMensaje(familiaSeleccionada)}

                                </div>

                                {/* ACCIONES DEL MODAL */}

                                <div className="mensaje-modal-actions">

                                    <button
                                        className="btn-copy"
                                        onClick={() =>
                                            void copiarLink(familiaSeleccionada)
                                        }
                                    >
                                        <Copy size={16} />
                                        Copiar link
                                    </button>

                                    <button
                                        className="btn-whatsapp"
                                        onClick={() =>
                                            enviarWhatsApp(familiaSeleccionada)
                                        }
                                        disabled={!familiaSeleccionada.telefono}
                                    >
                                        <MessageCircle size={17} />
                                        Enviar WhatsApp
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

                </>
            )}

        </section>
    );

};

export default TablaFamilias;
