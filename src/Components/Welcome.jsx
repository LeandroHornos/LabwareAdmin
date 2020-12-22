import React from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./Welcome.css";

const Welcome = () => {
  const history = useHistory();
  return (
    <div className="row welcome">
      <div className="col-md-6 col-lg-7"></div>
      <div
        className="col-md-5 col-lg-4"
        style={{
          minHeight: "100vh",
          padding: "10px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            backgroundImage: "url(./img/wavecut.png)",
          }}
          className="welcome-box boxshadow d-flex flex-column aling-items-center justify-content-around"
        >
          <div>
            <img
              src="./img/carbo-logo-2-rojo.svg"
              alt="logo"
              style={style.logo}
            />
            <p style={{ fontStyle: "italic", margin: "0px" }}>Carbo</p>
            <h1 style={{ color: "rgb(150, 230, 170)", padding: "0px" }}>
              LabwareAdmin
            </h1>
          </div>

          <div>
            {" "}
            <Button
              className="boxshadow"
              variant="success"
              onClick={(e) => {
                history.push("/signin");
              }}
              block
            >
              Ingresar
            </Button>
            <Button
              className="boxshadow"
              variant="info"
              onClick={(e) => {
                history.push("/signup");
              }}
              block
            >
              Registrate
            </Button>
          </div>
        </div>
      </div>
      <div className="col-lg-1"></div>
    </div>
  );
};

const style = {
  logo: {
    width: "70%",
    maxWidth: "150px",
    margin: "auto",
    animation: "rotation 60s infinite linear",
  },
};

export default Welcome;
