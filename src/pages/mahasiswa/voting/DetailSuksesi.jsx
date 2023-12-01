import { Link, useParams } from "react-router-dom";
import {
  getCandidateById,
  getSuksesiById,
  refreshToken,
  validateVoted,
} from "../../../api/api";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function DetailSukesi() {
  let { id } = useParams();
  let token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [userAuth, setUserAuth] = useState({});
  const [detailKandidat, setDetailKandidat] = useState({});
  const [validate, setValidate] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    try {
      const response = await getSuksesiById(token, id);
      const user = await refreshToken();
      setData(response);
      setUserAuth(user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const showModalKandidat = async (id) => {
    try {
      const response = await getCandidateById(token, id);
      setDetailKandidat(response);
    } catch (error) {
      console.log(error);
    }
  };

  const validateVote = async () => {
    try {
      const response = await validateVoted(token, userAuth.id, data.id);
      setValidate(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if ((userAuth && userAuth.id) || (data && data.id)) {
      validateVote();
    }
  });
  return (
    <>
      <div className="w-full flex flex-col items-center text-gray-700 px-10 py-6">
        <div className="w-[90%] flex flex-col gap-5">
          <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Kandidat
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Ketua :{" "}
                      {detailKandidat.ketua && detailKandidat.ketua.nama}
                    </p>
                    <p>
                      Wakil :{" "}
                      {detailKandidat.wakil && detailKandidat.wakil.nama}
                    </p>
                    <p>Visi : {detailKandidat.visi}</p>
                    <p>Misi : {detailKandidat.misi}</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <p className="text-xl font-bold uppercase">suksesi</p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 justify-center grid-flow-row gap-5">
            <Card shadow="sm" isPressable>
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={data.name}
                  className="w-full object-cover aspect-3/4"
                  src={`${import.meta.env.VITE_APP_STATICURL}/poster-suksesi/${
                    data.poster
                  }`}
                />
              </CardBody>
            </Card>
            <div className="col-span-2 flex flex-col h-auto justify-center gap-3">
              <p className="text-xl font-bold uppercase">detail suksesi</p>
              <p className="text-sm font-medium">Acara : {data.name}</p>
              <p className="text-sm font-medium">
                Tanggal Pelaksanaan : {data.tgl_pelaksanaan}
              </p>
              <div className="text-sm font-medium">
                Status :{" "}
                {data.status == "dibuka" ? (
                  <span className="font-normal px-5 py-1 bg-green-700 rounded-full text-white">
                    {" "}
                    dibuka{" "}
                  </span>
                ) : (
                  <span className="font-normal px-5 py-1 bg-red-700 rounded-full text-white">
                    {" "}
                    ditutup{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="text-xl font-bold uppercase">Kandidat</p>
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 grid-flow-row justify-center gap-5">
            {data && data.kandidats ? (
              data.kandidats.map((value, idx) => {
                return (
                  <>
                    <Card isFooterBlurred className="w-full h-[300px]">
                      <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">
                          New
                        </p>
                        <h4 className="text-white font-medium text-2xl">
                          {`kandidat ${idx + 1}`}
                        </h4>
                      </CardHeader>
                      <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full object-cover"
                        src={`${
                          import.meta.env.VITE_APP_STATICURL
                        }/foto-profile/${value.ketua.foto_profile}`}
                      />
                      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                          <p className="text-black text-tiny">Ketua :</p>
                          <p className="text-black text-tiny capitalize">
                            {value.ketua.nama}
                          </p>
                        </div>
                        <Button
                          className="text-tiny"
                          color="primary"
                          radius="full"
                          size="sm"
                          onPress={onOpen}
                          onClick={() => {
                            showModalKandidat(value.uuid);
                          }}
                        >
                          Get Detail
                        </Button>
                      </CardFooter>
                    </Card>
                  </>
                );
              })
            ) : (
              <>
                <p className="">not found</p>
              </>
            )}
          </div>
          <div className="w-full flex justify-center">
            {!validate ? (
              <>
                <Button
                  color="primary"
                  className="text-gray-100 font-semibold capitalize"
                >
                  Anda sudah ngevoting
                </Button>
              </>
            ) : data.status == "ditutup" ? (
              <Button
                color="danger"
                className="text-gray-100 font-semibold capitalize"
              >
                Pemilihan sudah ditutup
              </Button>
            ) : (
              <>
                <Link to={`/suksesi/voting/${id}`}>
                  <Button
                    color="success"
                    className="text-gray-100 font-semibold"
                  >
                    Vote
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
