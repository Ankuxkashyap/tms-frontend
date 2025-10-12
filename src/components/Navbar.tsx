"use client";
import {UserDropdown} from "./UserDropdown"
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useAuthStore } from "@/store/auth";


export function Navbar() {
  const { getUser } = useAuthStore();
  const [mounted, setMounted] = useState(false); 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = mounted ? getUser() : null; // ✅ only call getUser after mount

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 border-b border-gray-700 transition-all duration-300 ${
        scrolled
          ? "bg-black/20 backdrop-blur-lg shadow-md border-gray-700 "
          : "bg-transparent"
      }`}
    >
      <div className="flex h-14 items-center justify-between">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center ml-5 gap-5 space-x-2 ">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-xl font-bold text-gray-600">
                Taskify
              </span>
            </div>
            <span className="hidden text-lg font-semibold sm:inline-block">
              Task Management System
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="border py-1 px-4 cursor-pointer border-gray-600 rounded-lg">
              Dashboard
          </Link>

          <NotificationsDropdown />

          {user ? (
            <UserDropdown />
          ) : (
            <div>
              <Link
                href="/login"
                className="rounded-lg text-black px-4 border-gray-200 cursor-pointer bg-gray-300 py-2"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-800 transition"
      >
        <FaRegBell className="w-5 h-5 text-gray-300" />
        <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full px-1">
          2
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <div className="px-4 py-2 font-semibold text-gray-200 border-b border-gray-700">
            Notifications
          </div>

          <div className="max-h-64 overflow-y-auto">
            <div className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition">
              <div className="flex justify-between items-center">
                <p>Task assigned: Design homepage</p>
                <span className="text-xs text-gray-500">10:30 AM</span>
              </div>
            </div>
            <div className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition">
              <div className="flex justify-between items-center">
                <p>Deadline updated for Project Alpha</p>
                <span className="text-xs text-gray-500">Yesterday</span>
              </div>
            </div>
          </div>

          <div className="text-center border-t border-gray-700 p-2">
            <button className="text-sm text-gray-400 hover:text-gray-200">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



