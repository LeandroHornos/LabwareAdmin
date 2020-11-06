import React, { useState, useEffect, useContext } from "react";

// Samples
import SampleInventories from "../Samples/SampleInventories";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

const AccordionFormWrap = (props) => {
  return (
    <Accordion
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
            <Accordion.Toggle as={Button} variant="outline-info" eventKey="0">
              V
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
