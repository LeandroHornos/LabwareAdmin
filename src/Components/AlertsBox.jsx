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
componente indicado en props.messageComponent */
    const filterMessages = (messages) => {
      const filtered = messages.filter((msg) => {
        return msg.component === props.messageComponent;
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
                deleteMessage={props.deleteMessage}
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
    props.deleteMessage(props.msgid);
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
