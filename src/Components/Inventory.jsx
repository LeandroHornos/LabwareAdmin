import React, { useState } from "react";
import SampleElements from "../Samples/SampleElements";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

import NavigationBar from "./NavigationBar.jsx";

const Inventory = () => {
  const [items, setItems] = useState(SampleElements);
  const [search, setSearch] = useState(true);
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row">
        <div className="col-md-3 inventory-sidepanel">
          <Button
            variant="success"
            block
            onClick={(e) => {
              search ? setSearch(false) : setSearch(true);
            }}
          >
            {search ? "Nuevo item" : "Buscar"}
          </Button>
          {search ? <SearchItemForm /> : <NewItemForm />}
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          <h1>Hola, este es el inventario</h1>
          {items.map((item) => {
            return (
              <Card className="item-card">
                <Card.Header>
                  <Card.Title>{item.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="success">Editar</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

const NewItemForm = () => {
  return (
    <Form>
      <h3>Nuevo item</h3>
      <FormGroup>
        <Form.Label>Nombre: </Form.Label>
        <FormControl type="text"></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Marca: </Form.Label>
        <FormControl type="text"></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Descripción: </Form.Label>
        <FormControl type="text"></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Cantidad: </Form.Label>
        <FormControl type="number"></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Ubicación: </Form.Label>
        <FormControl type="text"></FormControl>
      </FormGroup>
      <Button block>Agregar item</Button>
    </Form>
  );
};

const SearchItemForm = () => {
  return (
    <Form>
      <h3>Buscar</h3>
      <FormGroup>
        <Form.Label>Buscar por las siguientes palabras: </Form.Label>
        <FormControl type="text"></FormControl>
      </FormGroup>
      <Button block>Buscar</Button>
    </Form>
  );
};

export default Inventory;
