import {
  RadioGroup,
  Radio,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createVote, getSuksesiById, refreshToken } from "../../../api/api";
import { CgCheckO, CgDanger } from "react-icons/cg";
export default function Vote() {
  let { id } = useParams();
  let token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [suksesi, setSuksesi] = useState({});
  const [userAuth, setUserAuth] = useState({});
  const [pilihan, setPilihan] = useState("");
  const [validate, setValidate] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await getSuksesiById(token, id);
      const user = await refreshToken();
      setSuksesi(response);
      setUserAuth(user);
    } catch (error) {
      console.log(error);
    }
  };

  const submitData = async () => {
    try {
      let data = {
        pilihan: pilihan,
        user: userAuth.id,
        suksesi: suksesi.id,
      };
      const response = await createVote(token, data);
      setValidate("success");
      setMessage(response);
      onOpen();
    } catch (error) {
      setValidate("error");
      console.log(error.response && error.response.data);
      setMessage(error.response && error.response.data.msg);
      onOpen();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center text-gray-700 px-10 py-6">
        <Modal size={"md"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 capitalize">
                  {validate == "error" ? "error" : "success"}
                </ModalHeader>
                <ModalBody className="flex flex-col items-center">
                  {validate == "error" ? (
                    <>
                      <CgDanger className="text-[70px] text-red-600" />
                      <p className="text-center capitalize">{message}</p>
                    </>
                  ) : (
                    <>
                      <CgCheckO className="text-[70px] text-green-600" />
                      <p className="text-center capitalize">
                        selamat, proses voting berhasil !
                      </p>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  {validate == "error" ? (
                    <>
                      <Button color="danger" onPress={onClose}>
                        OK
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to={"/suksesi"}>
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
        <p className="text-xl font-bold uppercase">pemilihan suara</p>
        <div className="w-full md:w-[90%] px-7 py-5 flex flex-col items-center gap-5">
          <RadioGroup
            label="Select your choice candidate"
            isRequired
            onChange={(e) => {
              setPilihan(e.target.value);
            }}
          >
            {suksesi.kandidats &&
              suksesi.kandidats.map((value, idx) => (
                <>
                  <Radio
                    value={`${value.id}`}
                    description={`${value.wakil && value.wakil.nama}`}
                    className="capitalize"
                  >
                    {value.ketua && value.ketua.nama}
                  </Radio>
                </>
              ))}
          </RadioGroup>
          <Button
            color="success"
            className="text-white font-semibold"
            onClick={() => {
              submitData();
            }}
          >
            vote
          </Button>
        </div>
      </div>
    </>
  );
}
