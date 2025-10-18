"use client";
import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TaskCard from "@/components/TaskCard";
import api from "@/lib/api/api";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";

type Task = {
  title: string;
  _id: number;
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

const Dashboard = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [createdTasks, setCreatedTasks] = useState<any>([]);
  const [overdueTasks, setOverdueTasks] = useState<any>([]);
  const router = useRouter();
  const { getUser } = useAuthStore();
  const user = getUser();
  // console.log(user);
  if(!user){
    router.push("/");
    toast.error("Please login to access dashboard");
  }
  const getTasksAssignedToUser = async () => {
    try {
      const res = await api.get("/task/getTasksAssignedToUser");
      const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTasksCreatedByUser = async () => {
    try {
      const res = await api.get("/task/getTasksCreatedByUser");
      const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
      setCreatedTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOverdueTasks = async () => {
    try {
      const res = await api.get("/task/getOverdueTasks");
      const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
      setOverdueTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnStatusChange = () => {
    getTasksAssignedToUser();
    getTasksCreatedByUser();
    getOverdueTasks();
  };

  useEffect(() => {
    getTasksAssignedToUser();
    getTasksCreatedByUser();
    getOverdueTasks();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-950 text-white min-h-screen">
      
      <div className="md:w-72 m-5 md:block lg:w-80">
        <Sidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">My Dashboard</h1>
        <section>
          <h2 className="text-xl md:text-2xl">Tasks Assigned To Me</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tasks.map((task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleOnStatusChange}
              />
            ))}
            {tasks.length === 0 && (
              <p className="text-gray-400">No tasks assigned to you</p>
            )}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl">Tasks Created by Me</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {createdTasks.map((task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleOnStatusChange}
              />
            ))}
            {createdTasks.length === 0 && (
              <p className="text-gray-400">No tasks created by you</p>
            )}
          </div>
        </section>
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl">Overdue Tasks</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {overdueTasks.map((task: any) => (
              <TaskCard
                key={task._id}
                task={task}
                onStatusChange={handleOnStatusChange}
              />
            ))}
            {overdueTasks.length === 0 && (
              <p className="text-gray-400">No overdue tasks</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
