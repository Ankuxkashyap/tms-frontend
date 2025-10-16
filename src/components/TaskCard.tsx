import { SlOptions } from "react-icons/sl";
import { useAuthStore } from "@/store/auth";
import { FaDeleteLeft, FaRegCircleCheck } from "react-icons/fa6";
import api from "@/lib/api/api";
import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";


type Task = {
    title:string;
    _id:number;
    description:string;
    status:string;
    createdBy:{
        _id: number;
        name: string;
        email: string;
    };
    assignedTo:{
        _id: number;
        name: string;
        email: string;
    };
    dueDate:Date;
    priority:string;

}

type TaskProps = {
    task :Task
    onStatusChange:() => void
}

const TaskCard = ({task,onStatusChange}:TaskProps) =>{
    const [opctions,setOptions] = React.useState(false);
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const date = new Date(task.dueDate).toLocaleDateString();

    const handleClick = async(taskId:number) :Promise<void> => {
        try{
            const res = await api.put(`/task/update/${taskId}`,{status:"COMPLETED"});
            toast.success(res.data.message);
            onStatusChange();
        }catch(err){
            console.log(err);
        }
    }
    const handleDelete = async(taskId:number)=>{
        try{
            const res = await api.delete(`/task/delete/${taskId}`);
            toast.success(res.data.message);
            onStatusChange();
        }catch(err){
            console.log(err);
        }
    }

    const handleEdit = async(taskId:number)=>{
        router.push(`tasks/edit/${taskId}`);
    }

    const handleBlur = ()=>{
        setTimeout(()=>{
            setOptions(false);
        },200)
    }
    

    return(
        <div className="bg-gray-950 relative rounded-lg shadow shadow-gray-600 p-4 border border-gray-700 hover:scale-105 transition">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3">
                    <h1 className="text-xl font-bold">{task.title}</h1>   
                    <p className={`${task.priority=="MEDIUM" && "bg-blue-300 text-blue-700"} ${task.priority=="HIGH" && "bg-orange-200 text-orange-700"} ${task.priority=="LOW" && "bg-green-700 text-green-300"}bg-gray-400 font-semibold px-2 rounded`}>{task.priority}</p>
                </div>

                <button 
                className="cursor-pointer" 
                onClick={()=>{setOptions(!opctions)}}
                >
                    <i><SlOptions />
                </i></button>
                {opctions && (
                    <div
                    onBlur={handleBlur}
                     className="absolute items-center  right-5 top-6 mt-2 w-28 h-20 bg-gray-900 rounded-lg shadow-lg ">
                    <div className="flex w-full border-b mt-1 border-gray-700  hover:bg-gray-800  items-center justify-center">
                        <button
                        className="flex items-center gap-3 p-1 text-lg  text-gray-300 cursor-pointer"
                        onClick={() => handleEdit(task._id)}
                        >
                         Edit <i className="text-lg"><FaEdit/></i>   
                        </button>
                    </div>
                    
                    <div className=" flex w-full  items-center justify-center hover:bg-gray-800">
                        <button
                        className="flex items-center gap-3 p-1 text-lg text-red-600   cursor-pointer"
                        onClick={() => handleDelete(task._id)}
                        >
                         Delete <i className="text-xl"><MdDelete/></i>   
                        </button>
                    </div>
                </div>
                )}
            </div>
            <div className="flex flex-row gap-3 mt-2">
                <p className={`${task.status=="COMPLETED" && "bg-green-200 text-green-700"} ${task.status=="PENDING" && "bg-red-200 text-red-700"} ${task.status=="IN_PROGRESS" && "bg-gray-300 text-gray-700"} bg-gray-400 font-semibold px-2 rounded `}>{task.status}</p>
                <p>{date}</p>
            </div>
            <div className="relative m-2 mt-8 w-full">
                <div
                    className={`${
                    task.status === "IN_PROGRESS"
                        ? "absolute z-1 border-b-4 w-1/2 border-green-500"
                        : "hidden"
                    }`}
                ></div>
                <div
                    className={`border-b-4 w-full mr-4 ${
                    task.status === "COMPLETED"
                        ? "border-green-500"
                        : task.status === "PENDING"
                        ? "border-white"
                        : task.status === "IN_PROGRESS"
                        ? "border-white-500 w-1/2"
                        : ""
                    }`}
                ></div>
                </div>
                <p className="text-sm text-gray-400 my-5">{task.description}</p>

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-700">
                        {task?.createdBy?.name === user?.name
                        ? "Me"
                        : task?.createdBy?.name
                        ? task.createdBy.name[0]
                        : "?"}
                        </div>
                    <h1 className="text-sm">Created By {task.createdBy.name==user?.name ?  "Me" : task.createdBy.name}</h1>
                </div>
                <button
                onClick={() =>handleClick(task._id)}
                className="bg-gray-700 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-600 transition items-center flex gap-1"><i><FaRegCircleCheck/></i>Mark Completed</button>
            </div>
        </div>
    )
}
export default TaskCard