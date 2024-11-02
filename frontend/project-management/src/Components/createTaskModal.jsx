import React, { useState } from "react";
import  {json, redirect, useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateTaskModal({closeModal, setModalVisible, fetchProjects, project, fetchTasks, projectId}) {
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title:"",
        description:"",
        projectId: project.id
    })


    const createTask = async (projectId) => {
        const myHeader = new Headers()
        myHeader.append("Content-Type","application/json")
        const token = localStorage.getItem("accessToken");
        if (token) {
            myHeader.append("Authorization", `Bearer ${token}`);
        }
        console.log(token)
        const raw = JSON.stringify(task)
        console.log("ye raw data", raw)
        console.log(raw)
        const requestOptions = {
            method: 'POST',
            headers: myHeader,
            body: raw,
            redirect: 'follow'
        }


        try{
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/task/create`, requestOptions)
            const result = await response.json()
            console.log(result)
            if (response.status == 201){

                toast("Task Created Successfully")
                setTimeout(()=>{
                    fetchTasks(projectId)
                    setModalVisible(false)
                },2000)
                


            }


        }catch (error){
            console.log(error)
        }

    }


    return (
        <div className="flex flex-col items-start min-h-screen py-2  m-auto h-full justify-center gap-9">
            <ToastContainer/>
            <div className="flex flex-col gap-7">
                <p className=" text-4xl font-semibold text-[#0D062D]">Create New Task</p>
                <div className="description">
                    <p className="text-[#787486] text-xl font-normal leading-8">Plans are nothing; planning is everything.</p>
                </div>
                
            </div>

            <div className="middle flex flex-col w-full gap-6">
                <div className="flex flex-col items-start gap-2">
                    <label className="text-lg font-normal" htmlFor="projectTitle">Task Title</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="task"
                        id="task"
                        value={task.title}
                        onChange={(e)=> setTask({...task,title:e.target.value})}
                        placeholder="Enter Task Title"

                    />
                </div>
                
                <div className="flex flex-col items-start w-full gap-2">
                    <label className="text-lg font-normal" htmlFor="password">Task Description</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="text" 
                        id="task"
                        value={task.description}
                        onChange={(e)=> setTask({...task,description:e.target.value})}
                        placeholder="Enter a brief description of your task"

                    />
                </div>

                <div className="flex flex-col items-end">
                    <button className="flex py-4 justify-center items-center border bg-[#162D3A]  rounded-xl w-full text-center text-[#FFF] text-xl font-medium" onClick={()=>createTask(project.id)}>Create</button> 
                </div>

                <div className="button w-full text-center flex flex-col gap-6">
                    <button onClick={()=>setModalVisible(false)} className="flex py-4 justify-center items-center border bg-[#e63a0f] rounded-xl w-full text-center text-[#FFF] text-xl font-medium" >Cancel</button> 
                    
                </div>
                
            </div>
        </div>
    );
}
