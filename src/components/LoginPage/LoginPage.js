import React, { useState } from 'react';
import './LoginPage.css';
import {preReleaseNumber} from "@mui/material";

const LoginPage = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (response.ok) {
            const user = await response.json();
            alert('Login successful');
            // Hesap sayfasına yönlendirin
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
