import React from "react";

import { Spinner } from "react-bootstrap";

const CircleSpinnerRow = () => {
  return (
    <div className="row">
      <div
        className="col-12 d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <Spinner animation="border" role="status" variant="success">
          <span className="sr-only">Cargando...</span>
        </Spinner>
      </div>
    </div>
  );
};

export default CircleSpinnerRow;
