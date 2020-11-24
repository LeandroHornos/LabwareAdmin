import React, { useState, useEffect } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const AccordionFormWrap = (props) => {
  const [activeKey, setActiveKey] = useState(props.defaultActiveKey);

  useEffect(() => {
    setActiveKey(props.defaultActiveKey);
  }, [props]);

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
                src="./img/icons/057-plus.png"
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
