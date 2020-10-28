import React from "react";

// Router
import { useHistory } from "react-router-dom";

// Bootstrap
import Button from "react-bootstrap/Button";

// Firebase
import firebaseApp from "../firebaseApp";

const SignOut = () => {
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await firebaseApp.auth().signOut();
      history.push("./");
      console.log("has salido");
    } catch (error) {
      console.log(error);
    }
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
