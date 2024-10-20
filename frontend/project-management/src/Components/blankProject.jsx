import React from 'react'

const BlankProject = ({createProject, project, setModalVisible}) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className=''>
        <p>You dont have any projects</p>
        <button className="flex py-4 justify-center items-center border bg-[#162D3A]  rounded-xl w-full text-center text-[#FFF] text-xl font-medium" onClick={()=>setModalVisible(true)}>Create</button> 
        </div>
    </div>
  )
}

export default BlankProject;
