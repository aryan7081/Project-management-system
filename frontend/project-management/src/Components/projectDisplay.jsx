import React, { useEffect, useState } from 'react'
import Card from './taskCard'
import todo from '../assets/icons/todo.svg'
import todoCreate from '../assets/icons/todoCreate.svg'
import progress from '../assets/icons/progress.svg'
import done from '../assets/icons/done.svg'
import vectorTodo from '../assets/icons/vectorTodo.svg'
import vectorProgress from '../assets/icons/vectorOnProgress.svg'
import vectorDone from '../assets/icons/vectorDone.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import CreateTaskModal from './createTaskModal'
const ProjectDisplay = ({project, tasks, fetchTasks, setTasks}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const updateTask = async (taskId, updateValue)=>{

        console.log("ye value hai",updateValue)
        const myHeader = new Headers()
        myHeader.append('Content-Type', 'application/json');
        const token = localStorage.getItem('accessToken')
        const raw = JSON.stringify({
            "isCompleted": updateValue == 'isCompleted' ? true:false,
            "inProgress": updateValue == 'inProgress' ? true:false,
          });
        if (token){
            myHeader.append('Authorization', `Bearer ${token}`)
        }
        const requestOptions = {
            method:'PUT',
            headers:myHeader,
            body: raw,
            redirect:'follow',
            
        }
        try{
            console.log("ye ja rha hai id",taskId)
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/task/update/${taskId}`,requestOptions)
            const result  = await response.json()
            console.log(result)

        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className='px-6 py-10 w-full flex flex-col gap-10 pt-28'>
      <div className="top">
        <div className="title">
            <p className='text-[#0D062D] text-5xl font-semibold'>{project.name}</p>
        </div>
      </div>

      <div className="tasks flex gap-4 w-full">
        <div className="todo w-full bg-[#F5F5F5] rounded-md pb-5 px-6">
            <div className="top w-full">
            <div className="px-3 py-3 bg-opacity-[0.08] flex items-center justify-between rounded-md w-full">
                    <div className="flex items-center justify-center gap-4">
                        <img src={todo} alt="statusIcon" className="status" />
                        <p className="projectName text-[#0D062D] text-base font-semibold">To Do</p>
                        
                    </div>
                    <img className='cursor-pointer' onClick={()=> setModalVisible(true)} src={todoCreate} alt="" />
                    
                </div>
            </div>
            <p className='flex justify-center items-center py-6'>
                <img src={vectorTodo} alt="" />
            </p>
            <div className='flex flex-col gap-6'>
            {tasks ? tasks.map((task) => (
                
            <div key={task.id} className="taskList flex flex-col items-center gap-5">
                
                {!task.inProgress && !task.isCompleted &&
                    <Card title = {task.title} description = {task.description} taskId = {task.id} setTasks = {setTasks} fetchTasks = {fetchTasks} projectId = {project.id} updateTask = {updateTask}/>}
            </div>
            )) : <></>}  
            </div>
        </div>


        <div className="progress w-full bg-[#F5F5F5] rounded-md pb-5 px-6">
        <div className="top w-full">
            <div className="px-3 py-3 bg-opacity-[0.08] flex items-center justify-between rounded-md w-full">
                    <div className="flex items-center justify-center gap-4">
                        <img src={progress} alt="statusIcon" className="status" />
                        <p className="projectName text-[#0D062D] text-base font-semibold">On Progress</p>
                        
                    </div>
                    
                </div>
            </div>
            <p className='flex justify-center items-center py-6'>
                <img src={vectorProgress} alt="" />
            </p>

            <div className='flex flex-col gap-6'>
            {tasks ? tasks.map((task) => (
                
            <div key={task.id} className="taskList flex flex-col items-center gap-5">
                
                {task.inProgress && 
                    <Card title = {task.title} description = {task.description} taskId = {task.id} setTasks = {setTasks} fetchTasks = {fetchTasks} projectId = {project.id} updateTask = {updateTask}/>}
            </div>
            )) : <></>}  
            </div>
        </div>


        <div className="done w-full bg-[#F5F5F5] rounded-md pb-5 px-6">
        <div className="top w-full">
            <div className="px-3 py-3  bg-opacity-[0.08] flex items-center justify-between rounded-md w-full">
                    <div className="flex items-center justify-center gap-4">
                        <img src={done} alt="statusIcon" className="status" />
                        <p className="projectName text-[#0D062D] text-base font-semibold">Done</p>
                        
                    </div>
                    
                </div>
            </div>
            <p className='flex justify-center items-center py-6'>
                <img src={vectorDone} alt="" />
            </p>

            <div className='flex flex-col gap-6'>
            {tasks ? tasks.map((task) => (
                
            <div key={task.id} className="taskList flex flex-col items-center gap-5">
                
                {task.isCompleted && 
                    <Card title = {task.title} description = {task.description} taskId = {task.id} setTasks = {setTasks} fetchTasks = {fetchTasks} projectId = {project.id} updateTask = {updateTask}/>}
            </div>
            )) : <></>}  
            </div>
        </div>
      </div>
      <Modal isOpen ={modalVisible} className=" backdrop-blur-sm border px-6 w-1/3 m-auto">
                <CreateTaskModal setModalVisible={setModalVisible} project={project} fetchTasks = {fetchTasks} projectId = {project.id}/>
      </Modal>
    </div>
  )
}

export default ProjectDisplay
