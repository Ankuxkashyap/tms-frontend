import { useState, useEffect, useRef } from "react";
import { FaRegBell } from "react-icons/fa";
import { useAuthStore } from "@/store/auth";
import type { User } from "@/types/User";
import socket from "@/lib/socket";
import useNotificationStore from "@/store/notifaction";
import toast from "react-hot-toast";

type Notification = {
  message: string;
  taskId: string;
  read: boolean;
  user: string;
  _id: string;
  createdAt: string;
};

export function NotificationsDropdown() {
  const { notifications, getNotifications, addNotification, getNotifactionCount, showMoreNotifications, updateReadNotification } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const { getUser } = useAuthStore();
  const count = getNotifactionCount();
  const user = getUser() as User | null;
  const notification = useNotificationStore((state) => state.notifications);
  console.log(notification)
  const dropdownRef = useRef<HTMLDivElement>(null);

  

  const HandleReadALL = () => {
    if(!user){
      return
    }
    updateReadNotification();
    getNotifications();
    setOpen(false);
  };

  const HandViewAll = () => {
    if(!user){
      return
    }
    showMoreNotifications();
    // setOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!user?._id) return;
    socket.emit("join", user._id);

    getNotifications();

    const handleNotification = (notif: Notification) => {
      addNotification(notif);
      console.log("New Notification:", notif);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.emit("leave", user._id);
      socket.off("notification", handleNotification);
    };
  }, [user?._id]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-800 transition"
      >
        <FaRegBell className="w-5 h-5 text-gray-300" />
        {count > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full px-1">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80  bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-fade-in">
          <div className="px-4 py-2 font-semibold text-gray-200 border-b border-gray-700">
            Notifications
          </div>

          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`px-4 py-2 text-sm ${notification.read ? "" : "bg-gray-800"} text-gray-300 hover:bg-gray-700 transition flex justify-between items-center`}
                >
                  <p className={`${notification.read ? "text-gray-300" : "text-stone-300"}`}>
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="text-center border-t flex justify-between border-gray-700 p-2">
            <button
              onClick={HandViewAll}
              className="text-sm cursor-pointer text-gray-400 hover:text-gray-200"
            >
              View all notifications
            </button>
            <div className="border-r border-gray-400"></div>
            <button onClick={HandleReadALL}>
              <span className="text-sm cursor-pointer text-gray-400 hover:text-gray-200">
                Mark all as read
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
