import React, { useState, useEffect, useContext } from "react";

// General purpose functions
import Utils from "../utilities";

import { useHistory } from "react-router-dom";

// Bootstrap components
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { FormControl, FormGroup } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

// App components
import NavigationBar from "./NavigationBar.jsx";
import GroupForm from "./GroupForm.jsx";

const Item = (props) => {
  const db = firebaseApp.firestore();
  const ref = db.collection("items");
  const refInventories = db.collection("inventories");

  // hooks
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [inventory, setInventory] = useState({});
  const [editMode, setEditGroup] = useState(false); // Determina el comportamiento de GroupForm
  const [selectedGroupData, setSelectedGroupData] = useState({});

  const loaded = true;

  // methods
  const fetchData = async () => {
    try {
      const itemdoc = await ref.doc(props.itemId).get();
      const itemdata = { ...itemdoc.data(), id: itemdoc.id };
      setItem(itemdata);
      const invdoc = await refInventories.doc(itemdata.inventoryId).get();

      const invdata = { ...invdoc.data(), id: invdoc.id };
      setInventory(invdata);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [editMode]);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          className="col-md-5 col-lg-3 inventory-sidepanel"
          style={{ backgroundImage: "url(./img/wavecut.png)" }}
        >
          {!loading && (
            <GroupForm
              item={item}
              inventory={inventory}
              setLoading={setLoading}
              editMode={editMode}
              group={selectedGroupData}
            />
          )}
        </div>
        <div className="col-md-7 col-lg-9" style={{ minHeight: "100vh" }}>
          {loading ? (
            "Cargando Item..."
          ) : (
            <div>
              <div style={{ padding: "20px" }}>
                <div className="row">
                  <div style={{ padding: "0" }} className="col-9">
                    <h1>{item.name}</h1>
                    <ul style={styles.unstyledList}>
                      <li>
                        <strong>Categoría:</strong> {item.category}
                      </li>
                      <li>
                        <strong>Sub categoría:</strong> {item.subcategory}
                      </li>
                    </ul>
                  </div>
                  <div className="col-3" style={{ paddingTop: "30epx" }}>
                    <img
                      style={{ width: "100%" }}
                      src="/img/icons/labware/condenser.svg"
                      alt=""
                    />
                  </div>
                </div>

                <h2>Grupos:</h2>
              </div>

              <GroupCards
                groups={item.groups}
                itemId={item.id}
                inventory={inventory}
                changelog={item.changelog}
                setLoading={setLoading}
                setEditGroup={setEditGroup} // Permite indicar al form que se desea editar un grupo
                setSelectedGroupData={setSelectedGroupData} // Cargar en state de <Item/> el grupo a editar
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const GroupCards = (props) => {
  const updateGroups = (updatedGroup) => {
    let groups = props.groups;
    groups.forEach((group, index) => {
      if (group.id === updatedGroup.id) {
        groups[index] = updatedGroup;
      }
    });
    return groups;
  };

  const filterGroups = (groupId) => {
    let groups = props.groups.filter((group) => {
      return !(group.id === groupId);
    });
    return groups;
  };
  const triplets = Utils.groupAsTriplets(props.groups);
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
              <GroupCard
                group={group}
                itemId={props.itemId}
                updateGroups={updateGroups}
                filterGroups={filterGroups}
                changelog={props.changelog}
                setLoading={props.setLoading}
                setEditGroup={props.setEditGroup}
                setSelectedGroupData={props.setSelectedGroupData}
              />
            </div>
          );
        })}
      </div>
    );
  });
};

const GroupCard = (props) => {
  const db = firebaseApp.firestore();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [ammount, setAmmount] = useState(props.group.ammount);
  const [showUpdateButtons, setShowUpdateButtons] = useState(false);

  //const currentUser = OBTENER EL USUARIO ACTUAL

  const resetCard = () => {
    setShowUpdateButtons(false);
    setAmmount(props.group.ammount);
  };

  const handleUpdateGroupAmmount = async () => {
    /* Actualiza la cantidad de elementos en un grupo. 
    Al guardar en el item, genera un nuevo array de grupos con
    el grupo actualizado, y agrega el nuevo array de grupos al changelog
    */
    const updatedGroup = { ...props.group, ammount };
    const updatedGroups = props.updateGroups(updatedGroup);

    try {
      await db
        .collection("items")
        .doc(props.itemId)
        .update({
          groups: updatedGroups,
          changelog: [
            ...props.changelog,
            {
              date: new Date(),
              userId: currentUser.uid,
              groups: updatedGroups,
            },
          ],
        });
      props.setLoading(false);
      history.push("./inventory");
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditGroup = (group) => {
    console.log("este es el grupo a editar", group);
    props.setEditGroup(true);
    props.setSelectedGroupData(group);
  };

  const handleDeleteGroup = async (groupId) => {
    /* Elimina el grupo seleccionado
     */

    const filteredGroups = props.filterGroups(groupId);

    try {
      await db
        .collection("items")
        .doc(props.itemId)
        .update({
          groups: filteredGroups,
          changelog: [
            ...props.changelog,
            {
              date: new Date(),
              userId: currentUser.uid,
              groups: filteredGroups,
            },
          ],
        });
      props.setLoading(false);
      history.push("./inventory");
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="group-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title
            style={{
              fontSize: "1.5em",
              color: "rgb(41, 107, 63)",
            }}
          >
            {props.group.groupname}
          </Card.Title>
          <DropdownButton variant="outline-success" size="sm" title="">
            <Dropdown.Item>
              <Button
                block
                onClick={() => {
                  console.log("vamos a editar el siguiente item", props.group);
                  handleEditGroup(props.group);
                }}
                variant="outline-success"
                style={{ argin: "0px 4px", padding: "4px", fontSize: "0.7em" }}
                size="sm"
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
              <Button
                block
                variant="outline-danger"
                style={{ fontSize: "0.7em" }}
                size="sm"
                onClick={() => {
                  handleDeleteGroup(props.group.id);
                }}
              >
                <img
                  alt="del"
                  src="./img/icons/066-erase.png"
                  style={{ height: "24px", marginRight: "5px" }}
                ></img>
                Borrar
              </Button>
            </Dropdown.Item>
          </DropdownButton>
        </div>

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
              onClick={() => {
                handleUpdateGroupAmmount();
              }}
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
    </Card>
  );
};

const styles = {
  unstyledList: {
    listStyleType: "none",
    margin: "0",
    padding: "0",
  },
};

export default Item;
