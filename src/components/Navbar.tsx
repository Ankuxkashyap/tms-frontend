"use client";
import {UserDropdown} from "./UserDropdown"
import { FaRegBell } from "react-icons/fa";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { io } from "socket.io-client";
import type { User } from "@/types/User";
import { NotificationsDropdown} from "@/components/NotificationsDropdown"
import api from "@/lib/api/api";

export function Navbar() {
  const { getUser } = useAuthStore();
  const [mounted, setMounted] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  // const [users ,setUsers] = useState([])

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = mounted ? getUser() : null; 

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






