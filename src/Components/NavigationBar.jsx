import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";


const NavigationBar = () => {
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>
        <Link to="/">LabwareAdmin</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
