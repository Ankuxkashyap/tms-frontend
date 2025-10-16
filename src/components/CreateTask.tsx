"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import api from "@/lib/api/api";

type User = {
  _id: string;
  name: string;
};

type Task = {
  _id?: string;
  title?: string;
  description?: string;
  dueDate?: string | Date | null;
  priority?: string;
  status?: string;
  assignedTo?: string;
};

const CreateTask = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[3]; // Extract task ID from URL

  const [users, setUsers] = useState<User[]>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string>("LOW");
  const [status, setStatus] = useState<string>("PENDING");
  const [assignedTo, setAssignedTo] = useState<string>("");

  // ✅ Fetch users for dropdown
  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/users");
      const data = Array.isArray(res.data) ? res.data : res.data?.users || [];
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  // ✅ Fetch task details for editing
  const fetchTask = async () => {
    try {
      const res = await api.get(`/task/${id}`);
      const data = res.data;
      // console.log(res)

      setTitle(data.task.title || "");
      setDescription(data.task.description || "");
      setDate(
      data.dueDate && !isNaN(Date.parse(data.dueDate))
        ? new Date(data.dueDate)
        : null
    );
      setPriority(data.task.priority || "LOW");
      setStatus(data.task.status || "PENDING");
      setAssignedTo(data.task.assignedTo?._id || data.task.assignedTo || "");

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch task details");
    }
  };

  useEffect(() => {
    if (id) {
      fetchUsers();
      fetchTask();
    }
  }, [id]);

  // ✅ Handle task update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dueDate: date,
      priority,
      status,
      assignedTo,
    };

    try {
      const res = await api.put(`/task/edit/${id}`, payload);
      if (res.status === 200) {
        toast.success("Task updated successfully!");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-950 text-white">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Form Section */}
      <div className="flex-1 ml-0 md:ml-80 w-full md:w-[70%] shadow-lg shadow-gray-800/40 overflow-y-auto p-6 md:p-8 border border-gray-800 rounded-xl m-4 md:m-6 bg-gray-900/60 backdrop-blur-md">
        <h1 className="text-2xl font-semibold mb-8 text-gray-200 border-b border-gray-700 pb-3">
          Edit Task
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full md:w-[80%] p-3 border border-gray-700 rounded-md bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="w-full md:w-[80%] p-3 border resize-none border-gray-700 rounded-md bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Date & Priority */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Due Date
              </label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                placeholderText="Pick a date"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-950 text-white"
                calendarClassName="bg-gray-900 text-white border border-gray-700 rounded-lg"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-950 text-white"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>
          </div>

          {/* Status & Assign To */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-950 text-white"
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Assign To
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-950 text-white"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 mt-10 py-3 w-full md:w-[80%] bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-blue-600/30"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
