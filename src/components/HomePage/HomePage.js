import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to Account Manager</h1>
            <div className="buttons">
                <a href="/login">Login</a>
                <a href="/createUser">Create User</a>
            </div>
        </div>
    );
};

export default HomePage;
