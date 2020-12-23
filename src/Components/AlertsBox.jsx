/* AlertsBox brinda una cajita donde se muestran bloques de alerta
para mostrarles mensajes al usuario. Está basado en los Alerts de react-bootstrap.
Recibe por props un array con los mensajes a mostrar, así como funciones para
agregar y eliminar mensajes en el state de <App /> 

props: 
-messages: Array con mensajes que recibe del state de <App/>, los cuales son objetos con la 
estructura {variant, body, component}. variant indica la variante
del Alert de bootstrap (danger, warning, success, etc), body contiene
el texto a mostrar en el alert y component indica el componente en el que
debe renderizarse el mensaje. Por default <AlertsBox> recibe todos los mensajes
y mediante la funcion filterMessages() filtra el array dejando sólo aquellos que
corresponden al componente al que corresponde.

-delMessageById: es una funcion  que elimina el mensaje del state de <App/>
pasandole el id del mensaje: delMessageById(id)

-ownerComponent: String. Es el nombre del componente que contiene a <AlertsBox />
tal y como se especifica en la propiedad "component" de los objetos dentro de "messages"
Se utiliza para identificar aquellos mensajes que se deben mostrar en el componente actual. 
*/
import React, { useState, useEffect } from "react";

import { Alert } from "react-bootstrap";

const styles = {
  alert: { width: "100%", marginTop: "20px", marginBottom: "5px" },
  row: { padding: "40px 10px" },
};

const AlertsBox = (props) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    /* Filtro los mensajes para dejar sólo aquellos que corresponden a este al 
componente indicado en props.ownerComponent */
    const filterMessages = (messages) => {
      const filtered = messages.filter((msg) => {
        return msg.component === props.ownerComponent;
      });

      return filtered;
    };

    const filteredMessages = filterMessages(props.messages);
    console.log(
      "AlertsBox dice: estos son los mensajes filtrados,",
      filteredMessages
    );
    setMessages(filteredMessages);
    setLoading(false);
  }, [props]);

  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center justify-content-between">
        {!loading &&
          messages.map((message) => {
            return (
              <AlertDismissible
                key={message.id}
                variant={message.variant}
                msgid={message.id}
                delMessageById={props.delMessageById}
              >
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
    props.delMessageById(props.msgid);
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
