import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { countedData } from "../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const [dataSet, setDataSet] = useState({});
  let token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await countedData(token);
      setDataSet(response);
    } catch (error) {
      console.log(error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Set",
      },
    },
  };

  const labels = ["Kandidat", "Voting", "Users", "Mahasiswa"];

  const data = {
    labels,
    datasets: [
      {
        label: "Data",
        data: [
          dataSet.kandidat,
          dataSet.voting,
          dataSet.users,
          dataSet.mahasiswa,
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
