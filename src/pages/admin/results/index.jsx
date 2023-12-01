import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { getSuksesi } from "../../../api/api";

export default function ResultsAdmin() {
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getSuksesi(token);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center text-gray-700 px-10 py-6">
        <p className="text-xl font-bold uppercase">voting results</p>
        <div className="w-[90%] grid grid-cols-1 lg:grid-cols-3 grid-flow-row">
          {data.map((value, idx) => (
            <Link to={`${value.uuid}`}>
              <Card shadow="sm" key={idx} isPressable>
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={value.name}
                    className="w-full object-cover aspect-3/4"
                    src={`${
                      import.meta.env.VITE_APP_STATICURL
                    }/poster-suksesi/${value.poster}`}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{value.name}</b>
                  <p className="text-default-500">{value.tgl_pelaksanaan}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
