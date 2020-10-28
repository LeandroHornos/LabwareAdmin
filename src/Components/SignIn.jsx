import React, { useState } from "react";

import { useHistory } from "react-router-dom";

// Firebase
import firebaseApp from "../firebaseApp";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignIn = async () => {
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      history.push("./inventories");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-3"></div>
      <div
        className="col-md-6 d-flex flex-column justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <h1>Ingresar</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              No compartiremos tu email con nadie, ni será visible para otros
              usuarios.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            block
            variant="success"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            Entrar
          </Button>
        </Form>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}

export default SignIn;
