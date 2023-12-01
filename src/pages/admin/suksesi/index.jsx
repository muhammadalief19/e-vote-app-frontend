import { useEffect, useMemo, useState } from "react";
import { deleteSuksesi, getSuksesi, getToken } from "../../../api/api";
import {
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Image,
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Chip,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { PiPencil, PiPlus, PiTrash } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";

export default function Suksesi() {
  const [suksesis, setSukesis] = useState([]);
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const rowsPerPage = 4;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  const fetchData = async () => {
    try {
      const response = await getSuksesi(token);
      setData(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSuksesi(token, id);
      fetchData();
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const statusColorMap = {
    dibuka: "success",
    ditutup: "danger",
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full h-screen items-center px-10 py-5 flex flex-col gap-7">
        <div className="w-[90%] py-5 px-10 shadow-lg bg-white rounded-md flex flex-col gap-5">
          <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="flex flex-col gap-2 items-center">
                    <CgDanger className="text-[70px] text-red-600" />
                    <p className="text-center">
                      Apakah kamu yakin ingin menghapus acara ini?
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cancel
                    </Button>
                    <Button
                      color="danger"
                      onPress={onClose}
                      onClick={() => {
                        handleDelete(id);
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <div className="w-full flex justify-between items-center">
            <p className="text-2xl font-bold">Suksesi</p>
            <Link to={"create"}>
              <Button
                color="success"
                className="text-white font-bold"
                endContent={<PiPlus />}
              >
                Tambah Suksesi
              </Button>
            </Link>
          </div>
          <div className="w-full">
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
              className="w-full"
            >
              <TableHeader>
                <TableColumn key="name">NAME</TableColumn>
                <TableColumn key="poster">Poster</TableColumn>
                <TableColumn key="tgl_pelaksanaan">PELAKSANAAN</TableColumn>
                <TableColumn key="status">STATUS</TableColumn>
                <TableColumn key="action">ACTION</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.name}>
                    {(columnKey) => (
                      <TableCell className="">
                        {columnKey == "poster" ? (
                          <div className="flex">
                            <Image
                              width={150}
                              alt="NextUI hero Image"
                              isZoomed
                              src={`${
                                import.meta.env.VITE_APP_STATICURL
                              }/poster-suksesi/${getKeyValue(item, columnKey)}`}
                              className="aspect-[3/4] object-cover"
                            />
                          </div>
                        ) : columnKey == "action" ? (
                          <>
                            <Link to={`update/${getKeyValue(item, "uuid")}`}>
                              <Tooltip color="primary" content="Update user">
                                <Button
                                  isIconOnly
                                  className="bg-transparent rounded-full text-lg text-primary cursor-pointer active:opacity-50"
                                >
                                  <PiPencil />
                                </Button>
                              </Tooltip>
                            </Link>
                            <Tooltip color="danger" content="Delete user">
                              <Button
                                isIconOnly
                                onPress={onOpen}
                                className="bg-transparent rounded-full text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => {
                                  setId(getKeyValue(item, "uuid"));
                                }}
                              >
                                <PiTrash />
                              </Button>
                            </Tooltip>
                          </>
                        ) : columnKey == "status" ? (
                          <Chip
                            className="capitalize border-none gap-1 text-default-600"
                            color={
                              getKeyValue(item, columnKey) == "dibuka"
                                ? statusColorMap["dibuka"]
                                : statusColorMap["ditutup"]
                            }
                            size="sm"
                            variant="dot"
                          >
                            {getKeyValue(item, columnKey) == "dibuka"
                              ? "dibuka"
                              : "ditutup"}
                          </Chip>
                        ) : (
                          getKeyValue(item, columnKey)
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
