/* AccordionFormWrap es un acordeon q de un sólo elemento que envuelve a un formulario
en una tarjeta colapsable. Al  Atener una sola tarjeta, sólo hay dos posibilidades:
que esté activa la única tarjeta existente, o nada. Recibe por props el valor
de la tarjeta activa para permitir colapsar y descolapsar desde el componente
padre.  */
import React, { useState, useEffect } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const AccordionFormWrap = (props) => {
  // STATE:
  const [activeKey, setActiveKey] = useState(props.defaultActiveKey);
  // METHODS:

  useEffect(() => {
    /* Actualiza el elemento del acordeón que se encuentra activo 
    cuando cambian las props.
    Dado que el acordeón tiene un solo elemento, un valor de cero 
    hace que se muestre el contenido, mientras que cualquier otro
    número mantiene colapsada la tarjeta */
    setActiveKey(props.defaultActiveKey);
  }, [props.defaultActiveKey]);

  // RENDER:

  return (
    <Accordion
      activeKey={activeKey}
      className="accordion-form-container"
      style={{ backgroundColor: "none" }}
    >
      <Card
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "rgba(0,0,0,0)",
          border: "none",
        }}
      >
        <Card.Header
          style={{ backgroundColor: "rgba(0,0,0,0)", border: "none" }}
          className="d-flex justify-content-between align-items-center"
        >
          <h3 className="d-inline">{props.title}</h3>
          <span>
            {/* Toggle Collapse: */}
            <Button
              style={{ color: "white", fontWeight: "bold" }}
              size="md"
              variant="outline-success"
              className="rounded-pill"
              onClick={() => {
                setActiveKey(activeKey === "0" ? "1" : "0");
              }}
            >
              <img
                alt=""
                src={
                  activeKey === "1"
                    ? "./img/icons/057-plus.png"
                    : "./img/icons/048-delete.png"
                }
                style={{ height: "20px" }}
              ></img>
            </Button>
          </span>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{props.children}</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default AccordionFormWrap;
