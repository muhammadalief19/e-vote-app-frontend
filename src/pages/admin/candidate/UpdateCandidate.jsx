import { useEffect, useState } from "react";
import {
  createCandidate,
  getCandidate,
  getCandidateById,
  getSuksesi,
  getToken,
  updateCandidate,
} from "../../../api/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CgCheckO, CgDanger } from "react-icons/cg";

export default function UpdateCandidate() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const token = localStorage.getItem("token");
  let { uuid } = useParams();
  let [candidate, setCandidate] = useState({
    id: null,
    uuid: "",
    userId: null,
    userId_2: null,
    visi: "",
    misi: "",
    sukesiId: null,
  });
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditDataChange = (field, value) => {
    setCandidate((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await getCandidate(token);
      const response2 = await getSuksesi(token);
      const response3 = await getCandidateById(token, uuid);
      setData(response);
      setData2(response2);
      setCandidate(response3);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    let formData = {
      ketua: candidate.userId,
      wakil: candidate.userId_2,
      visi: candidate.visi,
      misi: candidate.misi,
      suksesi: candidate.sukesiId,
    };
    try {
      const response = await updateCandidate(token, formData, uuid);
      console.log(response);
      setMessage(response);
      setStatus("success");
      onOpen();
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
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
                  <ModalBody className="flex flex-col items-center">
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
                      <>
                        <Button color="danger" onPress={onClose}>
                          OK
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to={"/admin/candidate"}>
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
          <form className="w-full flex flex-col items-center gap-5">
            <p className="font-bold text-xl">Tambah Candidate</p>
            <Select
              isRequired
              variant={"underlined"}
              label="Ketua"
              className="w-full"
              color="primary"
              defaultValue={candidate.userId}
              onChange={(e) => {
                handleEditDataChange("userId", e.target.value);
              }}
            >
              {data.map((value) => (
                <SelectItem
                  key={value.id}
                  value={value.id}
                  className="capitalize"
                >
                  {value.nama}
                </SelectItem>
              ))}
            </Select>
            <Select
              isRequired
              variant={"underlined"}
              label="Wakil"
              className="w-full"
              color="primary"
              onChange={(e) => {
                handleEditDataChange("userId_2", e.target.value);
              }}
            >
              {data.map((value) => (
                <SelectItem
                  key={value.id}
                  value={value.id}
                  className="capitalize"
                >
                  {value.nama}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              isRequired
              variant={"underlined"}
              color="primary"
              label="Visi"
              labelPlacement="outside"
              placeholder="Enter Visi"
              className="col-span-12 md:col-span-6 mb-6 md:mb-0"
              value={candidate.visi}
              onChange={(e) => {
                handleEditDataChange("visi", e.target.value);
              }}
            />
            <Textarea
              isRequired
              variant={"underlined"}
              color="primary"
              label="Misi"
              labelPlacement="outside"
              placeholder="Enter Misi"
              className="col-span-12 md:col-span-6 mb-6 md:mb-0"
              value={candidate.misi}
              onChange={(e) => {
                handleEditDataChange("misi", e.target.value);
              }}
            />
            <Select
              isRequired
              variant={"underlined"}
              label="Acara Suksesi"
              className="w-full"
              color="primary"
              defaultValue={candidate.sukesiId}
              onChange={(e) => {
                handleEditDataChange("sukesiId", e.target.value);
              }}
            >
              {data2.map((value) => (
                <SelectItem key={value.id} value={value.id}>
                  {value.name}
                </SelectItem>
              ))}
            </Select>
            <div className="w-full flex justify-end">
              <Button color="primary" variant="shadow" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
