import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PRIMARY_COLOR = 'rgb(87, 49, 150)';
const SECONDARY_COLOR = 'rgb(228, 208, 143)';
const url = "http://localhost:8081/user/signup";

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState("Light Mode");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  const labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };

  const backgroundStyling = { background: bgColor };

  
  const buttonStyling = {
    background: 'rgb(87, 49, 150)',
    borderStyle: "none",
    color: 'white',
  };

  return (
    <section className="vh-100">
      <Container fluid className="h-100" style={backgroundStyling}>
        <Row className="justify-content-center align-items-center h-100">
          <Col md={8} lg={6} xl={4}>
            <Form onSubmit={handleSubmit} className="p-4 border rounded">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label style={labelStyling}>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={labelStyling}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={labelStyling}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </Form.Group>
    
              {error && (
                <div style={labelStyling} className="pt-3">
                  {error}
                </div>
              )}
              <Button
                variant="primary"
                type="submit"
                style={buttonStyling}
                className="mt-2 w-100"
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
