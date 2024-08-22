import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

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
            const message = await response.text();
            alert(message);
            // Hesap sayfasına yönlendirin
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
