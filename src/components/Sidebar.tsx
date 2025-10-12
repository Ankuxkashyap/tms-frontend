"use client"
import Link from 'next/link';
import React from 'react';  
import { FiHome, FiUser ,FiSettings, FiSidebar} from "react-icons/fi";
import { LuCalendar } from "react-icons/lu";
import { RiInbox2Line } from "react-icons/ri";

const Sidebar = () => {
  const [isOpenState, setIsOpensetate ] = React.useState(false);
  return (
    <div className={`fixed top-14 left-0  ${isOpenState ? " w-15 items-center": " w-70 "} transition duration-300  h-[calc(100vh-3.5rem)] border-r border-gray-500 bg-gray-850 p-4 shadow-lg `}>
    <div className=" flex flex-row gap-30 items-center justify-between">
        <button  className=''
          onClick={() => setIsOpensetate(!isOpenState)}>
            <i className='text-xl'><FiSidebar /></i>
        </button>
      </div>
      <div className={`space-y-2 mt-4 ${isOpenState &&  " items-center flex flex-col "}`}>
        <Link href={'/dashboard'}  className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition">
          <i className='mr-2 text-xl'><FiHome /></i>
            {!isOpenState &&" Dashboard"}
        </Link>
        <Link href="/tasks" className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition">
          <i className='mr-2 text-xl'><RiInbox2Line /></i>
          {!isOpenState && " My Tasks"} 
        </Link>
        <Link href="/tasks/create" className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition">
          <i className='mr-2 text-xl'><LuCalendar /></i>
          {!isOpenState && "Create Tasks"}
        </Link>
        <Link href="#" className="py-2 px-2 flex items-center rounded hover:bg-gray-800 cursor-pointer transition">
          <i className='mr-2 text-xl'><FiSettings /></i>
          {!isOpenState && "Settings"}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;