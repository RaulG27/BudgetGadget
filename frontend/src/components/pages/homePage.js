import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    
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

    // Container styles with dynamic size
    const boxStyles = (size,index) => ({
        width: size.width,
        height: size.height,
        backgroundColor: index === 3 ? '#113D3D' : '#273A3A', // Background color for Container 4
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px', // Space between containers
        borderRadius: '10px', // Rounded corners
         marginTop: size.marginTop || '10px'
    });

    // Container sizes
    const sizes = [
        { width: '500px', height: '250px', marginTop:'155px' }, // Container 1
        { width: '500px', height: '300px' }, // Container 2
        { width: '500px', height: '250px' }, // Container 3
        { width: '700px', height: '100px', marginTop: '-335px' }, // Container 4
        { width: '700px', height: '200px' }, // Container 5
        { width: '700px', height: '250px' }, // Container 6
        { width: '600px', height: '400px', marginTop:"135px" }, // Container 7
        { width: '600px', height: '400px' }, // Container 8
    ];

    // Define styles for the container groups
    const groupStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px',
    };

    // Group container indices
    const group1 = [0, 1, 2]; // First 3 containers
    const group2 = [3, 4, 5]; // Next 3 containers
    const group3 = [6, 7];    // Last 2 containers

    // Conditional rendering based on user data
    if (!user) {
        return (
            <div style={containerStyles}>
                <h4>Log in to view this page.</h4>
            </div>
        );
    }

    return (
        <div style={containerStyles}>
            {/* Render containers in groups */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <div style={groupStyles}>
                    {group1.map((index) => (
                        <div key={index} style={boxStyles(sizes[index])}>
                            Container {index + 1}
                        </div>
                    ))}
                </div>
                <div style={groupStyles}>
                    {group2.map((index) => (
                        <div key={index} style={boxStyles(sizes[index])}>
                            Container {index + 1}
                        </div>
                    ))}
                </div>
                <div style={groupStyles}>
                    {group3.map((index) => (
                        <div key={index} style={boxStyles(sizes[index])}>
                            Container {index + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
