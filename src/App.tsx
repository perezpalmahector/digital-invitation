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
