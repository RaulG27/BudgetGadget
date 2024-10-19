import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getUserInfo from '../utilities/decodeJwt';
import { FaHome, FaUser, FaGithub } from 'react-icons/fa';
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const [user, setUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const iconStyles = {
    fontSize: '30px', // Adjust icon size
    color: 'white',
  };

  const activeIconStyles = {
    color: 'lightgray', // Color for the active link
  };

  const getLinkStyle = (path) => {
    return location.pathname === path ? activeIconStyles : {};
  };

  return (
    <>
      <div className="navbar">
        <a href="/" style={getLinkStyle('/')} >
          <CiLogin style={iconStyles} />
        </a>
        <a href="/home" style={getLinkStyle('/home')} >
          <FaHome style={iconStyles} />
        </a>
        <a href="/privateUserProfile" style={getLinkStyle('/privateUserProfile')} >
          <FaUser style={iconStyles} />
        </a>
        <a href="https://github.com/RaulG27/BudgetGadget">
          <FaGithub style={iconStyles} />
        </a>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          left: 0;
          right: 0;
          background-color: #1a1a1a;
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        @media (min-width: 768px) { /* Adjust this breakpoint as needed */
          .navbar {
            top: 0; /* Position at the top for desktop */
          }
        }
        @media (max-width: 768px) { /* Adjust this breakpoint as needed */
          .navbar {
            bottom: 0; /* Position at the bottom for mobile */
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
