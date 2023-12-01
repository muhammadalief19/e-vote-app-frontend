import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import { admin } from "../routes.js";
import { kandidat } from "../routes.jsx";
import { useEffect, useState } from "react";
import { getToken } from "../api/api.js";
import Verify from "../pages/admin/Verify.jsx";
import SidebarMahasiswa from "../components/SidebarMahasiswa.jsx";
import NavbarMahasiswa from "../components/NavbarMahasiswa.jsx";
import DetailSukesi from "../pages/mahasiswa/voting/DetailSuksesi.jsx";
import Vote from "../pages/mahasiswa/voting/Vote.jsx";
import ResultSuksesi from "../pages/mahasiswa/results/ResultSuksesi.jsx";
import SidebarKandidat from "../components/SidebarKandidat.jsx";
import EditVisiMisi from "../pages/kandidat/EditVisiMisi.jsx";

export default function KandidatLayout() {
  const [hideSidebar, setHideSidebar] = useState(true);
  const token = localStorage.getItem("token");
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
      navigate("/kandidat/verify");
    }

    if (user && user.role === "admin") {
      navigate("/admin/dashboard");
    }

    if (user && user.role === "mahasiswa") {
      navigate("/dashboard");
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
        <SidebarKandidat hideSideBar={hideSidebar} />
        <div className="flex-1 max overflow-y-auto overflow-x-hidden z-10 relative">
          <NavbarMahasiswa
            hideSideBar={() => {
              setHideSidebar(!hideSidebar);
              console.log(hideSidebar);
            }}
            user={user}
          />
          <div className="">
            <Routes>
              {kandidat.map((value, idx) => {
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
              <Route path="/visi-misi/:id" element={<EditVisiMisi />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
