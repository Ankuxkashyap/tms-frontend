"use client";

import Sidebar from "@/components/Sidebar";
import TaskCard from "@/components/TaskCard";
import api from "@/lib/api/api";
// import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";

type Task = {
  _id: number;
  title: string;
  description: string;
  status: string;
  createdBy: {
    _id: number;
    name: string;
    email: string;
  };
  assignedTo: {
    _id: number;
    name: string;
    email: string;
  };
  dueDate: Date;
  priority: string;
};

const Tasks = () => {
  const [createdTasks, setCreatedTasks] = useState<Array<Task>>([]);
  const [input, setInput] = useState<string>("");

  const getTasksCreatedByUser = async () => {
    const res = await api.get("/task/getTasksCreatedByUser");
    const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
    setCreatedTasks(data);
  };

  const getTasksBySearch = async () => {
    try {
      if (!input.trim()) {
        getTasksCreatedByUser();
        return;
      }
      const res = await api.post("/task/search", { query: input });
      const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
      setCreatedTasks(data);
    } catch (err) {
      console.log(err);
      setCreatedTasks([]);
    }
  };

  const handelOnStatusChange = () => {
    getTasksCreatedByUser();
  }
  useEffect(() => {
    getTasksCreatedByUser();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      getTasksBySearch();
    }, 500);
    return () => clearTimeout(delay);
  }, [input]);

  return (
    <div className="  bg-gray-950 text-white min-h-screen">
      <div className="md:w-72 m-5 md:block lg:w-80">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-80 w-full md:w-auto mt-14 md:mt-0 p-4 md:p-8">
        <h2 className="text-2xl">Tasks Created by Me</h2>

        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="h-8 my-5 w-70 border-2 border-gray-300 py-4 px-2 rounded-sm"
          placeholder="Search by title and Description"
        />

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {createdTasks.map((task: Task) => (
            <TaskCard onStatusChange={handelOnStatusChange} key={task._id} task={task} />
          ))}
          {createdTasks.length === 0 && (
            <p className="text-gray-400">No tasks created by you</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
