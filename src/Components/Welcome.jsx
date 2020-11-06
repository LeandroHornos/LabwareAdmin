import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Welcome.css";

const Welcome = () => {
  const history = useHistory();
  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div
        className="col-md-4 d-flex flex-column aling-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ textAlign: "center" }}>
          <img src="./img/logo3.png" alt="logo" style={style.logo} />
          <p>Te damos la bienvenida a</p>
          <h1 style={{ color: "rgb(0,160,60)" }}>LabwareAdmin</h1>
          <p style={{ fontStyle: "italic" }}>By Carbo</p>
          <p>Lleva el inventario de tu laboratorio!</p>
          <Button
            variant="dark"
            onClick={(e) => {
              history.push("/signin");
            }}
            block
          >
            Ingresar
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              history.push("/signup");
            }}
            block
          >
            Registrate
          </Button>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

const style = {
  logo: {
    width: "50%",
    margin: "auto",
    animation: "rotation 10s infinite linear",
  },
};

export default Welcome;
