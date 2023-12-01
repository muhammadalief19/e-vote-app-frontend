import { useEffect, useState } from "react";
import { refreshToken } from "../../api/api";
import { Avatar, User } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function Profile() {
  const [userAuth, setUserAuth] = useState({});

  const getUserAuth = async () => {
    try {
      const response = await refreshToken();
      setUserAuth(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAuth();
  }, []);
  return (
    <>
      <div className="w-full h-screen py-5 px-10 flex flex-col gap-7 text-gray-700 items-center">
        <div className="w-full lg:w-[90%] px-10 py-5">
          <p className="text-2xl font-bold">Profile</p>
        </div>
        <div className="w-full lg:w-[90%] bg-gray-200 px-10 py-5 rounded-md shadow-lg">
          <Table aria-label="Example table with dynamic content">
            <TableHeader>
              <TableColumn key={1}>
                <p className="text-xl font-bold">About Me</p>
              </TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key={"row-1"} className="flex justify-center">
                <TableCell className="font-semibold">
                  <Card className="max-w-[340px]">
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src={`${
                            import.meta.env.VITE_APP_STATICURL
                          }/foto-profile/${userAuth.foto_profile}`}
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {userAuth.nama}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {userAuth.data_user ? userAuth.data_user.nrp : ""}
                          </h5>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                      {userAuth.data_user ? userAuth.data_user.alamat : ""}
                    </CardBody>
                    <CardFooter className="gap-3">
                      <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">
                          {userAuth.data_user
                            ? userAuth.data_user.jenis_kelamin
                            : ""}
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
