import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        return navigate('/');
    };

    useEffect(() => {
        setUser(getUserInfo());
    }, []);

    // Styles for the content area
    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Full viewport height
        backgroundColor: '#6BA57A', // Background color
        textAlign: 'center', // Center text
        padding: '20px', // Add some padding
    };

    // Styles for individual colored containers
    const boxStyles = {
        width: '200px',
        height: '200px',
        backgroundColor: '#273A3A', // Container background color
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px', // Space between containers
        borderRadius: '10px', // Optional: Add border radius for rounded corners
    };

    // Conditional rendering based on user data
    if (!user) {
        return (
            <div style={containerStyles}>
                <h4>Log in to view this page.</h4>
            </div>
        );
    }

    const { id, email, username, password } = user;

    return (
        <div style={containerStyles}>
            {/* Render 8 containers */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} style={boxStyles}>
                        Container {index + 1}
                    </div>
                ))}
            </div>

            <div>
                <h3>
                    Welcome
                    <span className='username'> @{username}</span>
                </h3>
                <h3>
                    Your userId in mongo db is
                    <span className='userId'> {id}</span>
                </h3>
                <h3>
                    Your registered email is
                    <span className='email'> {email}</span>
                </h3>
                <h3>
                    Your password is
                    <span className='password'> {password} (hashed)</span>
                </h3>
            </div>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
        </div>
    );
};

export default HomePage;
