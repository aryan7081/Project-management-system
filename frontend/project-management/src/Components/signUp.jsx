import React, { useState } from "react";

export default function SignupPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {
        
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Signup</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border-2 rounded-md border-gray-300"
                type="text"
                id="username"
                value={user.username}
                placeholder="Username"
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

            <label htmlFor="email">Email</label>
            <input
                className="p-2 border-2 rounded-md border-gray-300"
                type="email"
                id="email"
                value={user.email}
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 border-2 rounded-md border-gray-300"
                type="password" 
                id="password"
                value={user.password}
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button className="p-3 border-1 bg-green-500 mt-5" onClick={onSignup}>Signup here</button>
        </div>
    );
}
