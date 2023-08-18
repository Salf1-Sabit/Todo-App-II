import React from "react";

import { Form, Button } from "react-bootstrap";

const Login = () => {
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
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="By signing up you agree to our Terms and conditions and Privacy Policy"
          />
        </Form.Group> */}
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
