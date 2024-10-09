import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getUserInfo from '../utilities/decodeJwt';
import { FaHome, FaTachometerAlt, FaUser, FaGithub } from 'react-icons/fa';
import { CiLogin } from "react-icons/ci";

const sidebarStyles = {
  height: '100%',
  width: '150px', // Reduced width
  position: 'fixed',
  top: '0',
  left: '-150px', // Hide sidebar initially
  backgroundColor: '#2C3E50',
  color: 'white',
  transition: '0.2s',
  zIndex: '1000',
  overflow: 'auto',
  paddingTop: '20px', // Reduced padding
  borderTopRightRadius: '10px',
  borderBottomRightRadius: '10px',
  background: 'linear-gradient(to right, #2C3E50, rgba(44, 62, 80, 0.9))',
  boxShadow: '0px 0 20px rgba(0,0, 0, 0.7)',
};

const sidebarShowStyles = {
  left: '0',
};

const buttonStyles = {
  fontSize: '25px',
  cursor: 'pointer',
  backgroundColor: '#2C3E50',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  position: 'fixed',
  top: '10px',
  left: '10px',
  zIndex: '1001',
  borderRadius: '10px',
};

const linkStyles = {
  padding: '10px 10px', // Reduced padding
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  transition: '0.3s',
  marginBottom: '20px', // Reduced bottom margin
  position: 'relative',
  borderRadius: '5px',
  fontSize: '16px', // Reduced font size
  marginTop: '45px',
};

const linkHoverStyles = {
  backgroundColor: '#1C1C1C',
};

const iconStyles = {
  marginRight: '10px', // Reduced space between icon and text
  fontSize: '40px', // Reduced icon size
};

const activeLinkStyles = {
  backgroundColor: 'rgba(28, 28, 28, 0.55)',
  color: 'lightgray',
};

export default function Navbar() {
  const [, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getLinkStyle = (path) => {
    return location.pathname === path ? activeLinkStyles : {};
  };

  return (
    <>
      <button style={buttonStyles} onClick={toggleSidebar}>
        ☰
      </button>
      <div style={{ ...sidebarStyles, ...(isOpen ? sidebarShowStyles : {}) }}>
        <a href="https://github.com/RaulG27/BudgetGadget" style={{ ...linkStyles }} onClick={toggleSidebar}>
          <FaGithub style={iconStyles} /> BudgetGadget
        </a>

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
