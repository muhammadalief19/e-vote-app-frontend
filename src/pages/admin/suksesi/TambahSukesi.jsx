import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { createSukesi } from "../../../api/api";
import { CgCheckO, CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function TambahSuksesi() {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [poster, setPoster] = useState("");
  const [sts, setSts] = useState("");
  const [validate, setValidate] = useState("");
  const [status, setStatus] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("poster", poster);
    formData.append("tgl_pelaksanaan", tanggal);
    formData.append("status", sts);

    try {
      const response = await createSukesi(token, formData);
      setValidate(response);
      setStatus("success");
      onOpen();
    } catch (error) {
      error.response.data.msg.file
        ? setValidate(error.response.data.msg.file)
        : setValidate(error.response.data.msg);
      setStatus("error");
      onOpen();
    }
  };
  return (
    <>
      <div className="w-full h-max justify-center items-center px-10 py-8 flex flex-col gap-7 text-gray-700">
        <div className="w-[90%] md:w-3/5 bg-white shadow-lg px-6 py-6 rounded">
          <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="flex flex-col items-center">
                    {status == "error" ? (
                      <>
                        <CgDanger className="text-[70px] text-red-600" />
                        <p className="text-center capitalize">{validate}</p>
                      </>
                    ) : (
                      <>
                        <CgCheckO className="text-[70px] text-green-600" />
                        <p className="text-center capitalize">{validate}</p>
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
                        <Link to={"/admin/suksesi"}>
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
            <p className="font-bold text-xl">Tambah Suksesi</p>
            <Input
              isRequired
              type="text"
              variant={"underlined"}
              label="Nama Acara"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              isRequired
              type="date"
              variant={"underlined"}
              onChange={(e) => {
                setTanggal(e.target.value);
              }}
            />
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img
                        className="has-mask h-36 object-center"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <p
                        href=""
                        id=""
                        className="text-blue-600 hover:underline inline-block"
                      >
                        select a file
                      </p>{" "}
                      from your computer
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setPoster(e.target.files[0]);
                    }}
                  />
                </label>
              </div>
            </div>

            <Select
              variant={"underlined"}
              label="Select a status"
              className="w-full"
              onChange={(e) => {
                setSts(e.target.value);
              }}
            >
              <SelectItem key={"dibuka"} value={"dibuka"}>
                Dibuka
              </SelectItem>
              <SelectItem key={"ditutup"} value={"ditutup"}>
                Ditutup
              </SelectItem>
            </Select>
            <div className="w-full flex justify-end">
              <Button color="primary" variant="shadow" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
