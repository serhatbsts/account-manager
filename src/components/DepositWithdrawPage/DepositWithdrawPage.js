import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DepositWithdrawPage.css';

const DepositWithdrawPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, type } = location.state || {};
    const [amount, setAmount] = useState('');

    const handleTransaction = async () => {
        const accountId = localStorage.getItem('accountId');
        if (!accountId) {
            alert("Account information is missing.");
            return;
        }

        const endpoint = type === 'deposit' ? `/user_accounts/deposit/${accountId}` : `/user_accounts/withdrawal/${accountId}`;
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [type + 'Amount']: amount }),
        });

        if (response.ok) {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successful`);
            navigate('/userPage', { state: { user } });
        } else {
            const responseData = await response.json(); // Get error message in JSON format
            alert(responseData.message || `Failed to ${type}`); // Show error message with alert
        }
    };


    return (
        <div className="depositWithdrawPage">
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Amount to ${type}`}
            />
            <button onClick={handleTransaction}>{type.charAt(0).toUpperCase() + type.slice(1)}</button>
        </div>
    );
};

export default DepositWithdrawPage;
