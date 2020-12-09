/* InventoriesWall genera dinamicamente el muro de posteos a partir de la base de datos.
Agrupa los items de a 2 en un array bidimensional de forma que cada par se muestre
como una fila con 2 columnas, con una tarjeta en cada columna. En un dispositivo pequeño
las columnas se ubican una debajo de la otra quedando una tira de tarjetas.
*/

import React from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Auxiliary functions
import Utils from "../utilities";

// Firebase
import firebaseApp from "../firebaseApp";

// Router
import { useHistory } from "react-router-dom";

const InventoriesWall = (props) => {
  // data
  const pairs = Utils.groupAsPairs(props.items);

  // hooks
  const history = useHistory();

  // methods
  const HandleOpenInventory = (inventoryId) => {
    props.updateCurrentInventory(inventoryId);
    history.push("./inventory");
  };

  const HandleEditInventory = (inventoryData) => {
    props.setFormLoading(true);
    props.setEditMode(true);
    props.setSelectedInventoryData(inventoryData);
    props.setFormLoading(false);
  };

  const handleDeleteInventory = async (inventoryId) => {
    try {
      const db = firebaseApp.firestore();
      await db.collection("inventories").doc(inventoryId).delete();
      history.push("./welcome");
      history.goBack();
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
  };

  return pairs.map((pair) => {
    return (
      <div className="row" key={Utils.makeId(4)}>
        {pair.map((item) => {
          return (
            <div
              className="col-lg-6"
              key={item.id}
              style={{ marginBottom: "20px" }}
            >
              <Card className="item-card">
                <Card.Header className="item-card-header">
                  <div className="d-flex flex-row-reverse">
                    <DropdownButton
                      variant="outline-success"
                      size="sm"
                      title=""
                    >
                      <Dropdown.Item>
                        {/* --- Edit Inventory Button --- */}
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
                            HandleEditInventory(item);
                          }}
                        >
                          <img
                            alt="edit"
                            src="./img/icons/053-edit.png"
                            style={{ height: "24px", marginRight: "5px" }}
                          ></img>
                          Editar
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        {/* --- Delete Inventory Button --- */}
                        <Button
                          block
                          variant="outline-danger"
                          style={{ fontSize: "0.7em" }}
                          size="sm"
                          onClick={() => handleDeleteInventory(item.id)}
                        >
                          <img
                            alt="erase"
                            src="./img/icons/066-erase.png"
                            style={{ height: "24px", marginRight: "5px" }}
                          ></img>
                          Borrar
                        </Button>
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between align-items-left">
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title style={{ fontSize: "1.8em", paddingTop: "0" }}>
                      {item.name}
                    </Card.Title>
                  </div>
                  <Card.Text>
                    {Utils.getTextPreview(item.description, 140)}
                  </Card.Text>
                  <Button
                    block
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

export default InventoriesWall;
