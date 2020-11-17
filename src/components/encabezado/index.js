import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import NavbarLateral from "../navBarLateral";
export default class encabezado extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">
          <NavbarLateral />
        </Navbar.Brand>
        <Nav>
          <Nav.Link>Pedidos Soltec</Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Navbar>
    );
  }
}
