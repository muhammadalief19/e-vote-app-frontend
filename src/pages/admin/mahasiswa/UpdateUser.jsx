import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getToken, getUsersById, updateUser } from "../../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CgCheckO, CgDanger } from "react-icons/cg";

export default function UpdateUser() {
  const token = localStorage.getItem("token");
  let { uuid } = useParams();
  const [data, setData] = useState({
    id: null,
    nama: "",
    email: "",
    role: "",
  });
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditDataChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const navigate = useNavigate();

  const roles = [
    { name: "mahasiswa", label: "Mahasiswa" },
    { name: "kandidat", label: "Kandidat" },
    { name: "admin", label: "Admin" },
  ];

  const fetchData = async () => {
    try {
      const response = await getUsersById(token, uuid);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", data.nama);
    formData.append("email", data.email);
    formData.append("role", data.role);
    formData.append("foto_profile", data.foto_profile);

    try {
      const response = await updateUser(token, formData, uuid);
      console.log(response);
      setStatus("success");
      setMessage(response);
      onOpen();
    } catch (error) {
      console.log(error);
      console.error(err.response.data.msg);
      setMessage(err.response.data.msg);
      setStatus("error");
      onOpen();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
            <p className="font-bold text-xl">Update Users</p>
            <Input
              type="text"
              variant={"underlined"}
              label="Nama"
              className="w-full"
              value={data ? data.nama : ""}
              onChange={(e) => {
                handleEditDataChange("nama", e.target.value);
              }}
            />
            <Input
              type="email"
              variant={"underlined"}
              label="Email"
              className="w-full"
              value={data ? data.email : ""}
              onChange={(e) => {
                handleEditDataChange("email", e.target.value);
              }}
            />
            <Select
              variant={"underlined"}
              label="Select a role"
              className="w-full"
              onChange={(e) => {
                handleEditDataChange("role", e.target.value);
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
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className={`block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:disabled:opacity-50 file:disabled:pointer-events-none
          file:bg-sky-600 file:text-white hover:file:bg-sky-700`}
                  onChange={(e) => {
                    handleEditDataChange("foto_profile", e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <div className="w-full flex justify-end">
              <Button color="primary" type="submit">
                Update User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
