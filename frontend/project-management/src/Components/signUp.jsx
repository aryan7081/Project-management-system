import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SignupPage() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {
        const myHeader = new Headers()
        myHeader.append("Content-Type","application/json")
        const raw = JSON.stringify(user)
        const requestOptions = {
            method:"POST",
            headers:myHeader,
            body: raw,
            redirect: "follow"
        } 
        try{
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/users/signup`,requestOptions)
            console.log("ye hai status",response.status==200)
            const result = await response.json();
            setMessage(result.message)
            if (response.status == 200){
                console.log("redirected")
                toast("Signup Successful")
                setTimeout(()=>{
                    navigate('/login')
                },2000)
                
            }else{
                toast(`result.message`)
                console.log("not redirected")
            }
        

        }catch (error){
            console.log(error)
        }
        
    };

    return (
        <div className="h-screen flex">
        <div className="flex flex-col items-start w-1/3 m-auto justify-center gap-9 bg-[#F5F5F5] px-6 rounded md py-10">
            <ToastContainer/>
            <div className="flex flex-col gap-7">
                <p className=" text-4xl font-semibold text-[#0D062D]">Create an account ✨</p>
                <div className="description">
                    <p className="text-[#787486] text-xl font-normal leading-8">Every project is a journey. Start yours</p>
                    <p className="text-[#787486] text-xl font-normal leading-8">with a new account!</p>
                </div>
                
            </div>

            <div className="middle flex flex-col w-full gap-6">
                <div className="flex flex-col items-start gap-2">
                    <label className="text-lg font-normal" htmlFor="email">Username</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="email"
                        id="username"
                        value={user.username}
                        placeholder="Username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>

                <div className="flex flex-col items-start gap-2">
                    <label className="text-lg font-normal" htmlFor="email">Email</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="email"
                        id="email"
                        value={user.email}
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                
                <div className="flex flex-col items-start w-full gap-2">
                    <label className="text-lg font-normal" htmlFor="password">Password</label>
                    <input
                        className="p-2 border-2 rounded-md border-gray-300 w-full"
                        type="password" 
                        id="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                <div className="flex flex-col items-end">
                    <p className="text-[#313957] text-lg font-normal w-full">Already have an account?<span> </span> 
                        <Link to="/login">
                            <span className="text-[#1E4AE9] underline cursor-pointer">Login</span>
                        </Link>
                    </p>  
                </div>

                <div className="button w-full">
                    <button className="flex py-4 justify-center items-center border bg-[#162D3A] rounded-xl w-full text-center text-[#FFF] text-xl font-medium" onClick={onSignup}>Sign up</button>   
                </div>
                
            </div>


            
        </div>
        </div>
    );
}
