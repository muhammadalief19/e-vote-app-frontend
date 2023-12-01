import illustrration2 from "/images/illustration-2.svg";
import pens from "/images/pens.png";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import FileInput from "../../components/FileInput";
import axios from "axios";
import { CgCheckO, CgDanger } from "react-icons/cg";
export default function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fotoProfile, setFotoProfile] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("foto_profile", fotoProfile);
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_APIURL}/auth/register`,
        formData
      );
      setStatus("seccess");
      setMessage("Registrasi Berhasil");
      onOpen();
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage(error.response.data.msg);
      onOpen();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);
  return (
    <>
      <div className="w-full h-[110vh] grid lg:grid-cols-3 grid-cols-1">
        <div className="w-full lg:col-span-2 flex justify-center items-center bg-sky-300 relative overflow-hidden lg:rounded-e-2xl py-10">
          <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="flex flex-col gap-2 items-center">
                    {status == "error" ? (
                      <>
                        <CgDanger className="text-[70px] text-red-600" />
                        <p className="text-center capitalize">{message}</p>
                      </>
                    ) : (
                      <>
                        <CgCheckO className="text-[70px] text-green-600" />
                        <p className="text-center capitalize">{message}</p>
                      </>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    {status == "error" ? (
                      <Button
                        color="danger"
                        onPress={() => {
                          onClose();
                        }}
                      >
                        OK
                      </Button>
                    ) : (
                      <>
                        <Link to={"/login"}>
                          <Button color="success" onPress={onClose}>
                            OK
                          </Button>
                        </Link>
                      </>
                    )}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <form
            onSubmit={registerHandler}
            className="lg:w-2/3 md:w-1/2 w-4/5 flex flex-col gap-7 shadow-xl px-12 py-10 rounded-md bg-white text-gray-500"
          >
            <img src={pens} alt="" className="w-12" />
            <p className="text-2xl lg:text-3xl font-bold capitalize">
              join us !
            </p>
            <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
              <Input
                type="text"
                variant={"underlined"}
                label="Nama"
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
              <Input
                type="email"
                variant={"underlined"}
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
              <Input
                label="Password"
                variant="underlined"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className=""
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
              <FileInput color={"sky"} handleFile={setFotoProfile} />
            </div>
            <p className="text-sm capitalize">
              sudah punya akun ?{" "}
              <Link to={"/login"} className="text-sky-400">
                login
              </Link>
            </p>
            <div className="w-full flex justify-center">
              <Button
                size="lg"
                color="primary"
                variant="shadow"
                className="w-full bg-sky-300 shadow-sky-200 uppercase"
                type="submit"
              >
                register
              </Button>
            </div>
          </form>
        </div>
        <div className="lg:w-full lg:h-full lg:flex justify-center items-center hidden">
          <img src={illustrration2} alt="" className="" />
        </div>
      </div>
    </>
  );
}
