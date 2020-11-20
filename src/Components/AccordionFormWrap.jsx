import React from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const AccordionFormWrap = (props) => {
  return (
    <Accordion
      className="accordion-form-container"
      style={{ backgroundColor: "none"}}
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
            <Accordion.Toggle
              style={{ color: "white", fontWeight: "bold" }}
              as={Button}
              size="md"
              variant="outline-success"
              eventKey="0"
              className="rounded-pill"
            >
              <img src="./img/icons/057-plus.png" style={{height:"20px"}}></img>
            </Accordion.Toggle>
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
