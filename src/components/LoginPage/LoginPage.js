import React, { useState } from 'react';
import './LoginPage.css';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate=useNavigate();

    const handleLogin = async () => {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email:email,
                password:parseInt(password,10)
            })

        });


        if (response.ok) {
            setMessage("Giriş Başarılı");
            const user = await response.json();
            navigate('/userPage',{state:{user}});
            // Hesap sayfasına yönlendirin
        } else {
            setMessage("Eposta veya şifre hatalı!!!");
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            {message && <p className="error-message">{message}</p> }
            <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
