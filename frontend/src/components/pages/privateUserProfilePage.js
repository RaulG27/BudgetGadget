import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";

// Link to service
// http://localhost:8096/privateUserProfile

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

  return (
    <div style={pageContainerStyles}>
      <div style={contentBoxStyles}>
        <h1>{user.username}</h1>
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
