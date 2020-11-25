import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";
// import { AuthContext } from "../Auth";

import NavigationBar from "./NavigationBar.jsx";
import NewItemForm from "./NewItemForm.jsx";
import ItemsWall from "./ItemsWall.jsx";

/* Inventory ----------------------------------------- */

const Inventory = (props) => {
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(true);
  const [reload, setReload] = useState(false);

  // Firebase
  const db = firebaseApp.firestore();
  const refInventories = db.collection("inventories");
  const refItems = db.collection("items");

  // Methods
  const fetchData = async () => {
    try {
      await refInventories
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
    try {
      await refItems
        .where("inventoryId", "==", props.inventoryId)
        .get()
        .then((itemsArray) => {
          const items = itemsArray.docs.map((doc) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          className="col-md-3 inventory-sidepanel"
          style={{ backgroundImage: "url(./img/wavecut.png)" }}
        >
          <div style={{ padding: "20px" }}>
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
          </div>
          {search
            ? !loading && <SearchItemForm inventory={inventory} />
            : !loading && (
                <NewItemForm
                  inventory={inventory}
                  setReload={setReload}
                  updateCurrentItem={props.updateCurrentItem}
                  lang={props.lang}
                />
              )}
        </div>
        <div className="col-md-9" style={{ minHeight: "100vh", padding: "0" }}>
          {!loading && <InventoryInfo inventory={inventory} />}
          {loading ? (
            "Cargando..."
          ) : (
            <ItemsWall
              items={items}
              reload={reload}
              updateCurrentItem={props.updateCurrentItem}
            />
          )}
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
    <div style={{ padding: "20px" }}>
      {" "}
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
    </div>
  );
};

export default Inventory;
