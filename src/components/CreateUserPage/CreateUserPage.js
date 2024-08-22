import React, { useState } from 'react';
import './CreateUserPage.css';

const CreateUserPage = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        name: false,
        surName: false,
        password: false,
        confirmPassword: false
    });

    const handleCreateAccount = async () => {
        let hasError = false;
        const newErrors = { ...errors };

        // Check for empty fields
        if (!email || !name || !surName || !password || !confirmPassword) {
            newErrors.email = !email;
            newErrors.name = !name;
            newErrors.surName = !surName;
            newErrors.password = !password;
            newErrors.confirmPassword = !confirmPassword;
            setErrors(newErrors);
            setError('Please fill in all fields');
            hasError = true;
        } else {
            setErrors({
                email: false,
                name: false,
                surName: false,
                password: false,
                confirmPassword: false
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            hasError = true;
        }

        if (hasError) return;

        try {
            // Check if email is already registered
            const emailCheckResponse = await fetch('/users/checkEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (emailCheckResponse.status === 409) {
                setError('Email is already registered');
                return;
            } else if (!emailCheckResponse.ok) {
                setError('Failed to check email');
                return;
            }

            // Create user
            const response = await fetch('/users/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, surName, password }),
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
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: errors.email ? 'red' : 'initial' }}
            />
            <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderColor: errors.name ? 'red' : 'initial' }}
            />
            <input
                type="text"
                placeholder="Sur Name"
                value={surName}
                onChange={(e) => setSurName(e.target.value)}
                style={{ borderColor: errors.surName ? 'red' : 'initial' }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ borderColor: errors.password ? 'red' : 'initial' }}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ borderColor: errors.confirmPassword ? 'red' : 'initial' }}
            />
            <button onClick={handleCreateAccount}>Create User</button>
        </div>
    );
};

export default CreateUserPage;
