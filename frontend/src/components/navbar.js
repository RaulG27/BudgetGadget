import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import getUserInfo from '../utilities/decodeJwt';
import { FaHome, FaTachometerAlt, FaUser } from 'react-icons/fa'; // Import the icons
import { CiLogin } from "react-icons/ci";

// Define the CSS styles in a JavaScript object
const sidebarStyles = {
  height: '100%',
  width: '250px', // Adjust width as needed
  position: 'fixed',
  top: '0',
  left: '-250px', // Hide sidebar initially
  backgroundColor: '#273A3A', // Dark background
  color: 'white',
  transition: '0.2s', // Smooth transition
  zIndex: '1000', // Ensure it stays on top
  overflow: 'auto',
  paddingTop: '60px', // Space for the toggle button
  borderTopRightRadius: '10px',
  borderBottomRightRadius:'10px'
};

const sidebarShowStyles = {
  left: '0', // Show sidebar when class is added
};

const buttonStyles = {
  fontSize: '20px',
  cursor: 'pointer',
  backgroundColor: '#273A3A',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  position: 'fixed',
  top: '10px',
  left: '10px',
  zIndex: '1001',
  borderRadius: '10px'
};

const linkStyles = {
  padding: '15px 15px',
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  transition: '0.3s',
  marginBottom: '100px',
  position: 'relative',
  borderRadius: '5px',
  fontSize:'25px'
};

const linkHoverStyles = {
  backgroundColor: '#1C1C1C', // Highlight on hover
};

const iconStyles = {
  marginRight: '25px', // Space between icon and text
  fontSize: '65px',
  height:'110px'
};

// Active link styles
const activeLinkStyles = {
  backgroundColor: 'rgba(28, 28, 28, 0.55)', // Dark bar color with 80% opacity
  color: 'lightgray',
};

export default function Navbar() {
  const [, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Use useLocation to get the current path

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Determine if the link is active
  const getLinkStyle = (path) => {
    return location.pathname === path ? activeLinkStyles : {};
  };

  return (
    <>
      <button style={buttonStyles} onClick={toggleSidebar}>
        ☰
      </button>
      <div style={{ ...sidebarStyles, ...(isOpen ? sidebarShowStyles : {}) }}>
        <a href="/" style={{ ...linkStyles, ...getLinkStyle('/') }} onClick={toggleSidebar}>
          <CiLogin style={iconStyles} /> Landing Page
        </a>
        <a href="/home" style={{ ...linkStyles, ...getLinkStyle('/home') }} onClick={toggleSidebar}>
          <FaHome style={iconStyles} /> Dashboard
        </a>
        <a href="/privateUserProfile" style={{ ...linkStyles, ...getLinkStyle('/privateUserProfile') }} onClick={toggleSidebar}>
          <FaUser style={iconStyles} /> Profile
        </a>
      </div>
    </>
  );
}
