import { useEffect, useState } from "react";
import { getCandidateAuth, refreshToken } from "../../api/api";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function VisiMisi() {
  let token = localStorage.getItem("token");
  const [userAuth, setUserAuth] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUserAuth = async () => {
    try {
      const response = await getCandidateAuth();
      setUserAuth(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAuth();
  }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center text-gray-700 px-10 py-6 gap-7">
        <p className="text-xl font-bold uppercase">visi misi</p>
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 uppercase">
                  visi dan misi
                </ModalHeader>
                <ModalBody>
                  <p className="uppercase">Visi : </p>
                  <p className="">{userAuth && userAuth.kandidat.visi}</p>

                  <p className="uppercase">Misi : </p>
                  <p className="">{userAuth && userAuth.kandidat.misi}</p>
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
        <div className="w-full lg:w-3/5 gap-5 grid grid-cols-1 lg:grid-cols-2 grid-flow-row">
          <Card
            shadow="sm"
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={userAuth.kandidat && userAuth.kandidat.ketua.nrp}
                className="w-full object-cover aspect-square"
                src={
                  userAuth.kandidat &&
                  `${import.meta.env.VITE_APP_STATICURL}/foto-profile/${
                    userAuth.kandidat.ketua.foto_profile
                  }`
                }
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="text-default-500 font-bold">
                {userAuth.kandidat && userAuth.kandidat.ketua.nama}
              </p>
              <p className="font-bold uppercase">ketua</p>
            </CardFooter>
          </Card>

          <Card
            shadow="sm"
            isPressable
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={userAuth.kandidat && userAuth.kandidat.wakil.nrp}
                className="w-full object-cover aspect-square"
                src={
                  userAuth.kandidat &&
                  `${import.meta.env.VITE_APP_STATICURL}/foto-profile/${
                    userAuth.kandidat.wakil.foto_profile
                  }`
                }
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="text-default-500 font-bold">
                {userAuth.kandidat && userAuth.kandidat.wakil.nama}
              </p>
              <p className="font-bold uppercase">wakil</p>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full lg:w-3/5 flex justify-between px-10">
          <Button
            color="primary"
            variant="flat"
            className="capitalize"
            onPress={onOpen}
          >
            Detail visi misi
          </Button>
          <Link to={`${userAuth.kandidat && userAuth.kandidat.uuid}`}>
            <Button color="success" variant="flat" className="capitalize">
              Update visi misi
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
