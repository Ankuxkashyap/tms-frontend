"use client";
import Sidebar from "@/components/Sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api/api";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

type User = {
  _id: string;
  name: string;
};

type Formdata = {
  title?: string;
  description?: string;
  date?: Date | null;
  priority?: string;
  status?: string;
  assignedTo?: string;
};

const CreateTask = () => {
  const [users, setUsers] = React.useState<Array<User>>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [formdata, setFormdata] = useState<Formdata | null>(null);
  const router = useRouter();
  
  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  const getUsers = async () => {
    try {
      const res = await api.get("/user/users");
      const data = Array.isArray(res.data) ? res.data : res.data?.users || [];
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/task/create", {
        title: formdata?.title,
        description: formdata?.description,
        dueDate: date,
        priority: formdata?.priority,
        status: formdata?.status,
        assignedTo: formdata?.assignedTo,
      })
      if(res.status === 201) {
        setFormdata({
          title: "",
          description: "",
          date: null,
          priority: "",
          status: "",
          assignedTo: "",
        });
        setDate(null);
        toast.success("Task created successfully!");
        router.push("/dashboard");
      }
      console.log("Task created:", res.data);
    }
    catch (error) {
      console.error("Error creating task:", error);
    }
  };
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-gray-950 text-white">
        <div className="hidden md:block">
         <Sidebar  />
        </div>
      <div className={` flex-1 ml-0 md:ml-80 h-auto md:h-[75%] w-full md:w-[70%] shadow-lg shadow-gray-800/40 overflow-y-auto p-6 md:p-8 border border-gray-800 rounded-xl m-4 md:m-6 bg-gray-900/60 backdrop-blur-md `}>
        <h1 className="text-2xl font-semibold mb-8 text-gray-200 border-b border-gray-700 pb-3">
          Create New Task
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Task Title
            </label>
            <input
              onChange={(e) =>
                setFormdata({ ...formdata, title: e.target.value })
              }
              type="text"
              className="w-full md:w-[80%] p-3 border border-gray-700 rounded-md bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter task title"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              onChange={(e) =>
                setFormdata({ ...formdata, description: e.target.value })
              }
              className="w-full md:w-[80%] p-3 border resize-none border-gray-700 rounded-md bg-gray-950 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter task description"
              rows={4}
            ></textarea>
          </div>

          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full  md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Due Date
              </label>
              <div className="relative border w-full focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200 appearance-none  border-gray-700 rounded-md bg-gray-950 flex items-center">
                <DatePicker
                  selected={date}
                  onChange={handleDateChange}
                  placeholderText="Pick a date"
                  className="w-full p-3 pl-3 pr-10 text-white focus:outline-none "
                  calendarClassName="bg-gray-900 text-white border border-gray-700 rounded-lg"
                  popperClassName="z-50"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>

            <div className="w-full md:w-50">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Priority
              </label>
              <select
                onChange={(e) =>
                  setFormdata({ ...formdata, priority: e.target.value })
                }
                defaultValue="Medium"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-950 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                onChange={(e) =>
                  setFormdata({ ...formdata, status: e.target.value })
                }
                defaultValue="Pending"
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-950 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="w-full md:w-50">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Assign To
              </label>
              <select
                onChange={(e) =>
                  setFormdata({ ...formdata, assignedTo: e.target.value })
                }
                defaultValue="Select User"
                className="w-full p-3 border cursor-pointer border-gray-700 rounded-md bg-gray-950 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
              >
                <option disabled key={0}>
                  Select User
                </option>
                {users.map((user: User) => (
                  <option
                    className="cursor-pointer"
                    key={user._id}
                    value={user._id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="px-6 mt-10 py-3 w-full md:w-[80%] cursor-pointer bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-blue-600/30"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
      </div>
  );
};

export default CreateTask;
