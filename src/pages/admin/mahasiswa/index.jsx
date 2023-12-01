import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteUsers, getToken, getUsers } from "../../../api/api.js";
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
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { PiPencil, PiPlus, PiTrash } from "react-icons/pi";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";

export default function Mahasiwa() {
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
      const data = await getUsers(token);
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (uuid) => {
    try {
      await deleteUsers(token, uuid);
      console.log(data);
      fetchData();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const statusColorMap = {
    verified: "success",
    nonVerified: "danger",
  };

  useEffect(() => {
    fetchData();
  }, [token]);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center text-gray-700">
        <div className="py-5 px-10 shadow-lg bg-white rounded-md flex flex-col gap-5">
          <div className="w-full flex justify-between items-center">
            <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalBody className="flex flex-col gap-2 items-center">
                      <CgDanger className="text-[70px] text-red-600" />
                      <p className="text-center">
                        Apakah kamu yakin ingin menghapus user ini?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        color="danger"
                        onPress={() => {
                          handleDelete(id);
                          onClose();
                        }}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <p className="text-2xl font-bold ">Daftar Users</p>
            <Link to={"create"}>
              <Button
                color="success"
                className="text-white font-bold"
                endContent={<PiPlus />}
              >
                Tambah user
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
          >
            <TableHeader>
              <TableColumn key="foto_profile">FOTO PROFILE</TableColumn>
              <TableColumn key="nama">NAMA</TableColumn>
              <TableColumn key="email">Email</TableColumn>
              <TableColumn key="role">ROLE</TableColumn>
              <TableColumn key="email_verified_at">STATUS</TableColumn>
              <TableColumn key="uuid">ACTION</TableColumn>
            </TableHeader>
            <TableBody items={items} emptyContent={"No rows to display."}>
              {(item) => (
                <TableRow key={item.name}>
                  {(columnKey) => {
                    return columnKey == "foto_profile" ? (
                      <TableCell className="flex justify-center items-center">
                        <Avatar
                          isBordered
                          src={`${
                            import.meta.env.VITE_APP_STATICURL
                          }/foto-profile/${getKeyValue(item, columnKey)}`}
                        />
                      </TableCell>
                    ) : columnKey == "uuid" ? (
                      <TableCell className="relative flex items-center gap-2">
                        <Link to={`update/${getKeyValue(item, columnKey)}`}>
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
                              setId(getKeyValue(item, columnKey));
                            }}
                          >
                            <PiTrash />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    ) : columnKey == "email_verified_at" ? (
                      <TableCell className="">
                        <Chip
                          className="capitalize border-none gap-1 text-default-600"
                          color={
                            getKeyValue(item, columnKey) != null
                              ? statusColorMap["verified"]
                              : statusColorMap["nonVerified"]
                          }
                          size="sm"
                          variant="dot"
                        >
                          {getKeyValue(item, columnKey) != null
                            ? "verified"
                            : "not verified"}
                        </Chip>
                      </TableCell>
                    ) : (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    );
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
