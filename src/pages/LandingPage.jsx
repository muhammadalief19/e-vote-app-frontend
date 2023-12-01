import logoPens from "/images/pens.png";
import images1 from "/images/images-1.jpg";
import hmps from "/images/hmps.png";
import alief from "/images/alief.jpg";
import blob1 from "/images/blob-1.svg";
import blob2 from "/images/blob-2.svg";
import blob3 from "/images/blob-3.svg";
import { Card, CardHeader, Image, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const questions = [
    {
      question: "Bagaimana cara kerja e-voting?",
      answer:
        "e-voting PENS Sumenep menggunakan sistem autentikasi dan enkripsi yang aman untuk mencegah manipulasi suara. Mahasiswa hanya perlu login dan memberi suara.",
    },
    {
      question: "Apakah e-voting ini aman?",
      answer:
        "Keamanan e-voting PENS Sumenep sangat diperhatikan dengan menggunakan sistem keamanan terbaru, melindungi identitas dan suara mahasiswa.",
    },
    {
      question: "Apa teknologi yang digunakan?",
      answer:
        "Kami menggunakan teknologi blockchain terkini untuk memastikan keamanan dan transparansi.",
    },
    {
      question: "Kapan pengumuman hasil pemilihan?",
      answer:
        "Pengumuman hasil pemilihan akan segera dilakukan setelah proses penghitungan suara selesai. Pantau terus website resmi e-voting PENS Sumenep.",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);
  return (
    <>
      <div className="w-full text-[#CEB1BE] bg-[#2D2D34] flex flex-col gap-20">
        <section className="w-full lg:px-20 md:px-10 px-5 py-5 flex flex-col gap-10 relative z-50 overflow-hidden">
          {/* navbar */}
          <div className="w-full py-5">
            <div className="flex h-max items-center gap-6">
              <img src={logoPens} alt="" className="lg:w-14 w-12" />
              <p className="lg:text-xl md:text-lg font-bold">e-Vote PENS</p>
            </div>
          </div>
          {/* navbar */}

          {/* Sumenep */}
          <div className="w-full flex flex-col items-center lg:px-20 md:px-10 px-5">
            <div className="w-max md:px-20 px-9 md:py-10 py-5 text-center border border-[#CEB1BE] md:rounded-[85px] rounded-[38px]">
              <p className="uppercase lg:text-[180px] md:text-[120px] text-6xl font-gloock">
                sumenep
              </p>
            </div>
          </div>
          {/* Sumenep */}

          {/* image */}
          <div className="w-full lg:px-20 md:px-10 px-5">
            <div className="w-full flex md:flex-row items-center flex-col gap-5">
              <div className="md:w-[56%] w-full bg-[#CEB1BE] rounded-s-3xl rounded-ee-3xl flex flex-col gap-7 p-8 text-white">
                <img src={hmps} alt="" className="w-20" />
                <hr className="w-20 border-slate-300" />
                <div className="w-3/4">
                  <p className="">
                    Selamat datang di masa depan pemilihan ketua himpunan
                    mahasiswa! E-Vote PENS Sumenep menghadirkan gaya retro
                    minimalis untuk memilih pemimpin yang layak.
                  </p>
                </div>
              </div>
              <div className="flex-1 h-auto rounded-se-full rounded-es-full overflow-hidden">
                <Image
                  src={images1}
                  alt=""
                  className="w-full h-full object-cover rounded-none"
                  isZoomed
                />
              </div>
            </div>
          </div>
          {/* image */}

          {/* blob-1 */}
          <img
            src={blob1}
            alt=""
            className="absolute lg:w-[700px] md:w-[600px] w-[500px] -z-10 md:-left-[450px] -left-[250px] hover:rotate-12 rotate-45 transition-all duration-1000 ease-in-out"
          />
          {/* blob-1 */}

          {/* blob-2 */}
          <img
            src={blob2}
            alt=""
            className="absolute lg:w-[700px] md:w-[600px] w-[500px] -z-10 lg:-right-[470px] md:-right-[400px] -right-[300px] -bottom-20 hover:rotate-12 rotate-90 transition-all duration-500 ease-in-out"
          />
          {/* blob-2 */}
        </section>

        {/* section about */}
        <section className="w-full py-5 lg:px-20 md:px-10 px-5 flex flex-col gap-10">
          <div className="lg:px-20 md:px-10 px-5">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-gloock font-bold">
              Cara Mudah dan Praktis!
            </h1>
          </div>
          <div className="lg:px-20 md:px-10 px-5 flex md:flex-row flex-col gap-3 text-white">
            <p className="">
              Bergabunglah dengan PENS Sumenep e-Vote dan nikmati kebebasan
              memilih pemimpin masa depan Anda. Platform kami memungkinkan para
              pemilih untuk memilih kandidat yang layak dengan aman dan nyaman.
            </p>
            <p className="">
              Beban kertas? Jangan khawatir! Semua pemilihan dapat diselesaikan
              dalam hitungan menit dan hasil akan tertata rapi secara instan!
              Ayo lanjutkan, gabung sekarang!
            </p>
          </div>
        </section>
        {/* section about */}

        {/* section developer */}
        <section className="w-full px-20 py-5 flex flex-col items-center gap-10">
          <p className="capitalize lg:text-5xl md:text-4xl text-3xl font-gloock font-bold">
            developer
          </p>
          <div className="lg:px-20 md:px-10 px-5 w-max">
            <Card
              className="col-span-12 sm:col-span-4 md:h-[300px] h-[250px]"
              isPressable
            >
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Muhammad Alief
                </p>
                <h4 className="text-white font-medium text-large">
                  Fullstack Developer
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={alief}
              />
            </Card>
          </div>
        </section>
        {/* section developer */}

        {/* section question */}
        <section className="w-full lg:px-20 md:px-10 px-5 py-5">
          <div className="w-full lg:px-20 md:px-10 px-5 flex flex-col gap-5">
            <h1 className="capitalize lg:text-5xl md:text-4xl text-3xl font-gloock font-bold">
              pertanyaan umum
            </h1>
            <div className="w-full grid grid-cols-2 grid-flow-row gap-10">
              {questions.map((value, idx) => {
                return (
                  <div className="flex flex-col gap-5" key={idx}>
                    <h1 className="font-bold md:text-xl text-lg">
                      {value.question}
                    </h1>
                    <p className="text-white md:text-base text-sm">
                      {value.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* section question */}

        {/* section login */}
        <section className="w-full px-20 py-5 relative overflow-hidden">
          <img
            src={blob3}
            alt=""
            className="absolute w-[700px] -left-72 -top-10"
          />
          <div className="w-full lg:px-20 md:px-10 px-5 flex flex-col gap-5 items-center">
            <h1 className="lg:text-5xl md:text-4xl text-3xl font-gloock font-bold">
              Ayo Memilih!
            </h1>
            <p className="text-center md:w-2/5 w-full">
              Tidak ingin ketinggalan? Yuk, ambil bagian dalam proses pemilihan
              ketua himpunan mahasiswa.
            </p>
            <div className="md:w-1/4 w-3/4 flex md:flex-row flex-col justify-center gap-3">
              <Link to={"/login"} className="w-full">
                <Button color="primary" radius="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to={"/register"} className="w-full">
                <Button
                  color="danger"
                  variant="ghost"
                  radius="sm"
                  className="w-full"
                >
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* section login */}

        {/* footer */}
        <footer className="w-full py-5 lg:px-20 md:px-10 px-5">
          <div className="w-full lg:px-20 md:px-10 px-5 py-10 flex flex-col gap-16 items-center">
            <hr className="w-full border border-gray-500" />
            <div className="w-max flex flex-col gap-7 items-center">
              <div className="flex gap-5">
                <Link to={""}>
                  <AiFillInstagram className="md:w-7 md:h-7 w-6 h-6" />
                </Link>
                <Link to={""}>
                  <AiFillTwitterCircle className="md:w-7 md:h-7 w-6 h-6" />
                </Link>
                <Link to={""}>
                  <AiFillGithub className="md:w-7 md:h-7 w-6 h-6" />
                </Link>
              </div>
              <p className="md:text-base text-sm">
                Hak Cipta © e-Vote PENS Sumenep 2023
              </p>
            </div>
          </div>
        </footer>
        {/* footer */}
      </div>
    </>
  );
}
