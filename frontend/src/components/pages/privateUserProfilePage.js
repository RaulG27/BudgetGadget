import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle logout button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  // Styles for the page container
  const pageContainerStyles = {
    backgroundColor: '#6BA57A', // Page background color
    minHeight: '100vh', // Full viewport height
    padding: '20px', // Add some padding around the content
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  };

  // Styles for the content box
  const contentBoxStyles = {
    backgroundColor: '#273A3A', // Box background color
    color: 'white', // Text color for contrast
    padding: '20px', // Add padding inside the box
    borderRadius: '10px', // Rounded corners
    width: '100%', // Full width of the container
    maxWidth: '600px', // Maximum width of the content box
    textAlign: 'center', // Center text
  };

  if (!user) return (
    <div style={pageContainerStyles}>
      <div style={contentBoxStyles}>
        <h4>Log in to view this page.</h4>
      </div>
    </div>
  );

  const { id, email, username, password } = user;

  return (
    <div style={pageContainerStyles}>
      <div style={contentBoxStyles}>
        <h1>Welcome <span className='username'> @{username}</span></h1>
        <h3>Your userId in mongo db is: <span className='userId'> {id}</span></h3>
        <h3>Your registered email is: <span className='email'> {email}</span></h3>
        
        <Button className="me-2" onClick={handleShow}>
          Log Out
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Log Out</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
