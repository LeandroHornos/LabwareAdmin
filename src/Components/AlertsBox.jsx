/* AlertsBox brinda una cajita donde se muestran bloques de alerta
para mostrarle mensajes al usuario. Está basado en los Alerts de react-bootstrap.
Recibe por props un array con los mensajes a mostrar, así como funciones para
modificar el state del componente dentro del cual se encuentra. <App /> 

props: 
-alerts: Array con mensajes de alerta que recibe del state del componente que lo contiene. 
Son objetos con la estructura {id, variant, body}. id es una string que idientifica el alert
para poder manipularlo; variant indica la variante del Alert de bootstrap 
(danger, warning, success, etc), body contiene el texto a mostrar en el alert.

-setAlerts: seter del hook para actualizar el estado del componente padre. Dicho
componente usa setAlerts para decirle a AlertsBox que mensajes mostrar, mientras que
alertsBox lo usa para eliminar los mensajes al darle al boton x del Alert correspondiente
*/
import React, { useState, useEffect } from "react";

import { Alert } from "react-bootstrap";

const styles = {
  alert: { width: "100%", marginTop: "20px", marginBottom: "5px" },
  row: { padding: "40px 10px" },
};

const AlertsBox = (props) => {
  const [loading, setLoading] = useState(true); // Determina cuando mostrar el componente
  const [alerts, setAlerts] = useState([]); // Mensajes para mostrar

  const delAlertById = (id) => {
    /* Permite eliminar un mensaje a partir del id */
    const updatedAlerts = alerts.filter((msg) => {
      return msg.id !== id;
    });
    props.setAlerts(updatedAlerts);
    console.log(
      "se han eliminado los mensajes, he aqui la nueva lista",
      updatedAlerts
    );
  };

  useEffect(() => {
    setAlerts(props.alerts);
    setLoading(false);
  }, [props]);

  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-between">
        {!loading &&
          alerts.map((alert) => {
            return (
              <AlertDismissible
                key={alert.id}
                variant={alert.variant}
                alertid={alert.id}
                delAlertById={delAlertById}
              >
                {alert.body}
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
    props.delAlertById(props.alertid);
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
