import { SlOptions } from "react-icons/sl";
import { useAuthStore } from "@/store/auth";
import { FaRegCircleCheck } from "react-icons/fa6";



type Task = {
    title:string;
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
}

const TaskCard = ({task}:TaskProps) =>{
    const user = useAuthStore((state) => state.user);
    const date = new Date(task.dueDate).toLocaleDateString();
    return(
        <div className="bg-gray-950 rounded-lg shadow shadow-gray-600 p-4 border border-gray-700 hover:scale-105 transition">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3">
                    <h1 className="text-xl font-bold">{task.title}</h1>   
                    <p className={`${task.priority=="MEDIUM" && "bg-blue-300 text-blue-700"} ${task.priority=="HIGH" && "bg-orange-200 text-orange-700"} ${task.priority=="LOW" && "bg-green-300 text-green-700"}bg-gray-400 font-semibold px-2 rounded`}>{task.priority}</p>
                </div>
                <button className="cursor-pointer"><i><SlOptions /></i></button>    
            </div>
            <div className="flex flex-row gap-3 mt-2">
                <p className={`${task.status=="COMPLETED" && "bg-green-200 text-green-700"} ${task.status=="PENDING" && "bg-red-200 text-red-700"} ${task.status=="INPROGRESS" && "bg-gray-300 text-gray-700"} bg-gray-400 font-semibold px-2 rounded `}>{task.status}</p>
                <p>{date}</p>
            </div>
            <div className={`border-b-4  m-2 mt-8 ${task.status=="COMPLETED" && " border-green-500"} ${task.status=="PENDING" && "border-white"} ${task.status=="INPROGRESS" && "border-none bg-gradient-to-r from-green-500 to-white"}`}></div>
            <p className="text-sm text-gray-400 my-5">{task.description}</p>

            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-2 items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gray-700">{task.createdBy.name==user?.name ?  "Me" : task.createdBy.name[0]}</div>
                    <h1 className="text-sm">Task Created By {task.createdBy.name==user?.name ?  "Me" : task.createdBy.name}</h1>
                </div>
                <button className="bg-gray-700 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-600 transition items-center flex gap-1"><i><FaRegCircleCheck/></i>Mark Completed</button>
            </div>
        </div>
    )
}
export default TaskCard