"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TaskCard from "@/components/TaskCard";
import api from "@/lib/api/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState<any>([]);
  const [createdTasks, setCreatedTasks] = useState<any>([]);
  const [overdueTasks, setOverdueTasks] = useState<any>([]);

  const getTasksAssignedToUser = async () => {
    const res = await api.get("/task/getTasksCreatedByUser");
    const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
    setTasks(data);
  };

  const getTasksCreatedByUser = async () => {
    const res = await api.get("/task/getTasksCreatedByUser");
    const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
    setCreatedTasks(data);
  };

  const getOverdueTasks = async () => {
    const res = await api.get("/task/getOverdueTasks");
    const data = Array.isArray(res.data) ? res.data : res.data.tasks || [];
    setOverdueTasks(data);
  };

  useEffect(() => {
    getTasksAssignedToUser();
    getTasksCreatedByUser();
    getOverdueTasks();
  }, []);

  return (
    <div className="flex flex-row bg-gray-950 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-80 p-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

        <h2 className="text-2xl">Tasks Assigned To Me</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {tasks.map((task: any) => (
            <TaskCard key={task._id} task={task} />
          ))}
          {tasks.length === 0 && (
            <p className="text-gray-400">No tasks assigned to you</p>
          )}
        </div>

        <h2 className="text-2xl my-10">Tasks Created by Me</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {createdTasks.map((task: any) => (
            <TaskCard key={task._id} task={task} />
          ))}
          {createdTasks.length === 0 && (
            <p className="text-gray-400">No tasks created by you</p>
          )}
        </div>

        <h2 className="text-2xl my-10">Overdue Tasks</h2>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {overdueTasks.map((task: any) => (
            <TaskCard key={task._id} task={task} />
          ))}
          {overdueTasks.length === 0 && (
            <p className="text-gray-400">No overdue tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
