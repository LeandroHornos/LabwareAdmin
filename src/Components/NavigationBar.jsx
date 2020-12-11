import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

const NavigationBar = () => {
  const history = useHistory();
  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      fixed="top"
    >
      <div
        style={{ width: "100%" }}
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand>
          <img alt="" src="./img/carbo-logo-2-rojo.svg" style={{height:"20px", marginRight:"5px"}}></img>
          <Link to="/" style={{ color: "rgb(100,200,250)" }}>
            LabwareAdmin
          </Link>
        </Navbar.Brand>
        <Button
          variant="outline-success"
          onClick={() => {
            history.push("./signout");
          }}
        >
          <img alt="" src="./img/icons/013-arrow.png" style={{height:"24px", marginRight:"5px"}}></img>
          LogOut
        </Button>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ width: "100%", background: "red" }}
        >
          <Nav>
          </Nav>
        </Navbar.Collapse> */}
      </div>
    </Navbar>
  );
};

export default NavigationBar;
