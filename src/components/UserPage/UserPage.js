import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './UserPage.css';

const UserPage = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const { user } = location.state || {}; // Get user information from location status
    const [account,setAccount]=useState(null);

    useEffect(() => {
        if(user){
            fetch(`/user_accounts?userId=${user.id}`)
                .then(response=>response.json())
                .then(data=>setAccount(data[0]||null))
                .catch(error=>console.error('Error fetching account:',error));
        }
    }, [user]);
    const handleCreateAccount=()=>{
        navigate('/createAccount',{state:{userId:user.id}});
    };
    const handleEdit=()=>{
        navigate(`/editPage`,{state:{user}});
    };

    const handleDeposit=()=>{
        navigate('/depositWithdraw',{state:{user,type:'deposit'}});
    };
    const handleWithdrawal=()=>{
      navigate('/depositWithdraw',{state:{user,type:'withdrawal'}});
    };
    const handleDeleteUser = async () => {
        if (!user || !user.id) {
            alert('User ID is not available');
            return;
        }

        try {
            const response = await fetch(`/users/${user.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('User deleted successfully');
                navigate('/'); // Ana sayfaya yönlendir
            } else {
                const responseData = await response.json();
                alert(responseData.message || 'Failed to delete the user');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };


    if (!user) {
        return <div className="userPage"><p>No user data available</p></div>;
    }

    return (
        <div className="userPage">
            <h1>Welcome, {user.name}!</h1>
            <div className="userDetails">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.name}</p>
                <p><strong>Sur Name:</strong> {user.surName}</p>
                <p><strong>Account Number:</strong> {account ? account.accountNumber : 'No account found'}</p>
                <p><strong>Balance:</strong> {account ? account.balance : 'No account found'}</p>
            </div>  {account ? (
            <div className="accountActions">
                <button className="depositButton" onClick={handleDeposit}>Deposit</button>
                <button className="withdrawalButton" onClick={handleWithdrawal}>Withdraw</button>
            </div>
        ) : (
            <button className="createAccountButton" onClick={handleCreateAccount}>Create Account</button>
        )}
            <button className="editButton" onClick={handleEdit}>Edit</button>
            <button className="deleteButton" onClick={handleDeleteUser}>Delete</button>
        </div>
    );
};

export default UserPage;
