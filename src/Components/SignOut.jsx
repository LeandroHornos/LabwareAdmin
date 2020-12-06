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
      <div className="col-md-4"></div>
      <div
        className="col-md-4 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{ width: "100%" }}
          className="d-flex flex-column justify-content-around align-items-center"
        >
          <img alt="" style={{ width: "70%" }} src="/img/girl-leaving-lab.svg"></img>
          <h3 style={{ padding: "20px 10px" }}>¿ Te vas ?</h3>
          <Button
            variant="success"
            onClick={(e) => {
              e.preventDefault();
              handleSignOut();
            }}
          >
            Salir
          </Button>
          <Button
            variant="link"
            onClick={() => {
              history.goBack();
            }}
          >
            Volver
          </Button>
        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default SignOut;
