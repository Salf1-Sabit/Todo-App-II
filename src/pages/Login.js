import React, { useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url =
      "http://localhost/php-react/register-login-php-simple/login.php";

    const sendData = {
      email: data.email,
      password: data.password,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(sendData),
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("You're successfully logged in!");
        navigate("/");
      } else {
        alert("Sorry! You're credentials are incorrect");
      }
    });
  };

  return (
    <div>
      <div
        style={{
          width: "30%",
          marginLeft: "35%",
          marginTop: "13%",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@gmail.com"
              name="email"
              defaultValue={email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              defaultValue={password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Sign In
          </Button>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Text className="text-muted">
              Don't have an account? Create one
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;
