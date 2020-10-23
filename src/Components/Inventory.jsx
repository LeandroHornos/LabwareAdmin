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
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-md-3 inventory-sidepanel">
          <Button
            style={{ marginTop: "10px" }}
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
          <h1 style={{ marginBottom: "40px" }}>Hola, este es el inventario</h1>
          <DinamicWall items={items} />
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
      <Button variant="info" block>
        Agregar item
      </Button>
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
      <Button variant="info" block>
        Buscar
      </Button>
    </Form>
  );
};

/* DinamicWall genera dinamicamente el muro de posteos a partir de la base de datos.
Agrupa los posts de a 3 en un array bidimensional de forma que cada triplete se muestre
como una fila con 3 columnas, con una tarjeta en cada columna. En un dispositivo pequeño
las columnas se ubican una debajo de la otra quedando una tira de tarjetas.
*/
const DinamicWall = (props) => {
  const triplets = groupAsTriplets(props.items);
  return triplets.map((triplet) => {
    return (
      <div className="row">
        {triplet.map((item) => {
          return (
            <div className="col-lg-4">
              <Card className="item-card">
                <Card.Header className="item-card-header"></Card.Header>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="success">Editar</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  });
};

const groupAsTriplets = (posts) => {
  // Create a 2D array where every element is an array of 3 posts.
  // It can be used to make rows with 3 posts each.

  let triplets = [];
  let triplet = [];
  let count = 0;
  posts.forEach((post) => {
    if (count < 2) {
      triplet.push(post);
      count++;
    } else {
      triplet.push(post);
      triplets.push(triplet);
      triplet = [];
      count = 0;
    }
  });
  if (triplet.length > 0) {
    triplets.push(triplet);
  }
  return triplets;
};

export default Inventory;
