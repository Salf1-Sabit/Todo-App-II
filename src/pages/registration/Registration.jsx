import React, { useState } from "react";

import Nav from "../../components/Nav/Nav";

import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      "http://localhost/php-react/register-login-php-simple/insert.php";

    const sendData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(sendData),
    })
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        console.log(data);
        navigate("/Login");
      });
  };

  return (
    <div>
      <Nav />
      <div
        style={{
          width: "30%",
          marginLeft: "35%",
          marginTop: "10%",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Enter your first Name"
              defaultValue={firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="firstName"
              name="lastName"
              placeholder="Enter your last Name"
              defaultValue={lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@gmail.com"
              defaultValue={email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="By signing up you agree to our Terms and conditions and Privacy Policy"
            />
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Sign Up
          </Button>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Text className="text-muted">
              Already have an account? Sign In
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
