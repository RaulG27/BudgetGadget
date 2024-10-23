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
        <a href="/" style={getLinkStyle('/')} className="nav-link">
          <CiLogin style={iconStyles} />
          <span className="nav-text">Login/Sign-up</span>
        </a>
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

      <style jsx>{`
        .navbar {
          position: fixed;
          display: flex;
          justify-content: space-around;
          background-color: #333333;
          padding: 10px;
          box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .nav-link {
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
          padding: 10px;
        }

        .nav-text {
          display: none;
          margin-left: 10px;
          font-size: 16px;
        }

        @media (min-width: 768px) {
          .navbar {
            top: 0;
            bottom: auto;
            left: 0;
            flex-direction: column;
            height: 100vh;
            width: 200px;
            padding: 20px 0;
            justify-content: flex-start;
            align-items: flex-start;
          }

          .nav-link {
            justify-content: flex-start;
            width: 100%;
            padding: 15px;
          }

          .nav-text {
            display: inline-block;
          }
        }

        @media (max-width: 767px) {
          .navbar {
            bottom: 0;
            top: auto;
            left: 0;
            right: 0;
            height: 60px;
            flex-direction: row;
            justify-content: space-around;
          }

          .nav-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
