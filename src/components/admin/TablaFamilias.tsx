import { invitacionConfig } from "../../config/invitacion.config";

import {
    useMemo,
    useState,
    useEffect,
    useCallback
} from "react";
import type { FormEvent } from "react";

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
    X,
    Plus,
    Pencil,
    Trash2
} from "lucide-react";

import {
    actualizarFamilia,
    crearFamilia,
    eliminarFamilia,
    obtenerFamilias
} from "../../services/familias.service";

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
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [familiaEnEdicion, setFamiliaEnEdicion] =
        useState<FamiliaInvitada | null>(null);
    const [guardando, setGuardando] = useState(false);
    const [eliminandoId, setEliminandoId] = useState("");
    const [errorOperacion, setErrorOperacion] = useState("");
    const [formulario, setFormulario] = useState<Omit<FamiliaInvitada, "id">>({
        familia: "",
        adultos: 1,
        ninos: 0,
        telefono: "",
        mensajeFamilia: "",
        estado: "pendiente"
    });

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

    const abrirFormularioNuevo = () => {
        setFamiliaEnEdicion(null);
        setFormulario({
            familia: "",
            adultos: 1,
            ninos: 0,
            telefono: "",
            mensajeFamilia: "",
            estado: "pendiente"
        });
        setErrorOperacion("");
        setFormularioAbierto(true);
    };

    const abrirFormularioEdicion = (familia: FamiliaInvitada) => {
        setFamiliaEnEdicion(familia);
        setFormulario({
            familia: familia.familia,
            adultos: familia.adultos,
            ninos: familia.ninos,
            telefono: familia.telefono,
            mensajeFamilia: familia.mensajeFamilia,
            estado: familia.estado
        });
        setErrorOperacion("");
        setFormularioAbierto(true);
    };

    const guardarFamilia = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setGuardando(true);
        setErrorOperacion("");

        try {
            if (familiaEnEdicion) {
                await actualizarFamilia(familiaEnEdicion.id, formulario);
            } else {
                await crearFamilia(formulario);
            }

            setFormularioAbierto(false);
            setFamiliaEnEdicion(null);
            await cargarFamilias();
        } catch (err) {
            console.error("Error al guardar la familia:", err);
            setErrorOperacion(
                err instanceof Error
                    ? err.message
                    : "No fue posible guardar la familia."
            );
        } finally {
            setGuardando(false);
        }
    };

    const borrarFamilia = async (familia: FamiliaInvitada) => {
        const confirmado = window.confirm(
            `¿Seguro que deseas eliminar a ${familia.familia}? Esta acción no se puede deshacer.`
        );

        if (!confirmado) {
            return;
        }

        setEliminandoId(familia.id);
        setErrorOperacion("");

        try {
            await eliminarFamilia(familia.id);
            await cargarFamilias();
        } catch (err) {
            console.error("Error al eliminar la familia:", err);
            setErrorOperacion(
                err instanceof Error
                    ? err.message
                    : "No fue posible eliminar la familia."
            );
        } finally {
            setEliminandoId("");
        }
    };

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

    // =========================================
    // MENSAJE PERSONALIZADO
    // =========================================

    // =========================================
    // MENSAJE PERSONALIZADO
    // =========================================

    // =========================================
    // MENSAJE PERSONALIZADO
    // =========================================

    const obtenerMensaje = (familia: FamiliaInvitada) => {
        const link = obtenerLinkInvitacion(familia);
        const { general, evento, ubicaciones } = invitacionConfig;

        const fechaTexto = new Date(`${evento.fecha}T12:00:00`).toLocaleDateString(
            "es-MX",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

        const horaTexto = ubicaciones?.ceremonia?.hora ?? `${evento.hora} hrs`;

        // Símbolos tipográficos universales (nunca se rompen ni muestran rombos)
        const estrella = "\u2728";         // Destellos
        const flor = "\u2764\uFE0F";       // Corazon rojo/rosa
        const rombo = "\u231A";            // Reloj
        const flecha = "\u2709\uFE0F";     // Sobre de invitacion
        const corazon = "\u2763\uFE0F";    // Corazon elegante


        const saludoBase =
            familia.mensajeFamilia?.trim() ||
            `Querida ${familia.familia}, nos encantará contar con su presencia en este día tan especial para ${general.nombre}. Será una alegría compartir esta celebración con ustedes.`;

        return `${saludoBase}

${estrella} *Celebración de los ${general.tipoEvento} de ${general.nombre}*
${flor} *Fecha:* ${fechaTexto}
${rombo} *Hora:* ${horaTexto}

${flecha} *Su invitación familiar:*
${link}

Por favor, confirmen su asistencia dentro de la invitación. ¡Los esperamos con mucho cariño! ${corazon}`;
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

                <div className="familias-header-actions">
                    <button
                        type="button"
                        className="btn-agregar-familia"
                        onClick={abrirFormularioNuevo}
                    >
                        <Plus size={17} />
                        Agregar familia
                    </button>

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
                    {errorOperacion && (
                        <div className="alert alert-danger" role="alert">
                            {errorOperacion}
                            <button
                                type="button"
                                className="btn-close float-end"
                                aria-label="Cerrar"
                                onClick={() => setErrorOperacion("")}
                            />
                        </div>
                    )}

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

                            <div className="familias-toolbar-actions">
                                <div className="familias-filtros">
                                    <div className="familia-search">
                                        <Search size={18} />
                                        <input
                                            type="text"
                                            placeholder="Buscar familia o teléfono..."
                                            value={busqueda}
                                            onChange={(e) => setBusqueda(e.target.value)}
                                        />
                                    </div>

                                    <select
                                        value={filtroEstado}
                                        onChange={(e) => setFiltroEstado(e.target.value)}
                                        aria-label="Filtrar por estado"
                                    >
                                        <option value="todos">Todos los estados</option>
                                        <option value="pendiente">Pendientes</option>
                                        <option value="enviada">Enviadas</option>
                                        <option value="confirmada">Confirmadas</option>
                                        <option value="cancelada">Canceladas</option>
                                    </select>
                                </div>
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

                                                        <button
                                                            type="button"
                                                            className="btn-editar-familia"
                                                            onClick={() => abrirFormularioEdicion(familia)}
                                                            disabled={guardando || eliminandoId !== ""}
                                                            title="Editar familia"
                                                            aria-label={`Editar ${familia.familia}`}
                                                        >
                                                            <Pencil size={16} />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="btn-eliminar-familia"
                                                            onClick={() => void borrarFamilia(familia)}
                                                            disabled={guardando || eliminandoId !== ""}
                                                            title="Eliminar familia"
                                                            aria-label={`Eliminar ${familia.familia}`}
                                                        >
                                                            {eliminandoId === familia.id
                                                                ? <RefreshCw size={16} className="spin" />
                                                                : <Trash2 size={16} />}
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

                    {formularioAbierto && (
                        <div
                            className="familia-form-overlay"
                            onClick={() => {
                                if (!guardando) {
                                    setFormularioAbierto(false);
                                }
                            }}
                        >
                            <div
                                className="familia-form-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="familia-form-title"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="mensaje-modal-header">
                                    <div>
                                        <span>ADMINISTRACIÓN DE INVITADOS</span>
                                        <h4 id="familia-form-title">
                                            {familiaEnEdicion ? "Editar familia" : "Agregar familia"}
                                        </h4>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFormularioAbierto(false)}
                                        aria-label="Cerrar"
                                        disabled={guardando}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={(event) => void guardarFamilia(event)}>
                                    <div className="familia-form-fields">
                                        {errorOperacion && (
                                            <div className="familia-form-error" role="alert">
                                                {errorOperacion}
                                            </div>
                                        )}
                                        <label>
                                            Nombre de la familia
                                            <input
                                                type="text"
                                                value={formulario.familia}
                                                onChange={(event) =>
                                                    setFormulario({ ...formulario, familia: event.target.value })
                                                }
                                                required
                                                maxLength={120}
                                                autoFocus
                                            />
                                        </label>

                                        <div className="familia-form-numeros">
                                            <label>
                                                Adultos
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={formulario.adultos}
                                                    onChange={(event) =>
                                                        setFormulario({ ...formulario, adultos: Number(event.target.value) })
                                                    }
                                                    required
                                                />
                                            </label>
                                            <label>
                                                Niños
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    value={formulario.ninos}
                                                    onChange={(event) =>
                                                        setFormulario({ ...formulario, ninos: Number(event.target.value) })
                                                    }
                                                    required
                                                />
                                            </label>
                                        </div>

                                        <label>
                                            Teléfono
                                            <input
                                                type="tel"
                                                value={formulario.telefono}
                                                onChange={(event) =>
                                                    setFormulario({ ...formulario, telefono: event.target.value })
                                                }
                                                maxLength={20}
                                            />
                                        </label>

                                        <label>
                                            Estado de invitación
                                            <select
                                                value={formulario.estado}
                                                onChange={(event) => {
                                                    const estado = event.target.value;
                                                    if (
                                                        estado === "pendiente" ||
                                                        estado === "enviada" ||
                                                        estado === "confirmada" ||
                                                        estado === "cancelada"
                                                    ) {
                                                        setFormulario({ ...formulario, estado });
                                                    }
                                                }}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="enviada">Enviada</option>
                                                <option value="confirmada">Confirmada</option>
                                                <option value="cancelada">Cancelada</option>
                                            </select>
                                        </label>

                                        <label>
                                            Mensaje personalizado
                                            <textarea
                                                value={formulario.mensajeFamilia}
                                                onChange={(event) =>
                                                    setFormulario({ ...formulario, mensajeFamilia: event.target.value })
                                                }
                                                rows={4}
                                                maxLength={1000}
                                            />
                                        </label>
                                    </div>

                                    <div className="familia-form-actions">
                                        <button
                                            type="button"
                                            className="btn-cancelar-familia"
                                            onClick={() => setFormularioAbierto(false)}
                                            disabled={guardando}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn-agregar-familia"
                                            disabled={guardando}
                                        >
                                            {guardando && <RefreshCw size={16} className="spin" />}
                                            {guardando
                                                ? "Guardando..."
                                                : familiaEnEdicion ? "Guardar cambios" : "Agregar familia"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

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
