import React, { useState } from "react";
import SampleElements from "../Samples/SampleElements";
import SampleInventories from "../Samples/SampleInventories";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

import { useHistory } from "react-router-dom";

import NavigationBar from "./NavigationBar.jsx";

const Inventory = (props) => {
  const history = useHistory();
  const [items, setItems] = useState(SampleInventories);

  const HandleClick = (inventoryNumber) => {
    props.updateInventory(inventoryNumber);
    history.push("./inventory");
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-md-3 inventory-sidepanel">
          <NewItemForm />
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          <h1 style={{ marginBottom: "40px" }}>Mis Inventarios</h1>
          <Button variant="success" onClick={() => HandleClick(2)}>
            Ver inventario 2
          </Button>
          <DinamicInventoriesWall
            items={items}
            setCurrentInventory={props.updateInventory}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const NewItemForm = () => {
  return (
    <Form>
      <h3>Nuevo Inventario</h3>
      <FormGroup>
        <Form.Label>Nombre: </Form.Label>
        <FormControl type="text"></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Descripción: </Form.Label>
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

/* DinamicInventoriesWall genera dinamicamente el muro de posteos a partir de la base de datos.
Agrupa los items de a 2 en un array bidimensional de forma que cada par se muestre
como una fila con 2 columnas, con una tarjeta en cada columna. En un dispositivo pequeño
las columnas se ubican una debajo de la otra quedando una tira de tarjetas.
*/
const DinamicInventoriesWall = (props) => {
  const pairs = groupAsPairs(props.items);
  return pairs.map((pair) => {
    return (
      <div className="row">
        {pair.map((item) => {
          return (
            <div className="col-lg-6">
              <Card className="item-card">
                <Card.Header className="item-card-header"></Card.Header>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button variant="success">Ver</Button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  });
};

const groupAsPairs = (items) => {
  // Create a 2D array where every element is an array of 2 items.
  // It can be used to make rows with 2 items each.

  let pairs = [];
  let pair = [];
  let count = 0;
  items.forEach((item) => {
    if (count < 1) {
      pair.push(item);
      count++;
    } else {
      pair.push(item);
      pairs.push(pair);
      pair = [];
      count = 0;
    }
  });
  if (pair.length > 0) {
    pairs.push(pair);
  }
  return pairs;
};

export default Inventory;
