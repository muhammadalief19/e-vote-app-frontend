import { useEffect, useState } from "react";
import {
  createCandidate,
  getCandidate,
  getSuksesi,
  getToken,
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
import { Link, useNavigate } from "react-router-dom";
import { CgCheckO, CgDanger } from "react-icons/cg";

export default function TambahCandidate() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const token = localStorage.getItem("token");
  const [ketua, setKetua] = useState("");
  const [wakil, setWakil] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [suksesi, setSuksesi] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    try {
      const response = await getCandidate(token);
      const response2 = await getSuksesi(token);
      setData(response);
      setData2(response2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      let data = {
        ketua: ketua,
        wakil: wakil,
        visi: visi,
        misi: misi,
        suksesi: suksesi,
      };
      const response = await createCandidate(token, data);
      setStatus("success");
      setMessage(response);
      onOpen();
    } catch (error) {
      console.log(error);
      setStatus("error");
      setMessage(error.response.data.msg);
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
              onChange={(e) => {
                setKetua(e.target.value);
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
                setWakil(e.target.value);
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
              onChange={(e) => {
                setVisi(e.target.value);
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
              onChange={(e) => {
                setMisi(e.target.value);
              }}
            />
            <Select
              isRequired
              variant={"underlined"}
              label="Acara Suksesi"
              className="w-full"
              color="primary"
              onChange={(e) => {
                setSuksesi(e.target.value);
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
