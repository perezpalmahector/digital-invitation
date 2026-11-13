
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import AdminPage from "./pages/admin/AdminPage";
import InvitacionPage from "./pages/invitacion/InvitacionPage";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/admin" replace />}
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />

        <Route
          path="/invitacion"
          element={<InvitacionPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
