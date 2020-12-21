import React from "react";

import { Alert } from "react-bootstrap";

const AlertsBox = () => {
  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-between">
        <Alert variant="danger">Este es un ejemplo de mensaje de error</Alert>
        <Alert variant="success">Este es un ejemplo de mensaje exitoso</Alert>
        <Alert variant="warning">Este es un ejemplo de advertencia</Alert>
      </div>
    </div>
  );
};

export default AlertsBox;
