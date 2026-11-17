import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AdminPage from "./pages/admin/AdminPage";
import InvitacionPage from "./pages/invitacion/InvitacionPage";
import SitioPrivado from "./components/sitioprivado/SitioPrivado";
import RutaProtegidaAdmin from "./components/admin/RutaProtegidaAdmin";

function App() {
  useEffect(() => {
    const bloquearClickDerecho = (e: MouseEvent) => {
      e.preventDefault();
    };

    const bloquearArrastre = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
      }
    };

    const bloquearAtajos = (e: KeyboardEvent) => {
      // Bloquea Ctrl+S / Cmd+S (Guardar) y Ctrl+U / Cmd+U (Código fuente)
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "s" || e.key.toLowerCase() === "u")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", bloquearClickDerecho);
    document.addEventListener("dragstart", bloquearArrastre);
    document.addEventListener("keydown", bloquearAtajos);

    return () => {
      document.removeEventListener("contextmenu", bloquearClickDerecho);
      document.removeEventListener("dragstart", bloquearArrastre);
      document.removeEventListener("keydown", bloquearAtajos);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SitioPrivado />}
        />

        <Route
          path="/admin"
          element={
            <RutaProtegidaAdmin>
              <AdminPage />
            </RutaProtegidaAdmin>
          }
        />

        <Route
          path="/invitacion"
          element={<InvitacionPage />}
        />

        <Route
          path="*"
          element={<SitioPrivado />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
