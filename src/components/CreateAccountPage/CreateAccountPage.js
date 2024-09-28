import React, { useState } from 'react';
import './CreateAccountPage.css';


const CreateAccountPage = ({ userId }) => {
    const [balance, setBalance] = useState('');

    const handleCreateAccount = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`/user_accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, balance }),
            });

            if (response.ok) {
                const account = await response.json(); // Convert the response to JSON format after account creation
                localStorage.setItem('accountId', account.id);
                console.log(localStorage.getItem('accountId'));// save accountId
                alert('Account created successfully');
            } else {
                alert('Failed to create account');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };


    return (
        <div className="createAccountPage">
            <h2>Create Account</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateAccount();
                }}
            >
                <label>
                    Balance:
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                    />
                </label>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccountPage;
