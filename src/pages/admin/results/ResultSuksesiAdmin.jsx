import { useParams } from "react-router-dom";
import { getSuksesiById, resultVote } from "../../../api/api";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
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

export default function ResultSuksesiAdmin() {
  let token = localStorage.getItem("token");
  let { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataResult, setDataResult] = useState({});
  const [dataCandidate, setDataCandidate] = useState({});
  const [percentages, setPercentages] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getSuksesiById(token, id);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModalResult = async (datas) => {
    try {
      const response = await resultVote(token, data.id, datas.id);
      setDataCandidate(datas);
      setDataResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPercentages = async () => {
    if (data.kandidats && data.kandidats.length > 0) {
      const updatedPercentages = await Promise.all(
        data.kandidats.map(async (value) => {
          try {
            const response = await resultVote(token, data.id, value.id);
            return response?.percetage || "N/A";
          } catch (error) {
            console.log(error);
            return "N/A";
          }
        })
      );
      setPercentages(updatedPercentages);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPercentages();
  }, [data]);
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center text-gray-700 px-10 py-6 gap-5">
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 uppercase">
                  results
                </ModalHeader>
                <ModalBody>
                  <p className="capitalize">
                    Ketua : {dataCandidate.ketua && dataCandidate.ketua.nama}
                  </p>
                  <p className="capitalize">
                    Wakil : {dataCandidate.wakil && dataCandidate.wakil.nama}
                  </p>

                  <p className="capitalize">
                    Memperoleh : {dataResult && dataResult.result} Suara
                  </p>

                  <p className="capitalize">
                    Dari : {dataResult && dataResult.results} Suara
                  </p>

                  <p className="capitalize">
                    Persentase : {dataResult && dataResult.percetage}%
                  </p>
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
        <p className="text-2xl font-bold uppercase">Result Suksesi</p>
        <div className="w-[98%] lg:w-[90%] grid grid-cols-1 lg:grid-cols-3 gap-5 py-7">
          {data && data.kandidats ? (
            data.kandidats.map((value, idx) => {
              return (
                <>
                  <Card isFooterBlurred className="w-full h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                      <p className="text-tiny text-white/60 uppercase font-bold">
                        {`kandidat ${idx + 1}`}
                      </p>
                      <h4 className="text-white font-medium text-2xl">
                        {percentages[idx]} %
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
                          handleOpenModalResult(value);
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
      </div>
    </>
  );
}
