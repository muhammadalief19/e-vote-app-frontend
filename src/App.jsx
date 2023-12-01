import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./layouts/AdminLayout";
import Verify from "./pages/admin/Verify";
import MahasiswaLayout from "./layouts/MahasiswaLayout";
import KandidatLayout from "./layouts/KandidatLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<AdminLayout />} path="/admin/*" />
          <Route element={<MahasiswaLayout />} path="/*" />
          <Route element={<KandidatLayout />} path="/kandidat/*" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
