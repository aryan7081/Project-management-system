import React, { useState } from "react";
import  {json, redirect, useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Createproject({closeModal, setModalVisible, fetchProjects, createProject}) {
    const navigate = useNavigate();
    const [project, setProject] = useState({
        name:"",
        description:""
    })
    return (
        <div className="flex flex-col items-start min-h-screen py-2  m-auto h-full justify-center gap-9">
            <div className="flex flex-col gap-7">
                <p className=" text-4xl font-semibold text-[#0D062D]">Create New Project</p>
                <div className="description">
                    <p className="text-[#787486] text-xl font-normal leading-8">Plans are nothing; planning is everything.</p>
                </div>
                
            </div>

            <div className="middle flex flex-col w-full gap-6">
                <div className="flex flex-col items-start gap-2">
                    <label className="text-lg font-normal" htmlFor="projectTitle">Project Title</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="email"
                        id="email"
                        value={project.name}
                        onChange={(e)=> setProject({...project,name:e.target.value})}
                        placeholder="Enter Project Title"

                    />
                </div>
                
                <div className="flex flex-col items-start w-full gap-2">
                    <label className="text-lg font-normal" htmlFor="password">Project Description</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="message" 
                        id="description"
                        value={project.description}
                        onChange={(e)=> setProject({...project,description:e.target.value})}
                        placeholder="Enter a brief description of your project"

                    />
                </div>

                <div className="flex flex-col items-end">
                <button className="flex py-4 justify-center items-center border bg-[#162D3A]  rounded-xl w-full text-center text-[#FFF] text-xl font-medium" onClick={()=>createProject(project)}>Create</button> 
                </div>

                <div className="button w-full text-center flex flex-col gap-6">
                    <button onClick={closeModal} className="flex py-4 justify-center items-center border bg-[#e63a0f] rounded-xl w-full text-center text-[#FFF] text-xl font-medium" >Cancel</button> 
                    
                </div>
                
            </div>
        </div>
    );
}
