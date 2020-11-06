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
import NewItemForm from "./NewItemForm.jsx"
import ItemsWall from "./ItemsWall.jsx"

/* Inventory ----------------------------------------- */

const Inventory = (props) => {
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [items, setItems] = useState(SampleElements);
  const [search, setSearch] = useState(true);

  // Firebase
  const db = firebaseApp.firestore();
  const ref = db.collection("inventories");

  // Methods
  const fetchData = async () => {
    try {
      await ref
        .doc(props.inventoryId)
        .get()
        .then((inv) => {
          const data = { ...inv.data(), id: inv.id };
          setInventory(data);
        });
      setLoading(false);
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
          {search
            ? !loading && <SearchItemForm inventory={inventory} />
            : !loading && <NewItemForm inventory={inventory} />}
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          {!loading && <InventoryInfo inventory={inventory} />}
          {loading ? "Cargando..." : <ItemsWall items={items} />}
        </div>
      </div>
    </React.Fragment>
  );
};

const InventoryInfo = (props) => {
  return (
    <div style={{ padding: "15px" }}>
      <h1>{props.inventory.name}</h1>
      <p>{props.inventory.description}</p>
    </div>
  );
};

/* Search Item form --------------------------------- */

const SearchItemForm = (props) => {
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


export default Inventory;
