import React, { useState, useEffect } from "react";
import SampleElements from "../Samples/SampleElements";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";
// import { AuthContext } from "../Auth";

// Router
import { useHistory } from "react-router-dom";

import NavigationBar from "./NavigationBar.jsx";

const Inventory = (props) => {
  const [inventory, setInventory] = useState({ name: "" });
  const [items, setItems] = useState(SampleElements);
  const [search, setSearch] = useState(true);

  const db = firebaseApp.firestore();
  const ref = db.collection("inventories");

  // methods
  const fetchData = async () => {
    console.log("inventario a buscar:", props.inventory);
    try {
      await ref
        .doc(props.inventory)
        .get()
        .then((inventory) => {
          const data = inventory.data();
          setInventory(data);
          console.log("inventario obtenido con exito: ");
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          {search ? (
            <SearchItemForm />
          ) : (
            <NewItemForm inventory={props.inventory} />
          )}
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          <h1 style={{ marginBottom: "40px" }}>{inventory.name}</h1>
          <DinamicWall items={items} />
        </div>
      </div>
    </React.Fragment>
  );
};

const NewItemForm = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [sublocation, setSublocation] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [status, setStatus] = useState("");

  const cleanForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setLocation("");
    setSublocation("");
    setAmmount(0);
    setStatus("");
  };

  const handleCreateItem = async () => {
    const db = firebaseApp.firestore();
    let data = {
      inventory: props.inventory,
      creationdate: new Date(),
      name,
      description,
      category,
      subcategory,
      groups: [
        {
          date: new Date(),
          groupname: "default",
          location,
          sublocation,
          status,
          ammount,
        },
      ],
    };
    data = { ...data, changelog: data.groups };
    console.log(data);
    try {
      await db
        .collection("items")
        .add(data)
        .then((docref) => {
          console.log(
            "El item se guardó con éxito, aquí está su id:",
            docref.id
          );
        });
    } catch (error) {
      console.log(error);
    }
    history.push("./inventory");
    cleanForm();
  };
  return (
    <Form>
      <h3>Nuevo item</h3>
      <FormGroup>
        <Form.Label>Nombre: </Form.Label>
        <FormControl
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Descripción: </Form.Label>
        <FormControl
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Categoria: </Form.Label>
        <FormControl
          value={category}
          type="text"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Subcategoria: </Form.Label>
        <FormControl
          type="text"
          value={subcategory}
          onChange={(e) => {
            setSubcategory(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Cantidad: </Form.Label>
        <FormControl
          type="number"
          value={ammount}
          onChange={(e) => {
            setAmmount(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Ubicación: </Form.Label>
        <FormControl
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Sub-ubicación: </Form.Label>
        <FormControl
          type="text"
          value={sublocation}
          onChange={(e) => {
            setSublocation(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Estado: </Form.Label>
        <FormControl
          type="text"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <Button variant="info" block onClick={() => handleCreateItem()}>
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
Agrupa los items de a 3 en un array bidimensional de forma que cada triplete se muestre
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

const groupAsTriplets = (items) => {
  // Create a 2D array where every element is an array of 3 items.
  // It can be used to make rows with 3 items each.

  let triplets = [];
  let triplet = [];
  let count = 0;
  items.forEach((item) => {
    if (count < 2) {
      triplet.push(item);
      count++;
    } else {
      triplet.push(item);
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
