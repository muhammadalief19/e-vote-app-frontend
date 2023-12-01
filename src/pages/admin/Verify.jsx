import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import FileInput from "../../components/FileInput";
import { useEffect, useState } from "react";
import {
  getDesa,
  getKecamatan,
  getKota,
  getProvinsi,
  refreshToken,
} from "../../api/api.js";
import FileInput2 from "../../components/FileInput2.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Verify() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [nrp, setNrp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [gender, setGender] = useState("");
  const [ktm, setKtm] = useState("");
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const userAuth = async () => {
    const userAuth = await refreshToken();
    setUser(userAuth);
  };

  const dataProvinsi = async () => {
    try {
      const response = await getProvinsi();
      setData1(response);
    } catch (error) {
      console.log(error);
    }
  };

  const dataKota = async (prov) => {
    try {
      const response = await getKota(prov);
      setData2(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const dataKecamatan = async (kab) => {
    try {
      const response = await getKecamatan(kab);
      setData3(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const dataDesa = async (kec) => {
    try {
      const response = await getDesa(kec);
      setData4(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("nrp", nrp);
    formData.append("alamat", alamat);
    formData.append("foto_ktm", ktm);
    formData.append("jenis_kelamin", gender);
    formData.append("userId", user.id);

    try {
      const dataUsers = await axios.post(
        `${import.meta.env.VITE_APP_APIURL}/data-users`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const verify = await axios.post(
        `${import.meta.env.VITE_APP_APIURL}/auth/verify/${user.uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(dataUsers);
      console.log(verify);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataProvinsi();
    userAuth();
  }, []);

  return (
    <>
      <div className="w-full h-screen flex felx-col justify-center items-center py-5 px-10 text-gray-600">
        <div className="w-full md:w-4/5 lg:w-3/4 shadow-lg py-5 px-7 flex flex-col gap-4">
          <p className="font-bold capitalize">verikasi data diri</p>
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 md:grid-cols-2 grid-flow-row  gap-4"
          >
            <div className="w-full">
              <Input
                type="text"
                variant={"bordered"}
                color="info"
                label="Nrp"
                className="w-full"
                isRequired
                onChange={(e) => {
                  setNrp(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <Select
                isRequired
                label="Pilih Provinsi"
                className="w-full"
                onChange={(e) => {
                  let value = e.target.value.split("_");
                  dataKota(value[0]);
                  console.log(e.target.value);
                  setAlamat(alamat + " " + value[1]);
                }}
              >
                {data1.map((prov) => {
                  return (
                    <SelectItem key={prov.id + "_" + prov.name}>
                      {prov.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Select
                isRequired
                label="Pilih Kota / Kabupaten"
                className="w-full"
                onChange={(e) => {
                  let value = e.target.value.split("_");
                  dataKecamatan(value[0]);
                  setAlamat(alamat + " " + value[1]);
                }}
              >
                {data2.map((kab) => {
                  return (
                    <SelectItem key={kab.id + "_" + kab.name}>
                      {kab.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Select
                isRequired
                label="Pilih Kecamatan"
                className="w-full"
                onChange={(e) => {
                  let value = e.target.value.split("_");
                  dataDesa(value[0]);
                  setAlamat(alamat + " " + value[1]);
                }}
              >
                {data3.map((kec) => {
                  return (
                    <SelectItem key={kec.id + "_" + kec.name}>
                      {kec.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Select
                isRequired
                label="Pilih Desa"
                className="w-full"
                onChange={(e) => {
                  let value = e.target.value.split("_");
                  setAlamat(alamat + " " + value[1]);
                }}
              >
                {data4.map((des) => {
                  return (
                    <SelectItem key={des.id + "_" + des.name}>
                      {des.name}
                    </SelectItem>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Select
                isRequired
                label="Gender"
                className="w-full"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <SelectItem key={"laki-laki"}>laki-laki</SelectItem>
                <SelectItem key={"perempuan"}>perempuan</SelectItem>
              </Select>
            </div>
            <div className="w-full md:col-span-2">
              <FileInput2 title={"Upload Foto KTM"} handleFile={setKtm} />
            </div>
            <div className="w-full md:col-span-2">
              <Button
                type="submit"
                size="lg"
                color="success"
                className="w-full text-white font-semibold"
                onClick={() => {
                  console.log(gender);
                }}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
