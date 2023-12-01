import {
  Button,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import FileInput from "../../../components/FileInput";
import { createUser, getToken } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { CgCheckO, CgDanger } from "react-icons/cg";

export default function TambahUser() {
  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem("token");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [fotoProfile, setFotoProfile] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const roles = [
    { name: "mahasiswa", label: "Mahasiswa" },
    { name: "kandidat", label: "Kandidat" },
    { name: "admin", label: "Admin" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("foto_profile", fotoProfile);

    await createUser(token, formData)
      .then((response) => {
        console.log(response);
        setMessage(response);
        setStatus("success");
        onOpen();
      })
      .catch((err) => {
        console.error(err.response.data.msg.errors[0]);
        setMessage(err.response.data.msg.errors[0].message);
        setStatus("error");
        onOpen();
      });
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center text-gray-700">
        <div className="w-[90%] md:w-3/5 bg-white shadow-lg px-6 py-5 rounded">
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
                        <Link to={"/admin/users"}>
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
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-5"
          >
            <p className="font-bold text-xl">Tambah Users</p>
            <Input
              type="text"
              variant={"underlined"}
              label="Nama"
              className="w-full"
              onChange={(e) => {
                setNama(e.target.value);
              }}
            />
            <Input
              type="email"
              variant={"underlined"}
              label="Email"
              className="w-full"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
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
                    <PiEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <PiEyeClosed className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={isVisible ? "text" : "password"}
              className="w-full"
            />
            <Select
              variant={"underlined"}
              label="Select a role"
              className="w-full"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              {roles.map((role) => (
                <SelectItem key={role.name} value={role.name}>
                  {role.label}
                </SelectItem>
              ))}
            </Select>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="" className="indent-1 text-sm">
                Foto Profile
              </label>
              <FileInput handleFile={setFotoProfile} />
            </div>
            <div className="w-full flex justify-end">
              <Button color="primary" type="submit">
                Tambah User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
