import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div className="col-md-6">
        {" "}
        <Link className="button" to="/signin">
          Ya tienes cuenta? Ingresa
        </Link>
        <Link className="button" to="/signup">
          Caso contrario, Registrate
        </Link>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default Welcome;
