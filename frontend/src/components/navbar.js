import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getUserInfo from '../utilities/decodeJwt';
import { FaHome, FaUser, FaGithub, FaBars } from 'react-icons/fa';
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const [user, setUser] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const iconStyles = {
    fontSize: '35px', // Adjust icon size
    color: 'white',
  };

  const activeIconStyles = {
    color: 'lightgray', // Color for the active link
  };

  const getLinkStyle = (path) => {
    return location.pathname === path ? activeIconStyles : {};
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar">
        <a href="/home" style={getLinkStyle('/home')} className="nav-link">
          <FaHome style={iconStyles} />
          <span className="nav-text">Home</span>
        </a>
        <a href="/privateUserProfile" style={getLinkStyle('/privateUserProfile')} className="nav-link">
          <FaUser style={iconStyles} />
          <span className="nav-text">Profile</span>
        </a>
        <a href="https://github.com/RaulG27/BudgetGadget" className="nav-link">
          <FaGithub style={iconStyles} />
          <span className="nav-text">GitHub</span>
        </a>
      </div>
      <div className="hamburger-menu" onClick={toggleNavbar}>
        <FaBars style={iconStyles} />
      </div>

      <style jsx>{`
        .hamburger-menu {
          position: fixed;
          top: 10px;
          left: 10px;
          z-index: 1001;
          cursor: pointer;
          display: none; /* Hidden by default */
           background-color: rgb(87, 49, 150);
           border-radius: 3px;
          
        }

        .navbar {
          position: fixed;
          display: flex;
          flex-direction: row;
          background-color: rgb(87, 49, 150);
          padding: 10px;
          box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          width: 100%;
          bottom: 0;
          justify-content: space-around;
          overflow: hidden; /* Prevent content overflow */
        }

        .nav-link {
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
          padding: 5px;
        }

        .nav-text {
          margin-left: 10px;
          font-size: 16px;
        }

        @media (max-width: 767px) {
          .nav-text {
            display: none; /* Hide text on mobile */
          }
        }

        @media (min-width: 768px) {
          .navbar {
            top: 0;
            bottom: auto;
            left: 0;
            height: 100vh;
            flex-direction: column;
            justify-content: flex-start; /* Move items to the bottom */
            pad
            align-items: flex-start;
            transition: transform 0.3s ease; /* Smooth transition for opening */
            transform: translateX(${isOpen ? '0' : '-100%'});
            width: 150px;
            padding-top: 120px; /* Adjust padding to prevent overflow */
          }

          .nav-link {
            justify-content: flex-start;
            width: 100%;
            padding: 10px;
          }

          .nav-text {
            display: inline-block;
          }

          .hamburger-menu {
            display: block; /* Show hamburger on larger screens */
            top: 50px; /* Move to the bottom */
            left: 50px; /* Move a bit more to the right */
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
