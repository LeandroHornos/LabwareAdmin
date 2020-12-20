import React, { useState, useEffect, useContext } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

import GuiTexts from "../GuiTexts.js";

// Router
import { useHistory } from "react-router-dom";

// Firebase
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";
import InventorySchema from "../Models/InventorySchema";

// Components
import AccordionFormWrap from "./AccordionFormWrap.jsx";

const InventoryForm = (props) => {
  // Browsing:
  const history = useHistory();

  // Auth:
  const { currentUser } = useContext(AuthContext);

  // Gui:
  const txt = GuiTexts.InventoryForm[props.lang];

  // STATE:
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // LIFE CICLE:

  useEffect(() => {
    /* Selecciona el modo. Si hay que editar un inventario
     existente que se recibe por props, se actualiza el estado
     con dicha info para mostrarla en los inputs. Caso contrario se
     muestran las entradas en blanco. */
    if (props.editMode) {
      setName(props.inventory.name);
      setDescription(props.inventory.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [props]);

  // METHODS:

  const handleCreateInventory = async () => {
    const db = firebaseApp.firestore();

    const data = {
      ...InventorySchema,
      name,
      description,
      date: new Date(),
      creator: currentUser.uid,
      lastupdated: new Date(),
      users: [currentUser.uid],
      editors: [currentUser.uid],
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
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      history.push("./error");
    }
  };

  const handleUpdateInventory = async () => {
    const db = firebaseApp.firestore();

    // Save data to database
    try {
      await db
        .collection("inventories")
        .doc(props.inventory.id)
        .update({ name, description, lastupdated: new Date() });
      history.push("./welcome");
      history.goBack();
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      history.push("./error");
    }
  };

  // RENDER:

  return (
    <AccordionFormWrap
      title={txt.newInventoryTitle}
      defaultActiveKey={props.editMode ? "0" : "1"}
    >
      <Form>
        <FormGroup>
          <Form.Label>{txt.name}</Form.Label>
          <FormControl
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>{txt.description + ": "}</Form.Label>
          <FormControl
            value={description}
            as="textarea"
            rows={3}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <Button
          onClick={() =>
            props.editMode ? handleUpdateInventory() : handleCreateInventory()
          }
          variant="info"
          block
        >
          {props.editMode ? txt.update : txt.create}
        </Button>
      </Form>
    </AccordionFormWrap>
  );
};

export default InventoryForm;
