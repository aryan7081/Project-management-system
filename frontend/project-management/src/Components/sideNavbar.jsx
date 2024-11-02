import React, { useState, useEffect } from 'react'
import logo from '../assets/icons/logo.svg'
import close from '../assets/icons/close.svg'
import line from '../assets/icons/line.svg'
import home from '../assets/icons/home.svg'
import messages from '../assets/icons/messages.svg'
import tasks from '../assets/icons/tasks.svg'
import members from '../assets/icons/members.svg'
import settings from '../assets/icons/settings.svg'
import create from '../assets/icons/create.svg'
import projectStatus from '../assets/icons/status.svg'
import threeDot from '../assets/icons/threeDot.svg'
import Modal from 'react-modal'
import Createproject from './createProjectModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideNavbar = ({project, setProject, fetchTasks, projects, setProjects, createProject, modalVisible, setModalVisible}) => {
    
    
    const closeModal = ()=>{
        setModalVisible(false)
    }
    const showModal = ()=>{
        setModalVisible(true)
    }

    const fetchProjects = async () => {
        const myHeader = new Headers();
        const token = localStorage.getItem("accessToken");

        if (token) {
            myHeader.append("Authorization", `Bearer ${token}`);
        }

        const requestOptions = {
            method: 'GET',
            headers: myHeader,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/projects`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result)
            setProjects(result.projects);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (projectId)=>{
        const myHeader = new Headers();
        const token = localStorage.getItem("accessToken");
        if (token) {
            myHeader.append("Authorization", `Bearer ${token}`);
        }
        const requestOptions = {
            method: 'DELETE',
            headers: myHeader,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/projects/delete/${projectId}`, requestOptions);
            console.log("eleted",response)
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
            console.log('yea hai list of prssss',projects)
            
            // toast("Project Deleted Successfully")
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjectDetail = async (projectId)=>{
        const myHeader = new Headers();
        const token = localStorage.getItem("accessToken");

        if (token) {
            myHeader.append("Authorization", `Bearer ${token}`);
        }

        const requestOptions = {
            method: 'GET',
            headers: myHeader,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/projects/${projectId}`, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log("see this one",result)
            setProject(result);
            fetchTasks(projectId);
        } catch (error) {
            console.error(error);
        }
    }
    

  return (
    <div className='w-1/4 border-r border-[#DBDBDB]'>
        {/* <ToastContainer/> */}
        <div className="top flex justify-between px-6 py-6 border-b border-[#DBDBDB]">
            <div className="flex gap-2">
                <img src={logo} alt="icon" />
                <p>Project M.</p>
            </div>
            <div className="right flex relative">
                <img className='cursor-pointer' src={close} alt="" />
            </div>
        </div>
        <div className="tasks pt-6 px-6 flex flex-col gap-6">
            <div className="flex gap-5">
                <img src={home} alt="home"/>
                <p className='text-[#787486] text-[16px] font-medium'>Home</p>
            </div>

            <div className="flex gap-5">
                <img src={messages} alt="messageIcon" />
                <p className='text-[#787486] text-[16px] font-medium'>Messages</p>
            </div>

            <div className="flex gap-5">
                <img src={tasks} alt="taskIcon" />
                <p className='text-[#787486] text-[16px] font-medium'>Tasks</p>
            </div>

            <div className="flex gap-5">
                <img src={members} alt="memberIcon" />
                <p className='text-[#787486] text-[16px] font-medium'>Members</p>
            </div>


            <div className="flex gap-5">
                <img src={settings} alt="settingIcon" />
                <p className='text-[#787486] text-[16px] font-medium'>Settings</p>
            </div>
        </div>
        <p className='w-32 m-auto border-b pt-8'>
            
        </p>
        <div className="projects pt-7 flex flex-col gap-5">
            <div className="flex justify-between px-6">
                <p className='text-[#787486] text-xs font-bold'>MY PROJECTS</p>
                <img className=' cursor-pointer' onClick={showModal} src={create} alt="createIcon" />
            </div>

            <div className="projectList px-6 flex flex-col gap-4">
            {projects.map((project) => (
                <div onClick={()=> fetchProjectDetail(project.id)} key={project.id} className="px-3 py-3 bg-[#5030E5] bg-opacity-[0.08] flex items-center justify-between rounded-md cursor-pointer">
                    <div className="flex items-center justify-center gap-4">
                        <img src={projectStatus} alt="statusIcon" className="status" />
                        <p className="projectName text-[#0D062D] text-base font-semibold">{project.name}</p>
                        
                    </div>
                    <p className='pb-2 hover:text-amber-500' onClick={() => deleteProject(project.id)}>...</p>
                    
                    
                </div>
                ))}
            </div>
        </div>

    <Modal isOpen = {modalVisible} className=' backdrop-blur-sm w-1/3 m-auto rounded-md px-6 border'>
        <Createproject closeModal = {closeModal} setModalVisible = {setModalVisible}
        fetchProjects = {fetchProjects} createProject = {createProject}/>
    </Modal>

    
      
    </div>
  )
}

export default SideNavbar;
