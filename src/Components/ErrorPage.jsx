import React from "react";

// Router
import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="row" style={{ minHeight: "100vh" }}>
      <div className="col-md-4"></div>
      <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
        <img
          alt=""
          src="./img/boy-chem-explosion.svg"
          style={{ width: "90%" }}
        ></img>
        <p style={{ fontSize: "1.5em", color: "red" }}>
          Oops, ha ocurrido un error
        </p>
        <Button
          variant="success"
          onClick={() => {
            history.goBack();
          }}
        >
          Volver
        </Button>
        <Button
          block
          variant="link"
          onClick={() => {
            history.push("/");
          }}
        >
          Ir al inicio
        </Button>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default ErrorPage;
