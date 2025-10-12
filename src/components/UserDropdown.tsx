"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";


export function UserDropdown() {
  const [open, setOpen] = useState(false);
  const { getUser,logout } = useAuthStore();
  const user = getUser();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 text-gray-200 font-bold hover:bg-gray-700"
      >
        {user?.name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 h-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg animate-fade-in">
          <div className="px-4 py-2 text-gray-300 font-semibold border-b border-gray-700">
            {user?.name}
          </div>

          <div className="py-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-150 group"
            onClick={() => setOpen(false)}
          >
            
            <span>Profile</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-150 group"
            onClick={() => setOpen(false)}
          >
            
            <span>Settings</span>
          </Link>

          <div className="border-t border-gray-800">
            <button
              onClick={() => {logout(); setOpen(false);}}
              className="flex items-center text-center gap-3 px-4 py-3 text- lg text-red-400 cursor-pointer w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}