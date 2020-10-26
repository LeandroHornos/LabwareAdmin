import React from "react";

import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";

import firebaseApp from "../firebaseApp";

const SignOut = () => {
  const history = useHistory();

  const handleSignOut = async () => {
    await firebaseApp.auth().signOut();
    history.push("./");
    console.log("has salido")
  };

  return (
    <div className="row">
      <div
        className="col-md-12 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="d-flex flex-column justify-content-around align-items-center">
          <h1 style={{ padding: "20px 10px" }}>¿ Deseas cerrar sesión ?</h1>
          <Button
            style={{ margin: "20px 10px" }}
            onClick={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
          >
            Salir
          </Button>
          <a href="./wall">Volver</a>
        </div>
      </div>
    </div>
  );
};

export default SignOut;
