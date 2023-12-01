import React, { useState } from "react";
import pens from "/images/pens.png";
import { Button, Divider } from "@nextui-org/react";
import { kandidat } from "../routes.jsx";
import { Link, useLocation } from "react-router-dom";

const SidebarKandidat = ({ hideSideBar }) => {
  const location = useLocation();
  const activeRoute = (route) => {
    let path = location.pathname;
    return path.split("/kandidat")[1].includes(route);
  };
  return (
    <>
      <div
        className={`absolute lg:relative lg:translate-x-0 w-[250px] h-full flex flex-col gap-2 items-center py-10 px-5 text-gray-100 border-r-1 transition-all transform duration-300 z-[9999] rounded-e-xl shadow-2xl shadow-blue-900 bg-gray-800 ${
          hideSideBar ? "-translate-x-[350px]" : "translate-x-0"
        }`}
      >
        <div className="w-full py-7">
          <div className="flex h-max items-center gap-6">
            <img src={pens} alt="" className="lg:w-14 w-12" />
            <p className="lg:text-lg md:text-base font-bold text-yellow-400">
              E-Vote
              <span className="text-blue-800"> APP</span>
            </p>
          </div>
        </div>
        <Divider className="bg-gray-100" />
        <div className="w-full flex flex-col gap-3">
          {kandidat.map((value, idx) => {
            return (
              <Link key={idx} to={value.path}>
                <Button
                  radius="full"
                  variant=""
                  size={"md"}
                  className={`w-full flex justify-start capitalize font-semibold ${
                    activeRoute(value.path) ? "text-sky-600" : ""
                  }`}
                  startContent={value.icon}
                >
                  {value.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SidebarKandidat;
