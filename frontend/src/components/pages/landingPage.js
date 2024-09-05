import React from 'react';
import Card from 'react-bootstrap/Card';

const Landingpage = () => {
    // Styles for the page container
    
    const pageContainerStyles = {
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        height: '100vh', // Full viewport height
        backgroundColor: '#6BA57A', // Background color for the entire page
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
    };

    // Styles for the content box
    const contentBoxStyles = {
        backgroundColor: '#273A3A', // Box background color
        padding: '20px', // Padding inside the box
        borderRadius: '10px', // Rounded corners for the box
        width: '100%', // Full width of the container
        maxWidth: '800px', // Maximum width of the box
        color: 'white', // Text color for contrast
    };

    // Styles for the card
    const cardStyles = {
        backgroundColor: '#273A3A', // Card background color
        color: 'white', // Text color to contrast with background
        borderRadius: '10px', // Rounded corners for the card
        border: 'none', // Remove default border
    };

    return (
        <div style={pageContainerStyles}>
            <div style={contentBoxStyles}>
                <Card style={cardStyles} className="mx-2 my-2">
                    <Card.Body>
                        <Card.Title>BudgetGadget</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">An Open Source finance management solution.</Card.Subtitle>
                        <Card.Text>
                        </Card.Text>
                        <Card.Link href="/signup">Sign Up</Card.Link>
                        <Card.Link href="/login">Login</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Landingpage;
