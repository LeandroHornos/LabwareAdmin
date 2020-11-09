import React, { useState, useEffect, useContext } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
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
          console.log("item:", data);
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
                <li>
                  <strong>Categoría:</strong> {item.category}
                </li>
                <li>
                  <strong>Sub categoría:</strong> {item.subcategory}
                </li>
              </ul>
              <h2>Grupos:</h2>
              <GroupCards groups={item.groups} />
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
      <div className="row">
        {triplet.map((group) => {
          return (
            <div className="col-lg-4">
              <Card className="group-card">
                <Card.Body>
                  <Card.Title>{group.groupname}</Card.Title>

                    <ul>
                      <li>Ubicacion: {group.location}</li>
                      <li>Sub ubicacion: {group.sublocation}</li>
                      <li>Estatus: {group.status}</li>
                      <li>Cantidad: {group.ammount}</li>
                    </ul>

                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  });
};

/* Auxiliary functions ------------------------------ */

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

export default Item;
