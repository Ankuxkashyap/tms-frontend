"use client";
import Link from "next/link";
import React from "react";
import { FiHome, FiSettings, FiSidebar } from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { RiInbox2Line } from "react-icons/ri";

const Sidebar = () => {
  const [isOpenState, setIsOpenState] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpenState(!isOpenState)}
        className="absolute top-16 left-4 z-30 md:hidden text-xl bg-gray-850 p-2 rounded-md border border-gray-600 shadow-md"
      >
        <FiSidebar />
      </button>

      <div
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-full bg-gray-950 md:border-r border-gray-500 md:bg-gray-850 p-4 shadow-lg transition-all duration-300 z-40 
        ${isOpenState ? "translate-x-0 w-64" : "-translate-x-full w-64" } 
        md:translate-x-0 md:w-70`}
      >
        
        <div className=" space-y-2 mt-8 md:mt-4">
          <Link
            href="/dashboard"
            className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition"
            onClick={() => setIsOpenState(false)}
          >
            <i className="mr-2 text-xl">
              <FiHome />
            </i>
            Dashboard
          </Link>

          <Link
            href="/tasks"
            className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition"
            onClick={() => setIsOpenState(false)}
          >
            <i className="mr-2 text-xl">
              <RiInbox2Line />
            </i>
            My Tasks
          </Link>

          <Link
            href="/tasks/create"
            className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition"
            onClick={() => setIsOpenState(false)}
          >
            <i className="mr-2 text-xl">
              <LuCalendar />
            </i>
            Create Tasks
          </Link>

          <Link
            href="#"
            className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition"
            onClick={() => setIsOpenState(false)}
          >
            <i className="mr-2 text-xl">
              <FiSettings />
            </i>
            Settings
          </Link>
        </div>
      </div>

      {isOpenState && (
        <div
          className="absolte z-50 top-0 left-0 w-full h-full bg-black/50  md:hidden"
          onClick={() => setIsOpenState(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
