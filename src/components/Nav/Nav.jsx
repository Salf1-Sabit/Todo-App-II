import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Navbar.Brand href="/">Todo Hive</Navbar.Brand>
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <Nav.Link href="#features">Tasks</Nav.Link>
            <Nav.Link href="#pricing">Settings</Nav.Link>
            <Link to="/register " className="nav-link active">
              Register
            </Link>
            <Link to="/login" className="nav-link active">
              Login
            </Link>
            <Link to="/admin" className="nav-link active">
              Admin
            </Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;