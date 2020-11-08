import React, { useState, useEffect, useContext } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import { FormControl, FormGroup } from "react-bootstrap";

// Router
// import { useHistory } from "react-router-dom";

/* Firebase */
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

// App components
import NavigationBar from "./NavigationBar.jsx";

const Item = (props) => {
  const db = firebaseApp.firestore();
  const ref = db.collection("items");

  // hooks
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [loaded, setLoaded] = useState(true);

  // methods
  const fetchData = async () => {
    console.log("id del item a buscar", props.itemId);
    try {
      await ref
        .doc(props.itemId)
        .get()
        .then((doc) => {
          const data = { ...doc.data(), id: doc.id };
          setItem(data);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loaded]);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="col-md-3 inventory-sidepanel"></div>
        <div className="col-md-9" style={{ minHeight: "100vh" }}>
          {loading ? (
            "Cargando Item..."
          ) : (
            <div>
              <h1>{item.name}</h1>
              <ul>
                <li>Categoría: {item.category}</li>
                <li>Sub categoría: {item.subcategory}</li>
              </ul>
              {item.groups.map((group) => {
                return (
                  <div key={"group" + group.groupname}>
                    <h3>{group.groupname}</h3>
                    <ul>
                      <li>Ubicacion: {group.location}</li>
                      <li>Sub ubicacion: {group.sublocation}</li>
                      <li>Estatus: {group.status}</li>
                      <li>Cantidad: {group.ammount}</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Item;
