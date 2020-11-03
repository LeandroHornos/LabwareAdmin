import React, { useState, useEffect, useContext } from "react";

// Samples
import SampleInventories from "../Samples/SampleInventories";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

// Router
import { useHistory } from "react-router-dom";

/* Firebase */
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

// App components
import NavigationBar from "./NavigationBar.jsx";

const Inventories = (props) => {
  const db = firebaseApp.firestore();
  const ref = db.collection("inventories");

  // hooks
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // methods
  const fetchData = () => {
    try {
      ref.get().then((inventories) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-md-3 inventory-sidepanel">
          <NewInventoryForm
            updateCurrentInventory={props.updateCurrentInventory}
          />
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          <h1 style={{ marginBottom: "40px" }}>Mis Inventarios</h1>
          {loading ? (
            "Cargando Inventarios..."
          ) : (
            <DinamicInventoriesWall
              items={items}
              updateCurrentInventory={props.updateCurrentInventory}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

// SUBCOMPONENTS-------------------------------------------------------

const NewInventoryForm = (props) => {
  // Hooks
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  // Methods
  const handleCreateInventory = async () => {
    const db = firebaseApp.firestore();
    const data = {
      ...invDefaultData,
      name,
      description,
      date: new Date(),
      creatoruid: currentUser.uid,
      creatoremail: currentUser.email,
      users: [{ id: currentUser.uid, role: "admin" }],
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

  //Component
  return (
    <Form>
      <h3>Nuevo Inventario</h3>
      <FormGroup>
        <Form.Label>Nombre: </Form.Label>
        <FormControl
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <FormGroup>
        <Form.Label>Descripción: </Form.Label>
        <FormControl
          as="textarea"
          rows={3}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></FormControl>
      </FormGroup>
      <Button onClick={() => handleCreateInventory()} variant="info" block>
        Crear inventario
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
  // data
  const pairs = groupAsPairs(props.items);
  // hooks
  const history = useHistory();
  // methods
  const HandleOpenInventory = (inventoryId) => {
    props.updateCurrentInventory(inventoryId);
    history.push("./inventory");
  };

  return pairs.map((pair) => {
    return (
      <div className="row" key={"row-" + pair[0].id}>
        {pair.map((item) => {
          return (
            <div className="col-lg-6" key={item.id}>
              <Card className="item-card">
                <Card.Header className="item-card-header"></Card.Header>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="success"
                    onClick={() => HandleOpenInventory(item.id)}
                  >
                    Ver inventario 2
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

const invDefaultData = {
  categories: [],
  locations: [],
  statuses: ["Active", "Stored", "Inactive", "Lent", "For repair", "Repairing"],
};

export default Inventories;
