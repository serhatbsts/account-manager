import React, { useState } from 'react';
import './LoginPage.css';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate=useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: parseInt(password, 10)
                })
            });

            if (response.ok) {
                const data = await response.json(); // Yanıtı bir kez oku
                localStorage.setItem('userId', data.id);
                setMessage("Giriş Başarılı");
                navigate('/userPage', { state: { user: data } }); // Kullanıcı verilerini yönlendir
            } else {
                const errorData = await response.json(); // Hata durumunda yanıtı oku
                setMessage(errorData.message || "Eposta veya şifre hatalı!!!");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
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
