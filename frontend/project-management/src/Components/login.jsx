import React, { useState } from "react";
import  {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage({setLoginStatus}) {
    const navigate = useNavigate();
    const [accessToken, setToken] = useState("")
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const onLogin = async () => {
        
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
            const response = await fetch(`https://project-management-system-dig0.onrender.com/api/users/login`,requestOptions)
            console.log("ye hai status",response.status==200)
            const result = await response.json();
            console.log(result)
            
            if (response.status == 200){
                setToken(result.accessToken)
                localStorage.setItem("accessToken", result.accessToken);
                toast(`${result.message}`)
                setTimeout(() => {
                    setLoginStatus(true)
                    navigate('/'); 
                }, 2000);
                
                
            }else {
                toast.error(`${result.message}`);
            }
        

        }catch (error){
            console.log(error)
            toast.error("Login Failed");
        }
        
    };

    return (
        <div className="h-screen flex">
        <div className="flex flex-col items-start w-1/3 m-auto justify-center gap-9 bg-[#F5F5F5] px-6 rounded-md py-10">
            <ToastContainer/>
            <div className="flex flex-col gap-7">
                <p className=" text-4xl font-semibold text-[#0D062D]">Welcome Back  👋</p>
                <div className="description">
                    <p className="text-[#787486] text-xl font-normal leading-8">Today is a new day. It's your day. You shape it.</p>
                    <p className="text-[#787486] text-xl font-normal leading-8">Sign in to start managing your projects.</p>
                </div>
                
            </div>

            <div className="middle flex flex-col w-full gap-6">
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
                    <p className="text-[#1E4AE9] text-lg font-normal cursor-pointer">Forgot Password?</p>
                </div>

                <div className="button w-full text-center flex flex-col gap-6">
                    <button className="flex py-4 justify-center items-center border bg-[#162D3A] rounded-xl w-full text-center text-[#FFF] text-xl font-medium" onClick={onLogin}>Sign in</button> 
                    
                        <p className="text-[#313957] text-lg font-normal w-full">Don't have an account?<span> </span> 
                            <Link to="/signup">
                                <span className="text-[#1E4AE9] underline cursor-pointer">Signup</span>
                            </Link>
                        </p>  
                    
                </div>
                
            </div>
        </div>
        </div>
    );
}
