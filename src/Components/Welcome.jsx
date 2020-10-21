import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Welcome = () => {
  const history = useHistory();
  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div
        className="col-md-6 d-flex flex-column aling-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ textAlign: "center" }}>
          <p>Te damos la bienvenida a</p>
          <h1>LabwareAdmin</h1>
          <p>
            Con esta aplicación podrás llevar un inventario del material de tu
            laboratorio
          </p>
          <Button
            onClick={(e) => {
              history.push("/signin");
            }}
            block
          >
            Ingresar
          </Button>
          <Button
            onClick={(e) => {
              history.push("/signup");
            }}
            block
          >
            Registrate
          </Button>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default Welcome;
