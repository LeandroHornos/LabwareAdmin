import React, { useState, useEffect, useContext } from "react";

// Bootstrap components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

import GuiTexts from "./GuiTexts.js";

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
  const txt = GuiTexts.InventoryForm;

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
      creatoruid: currentUser.uid,
      lastupdated: new Date(),
      roles: [{ uid: currentUser.uid, role: "admin" }],
      users: [currentUser.uid],
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

  // RENDER:

  return (
    <AccordionFormWrap
      title={txt.newInventoryTitle[props.lang]}
      defaultActiveKey={props.editMode ? "0" : "1"}
    >
      <Form>
        <FormGroup>
          <Form.Label>{txt.name[props.lang] + ": "}</Form.Label>
          <FormControl
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>{txt.description[props.lang] + ": "}</Form.Label>
          <FormControl
            value={description}
            as="textarea"
            rows={3}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <Button onClick={() => handleCreateInventory()} variant="info" block>
          {txt.create[props.lang]}
        </Button>
      </Form>
    </AccordionFormWrap>
  );
};

export default InventoryForm;
