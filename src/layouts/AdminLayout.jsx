import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SidebarAdmin from "../components/SidebarAdmin";
// import { admin } from "../routes.js";
import { admin } from "../routes.jsx";
import { useEffect, useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin.jsx";
import { getToken } from "../api/api.js";
import AlertSuccess from "../components/AlertSuccess.jsx";
import { jwtDecode } from "jwt-decode";
import Verify from "../pages/admin/Verify.jsx";
import TambahUser from "../pages/admin/mahasiswa/TambahUser.jsx";
import UpdateUser from "../pages/admin/mahasiswa/UpdateUser.jsx";
import TambahCandidate from "../pages/admin/candidate/TambahCandidate.jsx";
import UpdateCandidate from "../pages/admin/candidate/UpdateCandidate.jsx";
import TambahSuksesi from "../pages/admin/suksesi/TambahSukesi.jsx";
import UpdateSuksesi from "../pages/admin/suksesi/UpdateSuksesi.jsx";
import ResultSuksesiAdmin from "../pages/admin/results/ResultSuksesiAdmin.jsx";

export default function AdminLayout() {
  const [hideSidebar, setHideSidebar] = useState(true);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await getToken();
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (user && user.email_verified_at === null) {
      navigate("/admin/verify");
    }

    if (user && user.role === "mahasiswa") {
      navigate("/dashboard");
    }

    if (user && user.role === "kandidat") {
      navigate("/kandidat/dashboard");
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setHideSidebar(true) : setHideSidebar(false)
    );
  }, []);
  return (
    <>
      <div className="w-full h-screen flex overflow-hidden relative bg-gray-100">
        <SidebarAdmin hideSideBar={hideSidebar} />
        <div className="flex-1 max overflow-y-auto overflow-x-hidden z-10 relative">
          <NavbarAdmin
            hideSideBar={() => {
              setHideSidebar(!hideSidebar);
              console.log(hideSidebar);
            }}
            user={user}
          />
          <div className="">
            <Routes>
              {admin.map((value, idx) => {
                return (
                  <Route
                    key={idx}
                    path={`/${value.path}`}
                    element={value.component}
                  />
                );
              })}
              <Route path="/" element={<Navigate to={"dashboard"} />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/users/create" element={<TambahUser />} />
              <Route path="/users/update/:uuid" element={<UpdateUser />} />
              <Route path="/candidate/create" element={<TambahCandidate />} />
              <Route
                path="/candidate/update/:uuid"
                element={<UpdateCandidate />}
              />
              <Route path="/suksesi/create" element={<TambahSuksesi />} />
              <Route path="/suksesi/update/:id" element={<UpdateSuksesi />} />
              <Route path="/result/:id" element={<ResultSuksesiAdmin />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
