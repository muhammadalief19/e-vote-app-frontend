import { useEffect, useState } from "react";
import { getCandidateById, refreshToken, updateVisiMisi } from "../../api/api";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { CgCheckO, CgDanger } from "react-icons/cg";

export default function EditVisiMisi() {
  let token = localStorage.getItem("token");
  let { id } = useParams();
  const [userAuth, setUserAuth] = useState({});
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    visi: "",
    misi: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUserAuth = async () => {
    try {
      const response = await refreshToken();
      setUserAuth(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getCandidateById(token, id);
      setData(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleUpdateVisiMisi = async () => {
    const formData = {
      visi: data.visi,
      misi: data.misi,
    };
    try {
      const response = await updateVisiMisi(token, formData, id);
      setStatus("success");
      setMessage(response);
      onOpen();
    } catch (error) {
      setStatus("error");
      setMessage(error.response.data.msg);
      onOpen();
    }
  };

  const handleEditDataChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    getUserAuth();
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center text-gray-700 px-10 py-6 gap-7">
        <p className="text-xl font-bold uppercase">Update visi misi</p>{" "}
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
                      <Link to={"/kandidat/visi-misi"}>
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
        <div className="w-full lg:w-3/5 px-8 py-5 bg-white shadow-lg rounded flex flex-col gap-5">
          <Textarea
            variant={"underlined"}
            label="Visi"
            labelPlacement="outside"
            placeholder="Masukkan visi"
            className="w-full"
            value={data.visi}
            onChange={(e) => {
              handleEditDataChange("visi", e.target.value);
            }}
          />
          <Textarea
            variant={"underlined"}
            label="Misi"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="w-full"
            value={data.misi}
            onChange={(e) => {
              handleEditDataChange("misi", e.target.value);
            }}
          />
          <div className="w-full flex justify-end">
            <Button
              color="primary"
              variant="shadow"
              onClick={() => {
                handleUpdateVisiMisi();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
