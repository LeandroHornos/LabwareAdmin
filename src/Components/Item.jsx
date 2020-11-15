import React, { useState, useEffect } from "react";

// General purpose functions
import Utils from "../utilities";

// Bootstrap components
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FormControl, FormGroup } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";

// App components
import NavigationBar from "./NavigationBar.jsx";
import NewGroupForm from "./NewGroupForm.jsx";

const Item = (props) => {
  const db = firebaseApp.firestore();
  const ref = db.collection("items");
  const refInventories = db.collection("inventories");

  // hooks
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [inventory, setInventory] = useState({});
  const [loaded, setLoaded] = useState(true);

  // methods
  const fetchData = async () => {
    console.log("id del item a buscar", props.itemId);
    try {
      const itemdoc = await ref.doc(props.itemId).get();
      const itemdata = { ...itemdoc.data(), id: itemdoc.id };
      setItem(itemdata);
      console.log(
        "Item.jsx dice: se ha obtenido el siguiente item de la base de datos:",
        itemdata
      );
      const invdoc = await refInventories.doc(itemdata.inventoryId).get();

      const invdata = { ...invdoc.data(), id: invdoc.id };
      setInventory(invdata);
      console.log("Item.jsx dice: Se ha obtenido el inventario:", invdata);

      setLoading(false);
    } catch (error) {
      console.log(
        "Item.jsx dice: Ha ocurrido un error al tratar de obtener el item de la base de datos:",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [loaded]);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          className="col-md-3 inventory-sidepanel"
          style={{ backgroundImage: "url(./img/wavecut.png)" }}
        >
          {!loading && (
            <NewGroupForm
              item={item}
              inventory={inventory}
              setLoading={setLoading}
            />
          )}
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          {loading ? (
            "Cargando Item..."
          ) : (
            <div>
              <div style={{ padding: "20px" }}>
                <h1>{item.name}</h1>
                <ul style={styles.unstyledList}>
                  <li>
                    <strong>Categoría:</strong> {item.category}
                  </li>
                  <li>
                    <strong>Sub categoría:</strong> {item.subcategory}
                  </li>
                </ul>
                <h2>Grupos:</h2>
              </div>

              <GroupCards groups={item.groups} inventory={inventory} />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const GroupCards = (props) => {
  const triplets = groupAsTriplets(props.groups);
  return triplets.map((triplet) => {
    return (
      <div className="row" key={Utils.makeid(8)}>
        {triplet.map((group) => {
          return (
            <div
              key={Utils.makeid(8)}
              className="col-lg-4"
              style={{ padding: "10px 10px" }}
            >
              <GroupCard group={group} />
            </div>
          );
        })}
      </div>
    );
  });
};

const GroupCard = (props) => {
  const [ammount, setAmmount] = useState(props.group.ammount);
  const [showUpdateButtons, setShowUpdateButtons] = useState(false);

  const resetCard = () => {
    setShowUpdateButtons(false);
    setAmmount(props.group.ammount);
  };

  return (
    <Card className="group-card">
      <Card.Body>
        <Card.Title
          style={{
            fontSize: "1.5em",
            color: "rgb(41, 107, 63)",
          }}
        >
          {props.group.groupname}
        </Card.Title>

        <ul style={styles.unstyledList}>
          <li>Ubicacion: {props.group.location}</li>
          <li>Sub ubicacion: {props.group.sublocation}</li>
          <li>Estatus: {props.group.status}</li>
        </ul>
        <FormGroup className="row d-flex align-items-center justify-content-center">
          <Form.Label
            className="col-6"
            style={{
              textAlign: "left",
              padding: "0",
              margin: "0",
              fontSize: "1.3em",
              color: "black",
            }}
          >
            Cantidad:{" "}
          </Form.Label>
          <div className="col-6">
            <FormControl
              className="form-control-md"
              type="number"
              value={ammount}
              style={{ color: "black" }}
              onChange={(e) => {
                setShowUpdateButtons(true);
                setAmmount(e.target.value);
              }}
            />
          </div>
        </FormGroup>
        {showUpdateButtons && (
          <div>
            <Button
              variant="outline-info"
              style={{ margin: "0px 4px", padding: "4px", fontSize: "0.7em" }}
              size="sm"
            >
              Actualizar
            </Button>
            <Button
              variant="outline-danger"
              style={{ margin: "0px 4px", padding: "4px", fontSize: "0.7em" }}
              size="sm"
              onClick={() => {
                resetCard();
              }}
            >
              Cancelar
            </Button>
          </div>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <Button
          variant="outline-info"
          style={{ margin: "0px 4px", padding: "4px", fontSize: "0.7em" }}
          size="sm"
        >
          Editar
        </Button>
        <Button
          variant="outline-danger"
          style={{ margin: "0px 4px", padding: "4px", fontSize: "0.7em" }}
          size="sm"
        >
          Borrar
        </Button>
      </Card.Footer>
    </Card>
  );
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

const styles = {
  unstyledList: {
    listStyleType: "none",
    margin: "0",
    padding: "0",
  },
};

export default Item;
