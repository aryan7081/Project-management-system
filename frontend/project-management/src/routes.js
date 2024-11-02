import React from 'react'
import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import SignupPage from './Components/signUp'
import LoginPage from './Components/login'
import Navbar from './Components/navbar'
import SideNavbar from './Components/sideNavbar'
import ProjectDisplay from './Components/projectDisplay'
import BlankProject from './Components/blankProject'

const AppRoutes = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [showSideNav, setShowSideNav] = useState(true)
  console.log("pagalaaaaaaaa",projects)

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setLoginStatus(true);
        }
    }, []);

    const [tasks, setTasks] = useState([])

    const fetchTasks = async (projectId)=> {
        console.log("im clicked")
        console.log(projectId)
        const myHeader = new Headers()
        const token = localStorage.getItem('accessToken')
        if (token){
            myHeader.append("Authorization", `Bearer ${token}`)
        }
        const requestOptions = {
            method: "GET",
            headers: myHeader,
            redirect: 'follow'
        }
        try{
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/task/project/${projectId}`,requestOptions)
            const result = await response.json()
            console.log("ye res",response)
            console.log("ye ayaa result",result)
            setTasks([])
            if (response.status == 200){
              setTasks(result.tasks)
            }
            

        }catch (error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchTasks();

    },[])
    console.log("ye hai tasks",tasks)


    const createProject = async (project) => {
      console.log("Yaha aya tha")
      const myHeader = new Headers()
      myHeader.append("Content-Type","application/json")
      const token = localStorage.getItem("accessToken");
      if (token) {
          myHeader.append("Authorization", `Bearer ${token}`);
      }
      console.log(token)
      const raw = JSON.stringify(project)
      console.log(raw)
      const requestOptions = {
          method: 'POST',
          headers: myHeader,
          body: raw,
          redirect: 'follow'
      }


      try{
          const response = await fetch(`https://project-management-system-dig0.onrender.com/api/projects/create`, requestOptions)
          const result = await response.json()
          console.log(result)
          if (response.status == 201){
              setModalVisible(false)
          }

      }catch (error){
          console.log(error)
      }

  }
  return (
    <div className="app-container flex">
      {
      loginStatus && showSideNav &&
      (<SideNavbar project = {project} setProject = {setProject} fetchTasks = {fetchTasks} projects = {projects} setProjects={setProjects} createProject = {createProject} modalVisible = {modalVisible} setModalVisible = {setModalVisible}/>)
}
      <div className="main-content w-full">
      {loginStatus ?
        <Navbar loginStatus = {loginStatus} setLoginStatus = {setLoginStatus}/>
        :<></>}
        <Routes>
          <Route path="/" element={loginStatus ? (projects.length == 0 ? <BlankProject createProject = {createProject} project = {project} setModalVisible = {setModalVisible}/>:<ProjectDisplay project = {project} fetchTasks = {fetchTasks} tasks = {tasks} setTasks = {setTasks}/>) : <LoginPage setLoginStatus={setLoginStatus}/>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage setLoginStatus={setLoginStatus} />} />
        </Routes>
      </div>
    </div>
  )
}

export default AppRoutes;
