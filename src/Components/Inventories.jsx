import React, { useState, useEffect, useContext } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Utils from "../utilities";
import GuiTexts from "./GuiTexts.js";

// Router
import { useHistory } from "react-router-dom";

// Firebase
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";
import InventorySchema from "../Models/InventorySchema";

// Components
import NavigationBar from "./NavigationBar.jsx";
import AccordionFormWrap from "./AccordionFormWrap.jsx";

const Inventories = (props) => {
  const txt = GuiTexts.Inventories;
  const db = firebaseApp.firestore();
  const ref = db.collection("inventories");
  const { currentUser } = useContext(AuthContext);

  // hooks
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]); // Almacena los inventarios
  const [editMode, setEditMode] = useState(false); // Determina el comportamiento de NewInventoryForm
  const [selectedInventoryData, setSelectedInventoryData] = useState({});
  const reload = false;

  // methods

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ref
          .where("users", "array-contains", currentUser.uid)
          .get()
          .then((inventories) => {
            const items = inventories.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setItems(items);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // RENDER
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          className="col-md-3 inventory-sidepanel"
          style={{
            marginBottom: "20px",
            backgroundImage: "url(./img/wavecut.png)",
          }}
        >
          {!loading && (
            <NewInventoryForm
              updateCurrentInventory={props.updateCurrentInventory}
              editMode={editMode}
              lang={props.lang}
              inventory={selectedInventoryData}
            />
          )}
        </div>
        <div
          className="col-md-9"
          style={{ minHeight: "100vh", padding: "10px 0px" }}
        >
          <h1 style={{ marginBottom: "40px" }}>
            {txt.title[props.lang] + ": "}
          </h1>
          {loading ? (
            "Cargando Inventarios..."
          ) : (
            <DinamicInventoriesWall
              items={items}
              updateCurrentInventory={props.updateCurrentInventory}
              setSelectedInventoryData={setSelectedInventoryData}
              setEditMode={setEditMode}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

// SUBCOMPONENTS-------------------------------------------------------

const NewInventoryForm = (props) => {
  // Browsing:
  const history = useHistory();

  // Auth:
  const { currentUser } = useContext(AuthContext);

  // Hooks:
  const txt = GuiTexts.NewInventoryForm;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultKey, setDefaultKey] = useState("1");

  useEffect(() => {
    console.log(
      "NewInventoryForm dice: este es props.inventory",
      props.inventory
    );
    if (props.editMode) {
      console.log("entrando a editMode");
      //Si estoy en modo edit, cargo el inventario en el form:
      setDefaultKey("0");
      setName(props.inventory.name);
      setDescription(props.inventory.description);
    } else {
      setName("");
      setDescription("");
    }
  });

  // METHODS:

  const handleCreateInventory = async () => {
    const db = firebaseApp.firestore();
    const data = {
      ...InventorySchema,
      name,
      description,
      date: new Date(),
      creatoruid: currentUser.uid,
      lastupdated: new Date(),
      roles: [{ uid: currentUser.uid, role: "admin" }],
      users: [currentUser.uid],
    };

    // Save data to database
    try {
      await db
        .collection("inventories")
        .add(data)
        .then((docref) => {
          props.updateCurrentInventory(docref.id);
        });
      history.push("./inventory");
    } catch (error) {
      console.log(error);
    }
  };

  // RENDER:

  return (
    <AccordionFormWrap title={"Nuevo Inventario"} defaultActiveKey={defaultKey}>
      <Form>
        <FormGroup>
          <Form.Label>{txt.name[props.lang] + ": "}</Form.Label>
          <FormControl
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>{txt.description[props.lang] + ": "}</Form.Label>
          <FormControl
            value={description}
            as="textarea"
            rows={3}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <Button onClick={() => handleCreateInventory()} variant="info" block>
          {txt.create[props.lang]}
        </Button>
      </Form>
    </AccordionFormWrap>
  );
};

/* DinamicInventoriesWall genera dinamicamente el muro de posteos a partir de la base de datos.
Agrupa los items de a 2 en un array bidimensional de forma que cada par se muestre
como una fila con 2 columnas, con una tarjeta en cada columna. En un dispositivo pequeño
las columnas se ubican una debajo de la otra quedando una tira de tarjetas.
*/
const DinamicInventoriesWall = (props) => {
  // data
  const pairs = groupAsPairs(props.items);

  // hooks
  const history = useHistory();

  // methods
  const HandleOpenInventory = (inventoryId) => {
    props.updateCurrentInventory(inventoryId);
    history.push("./inventory");
  };

  const HandleEditInventory = (inventoryData) => {
    props.setEditMode(true);
    props.setSelectedInventoryData(inventoryData);
  };

  return pairs.map((pair) => {
    return (
      <div className="row" key={"row-" + pair[0].id}>
        {pair.map((item) => {
          return (
            <div
              className="col-lg-6"
              key={item.id}
              style={{ marginBottom: "20px" }}
            >
              <Card className="item-card">
                <Card.Header className="item-card-header"></Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between align-items-left">
                  <Card.Title>{item.name}</Card.Title>
                  <DropdownButton variant="outline-success" size="sm" title="">
                    <Dropdown.Item>
                      <Button
                        block
                        variant="outline-success"
                        style={{
                          argin: "0px 4px",
                          padding: "4px",
                          fontSize: "0.7em",
                        }}
                        size="sm"
                        onClick={() => {
                          console.log("vamos a editar el siguiente item", item);
                          HandleEditInventory(item);
                        }}
                      >
                        <img
                          src="./img/icons/053-edit.png"
                          style={{ height: "24px", marginRight: "5px" }}
                        ></img>
                        Editar
                      </Button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Button
                        block
                        variant="outline-danger"
                        style={{ fontSize: "0.7em" }}
                        size="sm"
                      >
                        <img
                          src="./img/icons/066-erase.png"
                          style={{ height: "24px", marginRight: "5px" }}
                        ></img>
                        Borrar
                      </Button>
                    </Dropdown.Item>
                  </DropdownButton>
                  <Card.Text>
                    {Utils.getTextPreview(item.description, 140)}
                  </Card.Text>
                  <Button
                    variant="outline-success"
                    onClick={() => HandleOpenInventory(item.id)}
                  >
                    Ver
                  </Button>
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

export default Inventories;
