import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";  
import logo from "../../assets/navbar.webp";

function Navs() {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/favorites">🏢 Rescounts company</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-link">🏠 Home</Nav.Link>
              <Nav.Link as={Link} to="/" className="nav-link">⭐ Cart</Nav.Link>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/action">🎭 Games</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/comedy">😂 Clothes</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/drama">🎬 Devices</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/about">ℹ️ About</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Button variant="outline-light" as={Link} to="/login" className="me-2">Login</Button>
              <Button variant="primary" as={Link} to="/signup">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="text-center ">
        <img src={logo} alt="Logo" style={{ width: "100%", maxHeight: "700px", objectFit: "cover" }} />
      </div>
    </>
  );
}

export default Navs;