// /frontend/components/AccountPage.js
import React, { useState } from 'react';
import './AccountPage.css';

const AccountPage = () => {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState('');

    const handleDeposit = () => {
        // Handle deposit logic here
        setBalance(balance + parseFloat(amount));
    };

    const handleWithdraw = () => {
        // Handle withdraw logic here
        setBalance(balance - parseFloat(amount));
    };

    return (
        <div className="userPage">
            <h2>Your Account</h2>
            <p>Balance: ${balance.toFixed(2)}</p>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw}>Withdraw</button>
            <a href="/create-new-account">Create New Account</a>
        </div>
    );
};


export default AccountPage;
