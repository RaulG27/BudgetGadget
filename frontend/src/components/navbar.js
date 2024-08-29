import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';

// Define the CSS styles in a JavaScript object
const sidebarStyles = {
  height: '100%',
  width: '250px', // Adjust width as needed
  position: 'fixed',
  top: '0',
  left: '-250px', // Hide sidebar initially
  backgroundColor: '#343a40', // Dark background
  color: 'white',
  transition: '0.3s', // Smooth transition
  zIndex: '1000', // Ensure it stays on top
  overflow: 'auto',
  paddingTop: '60px', // Space for the toggle button
  borderRadius: '10px'
};

const sidebarShowStyles = {
  left: '0', // Show sidebar when class is added
};

const buttonStyles = {
  fontSize: '20px',
  cursor: 'pointer',
  backgroundColor: '#343a40',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  position: 'fixed',
  top: '20px',
  left: '20px',
  zIndex: '1001',
};

const linkStyles = {
  padding: '10px 15px',
  textDecoration: 'none',
  color: 'white',
  display: 'block',
  transition: '0.3s',
};

const linkHoverStyles = {
  backgroundColor: '#495057', // Highlight on hover
};

export default function Navbar() {
  const [, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button style={buttonStyles} onClick={toggleSidebar}>
        ☰
      </button>
      <div style={{ ...sidebarStyles, ...(isOpen ? sidebarShowStyles : {}) }}>
        <a href="/" style={{ ...linkStyles, ':hover': linkHoverStyles }} onClick={toggleSidebar}>Start</a>
        <a href="/home" style={{ ...linkStyles, ':hover': linkHoverStyles }} onClick={toggleSidebar}>Home</a>
        <a href="/privateUserProfile" style={{ ...linkStyles, ':hover': linkHoverStyles }} onClick={toggleSidebar}>Profile</a>
      </div>
    </>
  );
}
