import { useEffect, useMemo, useState } from "react";
import { deleteCandidate, getCandidates, getToken } from "../../../api/api.js";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Button,
  Avatar,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { PiPencil, PiPlus, PiTrash } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Candidate() {
  const token = localStorage.getItem("token");
  const [uuid, setUuid] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  let i = 0;

  const rowsPerPage = 2;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const handleOpen = (id) => {
    setUuid(id);
    onOpen();
  };

  const fetchData = async () => {
    try {
      const data = await getCandidates(token);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await deleteCandidate(token, uuid);
      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center text-gray-700">
        <div className="w-[90%] py-5 px-10 shadow-lg bg-white rounded-md flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <Modal
              size={"md"}
              isOpen={isOpen}
              onClose={onClose}
              backdrop="blur"
              className="relative"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalBody className="flex flex-col gap-2 items-center">
                      <CgDanger className="text-[70px] text-red-600" />
                      <p className="text-center">
                        Apakah kamu yakin ingin menghapus kandidat ini?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onPress={onClose}
                        onClick={() => {
                          handleDelete(uuid);
                        }}
                      >
                        Yes
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <p className="text-2xl font-bold ">Daftar Kandidat</p>
            <Link to={"create"}>
              <Button
                color="success"
                className="text-white font-bold"
                endContent={<PiPlus />}
              >
                Tambah Kandidat
              </Button>
            </Link>
          </div>
          <Table
            aria-label="Example table with client side pagination"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
            className={`w-full`}
          >
            <TableHeader>
              <TableColumn key="no">no</TableColumn>
              <TableColumn key="ketua">Ketua</TableColumn>
              <TableColumn key="wakil">Wakil</TableColumn>
              <TableColumn key="visi">VISI</TableColumn>
              <TableColumn key="misi">Misi</TableColumn>
              <TableColumn key="uuid">ACTION</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"No rows to display."}>
              {(item, idx) => {
                i++;
                return (
                  <TableRow key={item.uuid}>
                    <TableCell>{i}</TableCell>
                    <TableCell className="capitalize">
                      {item.ketua.nama}
                    </TableCell>
                    <TableCell className="capitalize">
                      {item.wakil.nama}
                    </TableCell>
                    <TableCell>{item.visi}</TableCell>
                    <TableCell>{item.misi}</TableCell>
                    <TableCell className="relative flex items-center gap-2">
                      <Link to={`update/${item.uuid}`}>
                        <Tooltip color="primary" content="Update user">
                          <Button
                            isIconOnly
                            className="bg-transparent rounded-full text-lg text-primary cursor-pointer active:opacity-50"
                          >
                            <PiPencil />
                          </Button>
                        </Tooltip>
                      </Link>
                      <Tooltip color="danger" content="Delete candidate">
                        <Button
                          isIconOnly
                          className="bg-transparent rounded-full text-lg text-danger cursor-pointer active:opacity-50"
                          onPress={() => {
                            handleOpen(item.uuid);
                          }}
                        >
                          <PiTrash />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              }}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
