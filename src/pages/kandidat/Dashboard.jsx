import { useEffect, useState } from "react";
import Chart from "../../components/Chart.jsx";
import Stat from "../../components/Stat.jsx";
import { countedDataStat, refreshToken } from "../../api/api.js";
export default function Dashboard() {
  const token = localStorage.getItem("token");
  const [dataStat, setDataStat] = useState([]);
  const [userAuth, setUserAuth] = useState({});

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
      const response = await countedDataStat(token);
      setDataStat(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getUserAuth();
  }, []);
  return (
    <>
      <div className="w-full h-screen flex flex-col gap-5 py-5 px-10 text-gray-600">
        <p className="font-bold text-xl">Dashboard</p>
        <div className="w-full flex flex-col items-center gap-5">
          <div className="w-full md:w-4/5 lg:w-3/4 grid grid-cols-2 lg:grid-cols-3 gap-3">
            {dataStat.map((value, idx) => {
              return (
                <Stat
                  title={value.nama}
                  value={value.count}
                  color={value.color}
                  key={idx}
                />
              );
            })}
          </div>
          <div className="w-full md:w-4/5 lg:w-3/4 py-8">
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}
