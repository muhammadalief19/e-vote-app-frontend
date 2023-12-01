import { Button } from "@nextui-org/react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function AlertSuccess({ msg, setShow }) {
  return (
    <>
      <div
        className={`absolute z-[9999] w-max bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 right-10 top-5`}
        role="alert"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800">
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
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>
          </div>
          <div className="ms-3">
            <h3 className="text-gray-800 font-semibold dark:text-white">
              Success
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">{msg}</p>
          </div>
          <Button
            isIconOnly
            variant="light"
            aria-label="Like"
            className="ml-3"
            onClick={() => {
              setShow(false);
            }}
          >
            <AiOutlineClose />
          </Button>
        </div>
      </div>
    </>
  );
}
