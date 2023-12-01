import { Button } from "@nextui-org/react";
import { AiOutlineClose } from "react-icons/ai";

export default function AlertError({ setStatus, msg }) {
  return (
    <>
      <div
        className={`absolute w-max top-3 left-5 bg-red-50 border-s-4 border-red-500 py-4 px-10 block`}
        role="alert"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 ">
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          </div>
          <div className="ms-3">
            <h3 className="text-gray-800 font-semibold">Error!</h3>
            <p className="text-sm text-gray-700 ">{msg}</p>
          </div>
          <Button
            isIconOnly
            variant="light"
            aria-label="Like"
            className="ml-3"
            onClick={() => {
              setStatus(true);
            }}
          >
            <AiOutlineClose />
          </Button>
        </div>
      </div>
    </>
  );
}
