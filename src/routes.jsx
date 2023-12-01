import { AiOutlineHome, AiOutlineUserSwitch } from "react-icons/ai";
import {
  PiCalendarBlankDuotone,
  PiCalendarCheckDuotone,
  PiStudentBold,
  PiUserSquareFill,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { RiWaterPercentFill } from "react-icons/ri";
import { MdHowToVote } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import Dashboard from "./pages/admin/Dashboard.jsx";
import DashboardMhs from "./pages/mahasiswa/Dashboard.jsx";
import DashboardKandidat from "./pages/kandidat/Dashboard.jsx";
import Mahasiwa from "./pages/admin/mahasiswa/index.jsx";
import Candidate from "./pages/admin/candidate/index.jsx";
import Profile from "./pages/mahasiswa/Profile.jsx";
import Suksesi from "./pages/admin/suksesi/index.jsx";
import SuksesiMahasiswa from "./pages/mahasiswa/voting/Suksesi.jsx";
import Results from "./pages/mahasiswa/results/index.jsx";
import VisiMisi from "./pages/kandidat/VisiMisi.jsx";
import ResultsAdmin from "./pages/admin/results/index.jsx";

export const admin = [
  {
    name: "dashboard",
    path: "dashboard",
    layout: "admin",
    icon: <AiOutlineHome className="text-lg" />,
    component: <Dashboard />,
  },
  {
    name: "users",
    path: "users",
    layout: "admin",
    icon: <PiStudentBold className="text-lg" />,
    component: <Mahasiwa />,
  },
  {
    name: "candidate",
    path: "candidate",
    layout: "admin",
    icon: <PiUsersThreeDuotone className="text-lg" />,
    component: <Candidate />,
  },
  {
    name: "suksesi",
    path: "suksesi",
    layout: "admin",
    icon: <PiCalendarCheckDuotone className="text-lg" />,
    component: <Suksesi />,
  },
  {
    name: "result",
    path: "result",
    layout: "",
    icon: <RiWaterPercentFill className="text-lg" />,
    component: <ResultsAdmin />,
  },
];

export const mahasiswa = [
  {
    name: "dashboard",
    path: "dashboard",
    layout: "",
    icon: <AiOutlineHome className="text-lg" />,
    component: <DashboardMhs />,
  },
  {
    name: "suksesi",
    path: "suksesi",
    layout: "",
    icon: <MdHowToVote className="text-lg" />,
    component: <SuksesiMahasiswa />,
  },
  {
    name: "profile",
    path: "profile",
    layout: "",
    icon: <AiOutlineUserSwitch className="text-lg" />,
    component: <Profile />,
  },
  {
    name: "result",
    path: "result",
    layout: "",
    icon: <RiWaterPercentFill className="text-lg" />,
    component: <Results />,
  },
];

export const kandidat = [
  {
    name: "dashboard",
    path: "dashboard",
    layout: "kandidat",
    icon: <AiOutlineHome className="text-lg" />,
    component: <DashboardKandidat />,
  },
  {
    name: "visi-misi",
    path: "visi-misi",
    layout: "kandidat",
    icon: <FaNoteSticky className="text-lg" />,
    component: <VisiMisi />,
  },
];
