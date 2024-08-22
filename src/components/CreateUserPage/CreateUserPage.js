import React, { useState } from 'react';
import './CreateUserPage.css';
import {preReleaseNumber} from "@mui/material";

const CreateUserPage = () => {
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [password, setPassword] = useState(preReleaseNumber);
    const [confirmPassword, setConfirmPassword] = useState(preReleaseNumber);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/users/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, surName, password }),
            });

            if (response.ok) {
                setSuccess(true);
                setError(null);
            } else {
                const responseData = await response.json();
                setError(responseData.message || 'Failed to create account');
                setSuccess(false);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            setSuccess(false);
        }
    };

    return (
        <div className="createUser">
            <h2>Create Account</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Account created successfully!</p>}
            <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Sur Name"
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleCreateAccount}>Create User</button>
        </div>
    );
};

export default CreateUserPage;
