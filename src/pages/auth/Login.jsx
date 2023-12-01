import illustrration1 from "/images/illustration-1.svg";
import hmps from "/images/hmps.png";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertError from "../../components/AlertError";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(true);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    try {
      const login = await axios.post(
        `${import.meta.env.VITE_APP_APIURL}/auth/login`,
        data
      );
      localStorage.setItem("token", login.data.accessToken);
      navigate("/admin/dashboard", { state: { status: true } });
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
      setStatus(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, []);

  return (
    <>
      <div className="w-full h-screen grid lg:grid-cols-3 grid-cols-1">
        {!status ? <AlertError msg={message} setStatus={setStatus} /> : ""}
        <div className="lg:w-full lg:h-full lg:flex justify-center items-center hidden">
          <img src={illustrration1} alt="" className="" />
        </div>
        <form
          onSubmit={loginHandler}
          className="w-full lg:col-span-2 flex justify-center items-center bg-yellow-300 relative overflow-x-hidden lg:rounded-ss-2xl lg:rounded-es-2xl"
        >
          <div className="lg:w-2/3 md:w-1/2 w-4/5 h-max flex flex-col gap-7 shadow-xl px-12 py-10 rounded-md bg-white text-gray-500">
            <img src={hmps} alt="" className="w-12" />
            <p className="text-2xl lg:text-3xl font-bold capitalize">
              welcome back !
            </p>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                type="email"
                variant={"underlined"}
                label="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
              <Input
                label="Password"
                variant="underlined"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className=""
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p className="text-sm capitalize">
              belum punya akun ?{" "}
              <Link to={"/register"} className="text-yellow-400">
                register
              </Link>
            </p>
            <div className="w-full flex justify-center">
              <Button
                size="lg"
                color="primary"
                variant="shadow"
                className="w-full bg-yellow-300 shadow-yellow-200 uppercase"
                type="submit"
              >
                login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
