import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({title, description, taskId, setTasks, fetchTasks, projectId, updateTask}) => {
    const deleteTask = async (taskId)=>{
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
            const response = await fetch(`http://localhost:3002/api/task/delete/${taskId}`, requestOptions);
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to delete project');
            }
            setTasks(prevTask => prevTask.filter(task => task.id !== taskId));
            toast("Task Deleted Successfully")
        } catch (error) {
            console.error(error);
        }
    };
    
  return (
    <div className='w-full px-5 py-5 rounded-2xl bg-[#FFF] hover:shadow-2xl hover:duration-150 hover:transition-shadow'>
        <ToastContainer/>
      <div className="top flex justify-between gap-1">
        <p className="priority px-2 py-1 text-[#D58D49] text-xs font-medium bg-[#DFA874] bg-opacity-[0.2] rounded-md">Low</p>
        {/* <p onClick={()=> updateTask(taskId)} className="option cursor-pointer
        ">Done mark</p> */}
        <p onClick={()=> deleteTask(taskId)} className="option cursor-pointer text-red-500 hover:text-lg text-right">Delete</p>
      </div>
      <div className="content flex justify-between">
        <div className='flex flex-col gap-2'>
        <div className="title text-[#0D062D]">{title}</div>
        <div className="text-[#787486] text-xs font-normal">{description}</div>
        </div>
        <div>
          <p onClick={()=> updateTask(taskId,'isCompleted')} className="option cursor-pointer text-green-500 hover:text-lg text-right">Done</p>
          <p onClick={()=> updateTask(taskId,'inProgress')} className="option cursor-pointer text-yellow-600 hover:text-lg text-right">Picked</p>
        </div>
      </div>

      
    </div>
  )
}

export default Card;
