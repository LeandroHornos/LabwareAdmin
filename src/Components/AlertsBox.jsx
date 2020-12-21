import React, { useState } from "react";

import { Alert } from "react-bootstrap";

const styles = {
  alert: { width: "100%", marginTop: "20px", marginBottom: "5px" },
  row: { padding: "40px 10px" },
};

let sampleMessages = [
  { component: "inventory", variant: "danger", body: "Hola señor don pepito" },
  { component: "inventory", variant: "warning", body: "Hola señor don josé" },
  {
    component: "inventory",
    variant: "success",
    body: "La olio usté a mi abuela?",
  },
  { component: "inventory", variant: "success", body: "A su abuela yo la olí" },
  { component: "inventory", variant: "success", body: "Adiós don pepito" },
  { component: "inventory", variant: "success", body: "Adiós don josé" },
];

const AlertsBox = () => {
  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-between">
        {sampleMessages.map((message) => {
          return (
            <AlertDismissible variant={message.variant}>
              {message.body}
            </AlertDismissible>
          );
        })}
      </div>
    </div>
  );
};

const AlertDismissible = (props) => {
  const [show, setShow] = useState(true);

  const handleCloseAlert = () => {
    setShow(false);
  };

  if (show) {
    return (
      <Alert
        style={styles.alert}
        variant={props.variant}
        onClose={() => handleCloseAlert()}
        dismissible
      >
        <p>{props.children}</p>
      </Alert>
    );
  }
  return null;
};

export default AlertsBox;
