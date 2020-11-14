import React, { useState, useContext } from "react";

// General purpose functions
import Utils from "../utilities";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

// Router
import { useHistory } from "react-router-dom";

import AccordionFormWrap from "./AccordionFormWrap.jsx";

/* New Item form ------------------------------------ */

const NewGroupForm = (props) => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const [location, setLocation] = useState("");
  const [sublocation, setSublocation] = useState("");
  const [sublocationlist, setSublocationList] = useState([]);
  const [newlocation, setNewLocation] = useState(false);
  const [newsublocation, setNewSublocation] = useState(false);
  const [ammount, setAmmount] = useState(0);
  const [status, setStatus] = useState("");
  const [newstatus, setNewStatus] = useState(false);
  const [groupname, setGroupName] = useState("");

  const locations = props.inventory.locations.map((loc) => loc.name);

  // const cleanForm = () => {
  //   setName("");
  //   setDescription("");
  //   setCategory("");
  //   setSubcategory("");
  //   setSubcatlist([]);
  //   setLocation("");
  //   setSublocation("");
  //   setSublocationList([]);
  //   setAmmount(0);
  //   setStatus("");
  // };

  const updateInventory = () => {
    let newInventory = props.inventory;
    const hasChanged = newlocation || newsublocation || newstatus;

    if (newlocation) {
      newInventory.locations.push({
        name: location,
        sublocations: [sublocation],
      });
    }
    if (!newlocation && newsublocation) {
      let index = 0;
      newInventory.locations.forEach((loc) => {
        if (loc.name === location) {
          newInventory.locations[index].sublocations.push(sublocation);
        } else {
          index++;
        }
      });
    }
    if (newstatus) {
      newInventory.statuses.push(status);
    }
    return { hasChanged, newInventory };
  };

  const listSublocations = (name, locArray) => {
    let sublocs = [];
    locArray.forEach((loc) => {
      if (loc.name == name) {
        sublocs = loc.sublocations;
      }
    });
    return sublocs;
  };

  const handleCreateGroup = async () => {
    const db = firebaseApp.firestore();

    let groupdata = {
      date: new Date(),
      id: Utils.makeid(10),
      groupname,
      location,
      sublocation,
      status,
      ammount,
    };

    try {
      await db
        .collection("items")
        .doc(props.item.id)
        .update({
          groups: [...props.item.groups, groupdata],
        });
      console.log("Item.jsx dice: Se ha agregado el nuevo grupo al item");
      // AHORa TENGO QUE VER SI HAY NUEVAS OPCIONES QUE AGREGAR AL INVENTARIO Y METERLAS

      history.push("./inventory");
      history.goBack();
    } catch (error) {
      console.log(error);
    }
    // Si se generaron nuevas opciones para el inventario, debo actualizar:
    const { hasChanged, newInventory } = updateInventory();
    if (hasChanged) {
      console.log(
        "Item.jsx dice: El inventario ha recibido nuevas opciones, he aquí la nueva versión:",
        newInventory
      );
      try {
        await db
          .collection("inventories")
          .doc(props.inventory.id)
          .update(newInventory)
          .then(() => {
            console.log(
              "Item.jsx dice: El inventario se ha actualizado con las nuevas opciones"
            );
            history.push("./item");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <AccordionFormWrap title={"Nuevo grupo"}>
      <Form>
        {/* --- NAME ------------------------------------------------------- */}

        <FormGroup>
          <Form.Label>Nombre del grupo: </Form.Label>
          <Form.Text className="text-muted">
            Elije un nombre para identificar al grupo
          </Form.Text>
          <FormControl
            placeholder="Ej: Marca Acme"
            type="text"
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          ></FormControl>
        </FormGroup>

        {/* --- LOCATION ------------------------------------------------------- */}

        <FormGroup>
          <Form.Label>Location: </Form.Label>
          {/* SELECT LOCATION */}
          {!newlocation && (
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setSublocation("");
                setSublocationList(
                  listSublocations(e.target.value, props.inventory.locations)
                );
              }}
            >
              <option value={""}>Elije una ubicación</option>
              {locations.map((cat) => {
                return (
                  <option key={cat.index + "-" + cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </Form.Control>
          )}
          {/* NEW LOCATION INPUT */}
          {newlocation && (
            <FormControl
              placeholder="Ej: Armario C"
              style={{ marginTop: "10px" }}
              type="text"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></FormControl>
          )}
        </FormGroup>

        {/* TOGGLE NEW LOCATION */}

        <Button
          size="sm"
          style={{ marginBottom: "10px" }}
          variant={newlocation ? "warning" : "info"}
          onClick={(e) => {
            e.preventDefault();
            newlocation ? setNewLocation(false) : setNewLocation(true);
          }}
        >
          {newlocation ? "Cancelar" : "Nueva"}
        </Button>
        {/* SUBLOCATION */}
        <FormGroup>
          <Form.Label>Sub-ubicación: </Form.Label>
          {/* SUBLOCATION SELECT */}
          {!newlocation && !newsublocation && (
            <Form.Control
              as="select"
              value={sublocation}
              onChange={(e) => {
                setSublocation(e.target.value);
              }}
            >
              <option value={""}>Elije una sub-ubicacion</option>
              {sublocationlist.map((subloc) => {
                return (
                  <option key={subloc.index + "-" + subloc} value={subloc}>
                    {subloc}
                  </option>
                );
              })}
            </Form.Control>
          )}
          {/* SUBLOCATION INPUT */}
          {(newlocation || newsublocation) && (
            <FormControl
              placeholder="Ej: Estante 3"
              value={sublocation}
              style={{ marginTop: "10px" }}
              type="text"
              onChange={(e) => {
                setSublocation(e.target.value);
              }}
            ></FormControl>
          )}
        </FormGroup>
        {!newlocation && (
          <Button
            size="sm"
            style={{ marginBottom: "10px" }}
            variant={newsublocation ? "warning" : "info"}
            onClick={(e) => {
              e.preventDefault();
              newsublocation
                ? setNewSublocation(false)
                : setNewSublocation(true);
            }}
          >
            {newsublocation ? "Cancelar" : "Nueva"}
          </Button>
        )}

        {/* STATUS ---------------------------------------------*/}

        <FormGroup>
          <Form.Label>Estado: </Form.Label>

          {!newstatus && (
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value={""}>Elije un estado</option>
              {props.inventory.statuses.map((status) => {
                return (
                  <option key={status} value={status}>
                    {status}
                  </option>
                );
              })}
            </Form.Control>
          )}

          {newstatus && (
            <FormControl
              placeholder="Ej: En uso"
              value={status}
              style={{ marginTop: "10px" }}
              type="text"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            ></FormControl>
          )}

          <Button
            size="sm"
            style={{ margin: "10px 0px" }}
            variant={newstatus ? "warning" : "info"}
            onClick={(e) => {
              e.preventDefault();
              newstatus ? setNewStatus(false) : setNewStatus(true);
            }}
          >
            {newstatus ? "Cancelar" : "Nuevo"}
          </Button>
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

        <Button variant="info" block onClick={() => handleCreateGroup()}>
          Agregar item
        </Button>
      </Form>
    </AccordionFormWrap>
  );
};

export default NewGroupForm;
