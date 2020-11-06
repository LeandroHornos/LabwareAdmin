import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormControl, FormGroup } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";
// import { AuthContext } from "../Auth";

// Router
import { useHistory } from "react-router-dom";

import AccordionFormWrap from "./AccordionFormWrap.jsx";

/* New Item form ------------------------------------ */

const NewItemForm = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newcat, setNewCat] = useState(false);
  const [newsubcat, setNewSubcat] = useState(false);
  const [subcatlist, setSubcatlist] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [sublocation, setSublocation] = useState("");
  const [ammount, setAmmount] = useState(0);
  const [status, setStatus] = useState("");

  const categories = props.inventory.categories.map((cat) => cat.catname);

  const cleanForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setLocation("");
    setSublocation("");
    setAmmount(0);
    setStatus("");
  };

  const listSubcats = (catname, catArray) => {
    let subcats = [];
    catArray.forEach((cat) => {
      if (cat.catname == catname) {
        subcats = cat.subcategories;
      }
    });
    return subcats;
  };

  const handleCreateItem = async () => {
    const db = firebaseApp.firestore();
    let data = {
      inventoryId: props.inventory.id,
      creationdate: new Date(),
      name,
      description,
      category,
      subcategory,
      groups: [
        {
          date: new Date(),
          groupname: "default",
          location,
          sublocation,
          status,
          ammount,
        },
      ],
    };
    data = { ...data, changelog: data.groups };
    // try {
    //   await db
    //     .collection("items")
    //     .add(data)
    //     .then((docref) => {
    //       console.log(
    //         "El item se guardó con éxito, aquí está su id:",
    //         docref.id
    //       );
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // history.push("./inventory");
    // cleanForm();(
    console.log("he aqui la data", data);
  };

  return (
    <AccordionFormWrap title={"Nuevo item"}>
      <Form>
        <FormGroup>
          <Form.Label>Nombre: </Form.Label>
          <FormControl
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>Descripción: </Form.Label>
          <FormControl
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>Categoria: </Form.Label>
          {/* Si no voy a generar una nueva categoría muestro un menu 
          select con las opciones que tengo en el inventario, 
          caso contrario muestro un input */}
          {!newcat && (
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
                setSubcatlist(
                  listSubcats(e.target.value, props.inventory.categories)
                );
              }}
            >
              <option value={""}>Elije una categoría</option>
              {categories.map((cat) => {
                return (
                  <option key={cat.index + "-" + cat} value={cat}>
                    {cat}
                  </option>
                );
              })}
            </Form.Control>
          )}

          {newcat && (
            <FormControl
              placeholder="Nombre de la categoría"
              style={{ marginTop: "10px" }}
              type="text"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            ></FormControl>
          )}
        </FormGroup>
        <Button
          size="sm"
          style={{ marginBottom: "10px" }}
          variant={newcat ? "warning" : "info"}
          onClick={(e) => {
            e.preventDefault();
            newcat ? setNewCat(false) : setNewCat(true);
          }}
        >
          {newcat ? "Cancelar" : "Nueva"}
        </Button>
        <FormGroup>
          <Form.Label>Subcategoria: </Form.Label>

          {!newcat && !newsubcat && (
            <Form.Control
              as="select"
              value={subcategory}
              onChange={(e) => {
                setSubcategory(e.target.value);
              }}
            >
              <option value={""}>Elije una subcategoría</option>
              {subcatlist.map((subcat) => {
                return (
                  <option key={subcat.index + "-" + subcat} value={subcat}>
                    {subcat}
                  </option>
                );
              })}
            </Form.Control>
          )}

          {(newcat || newsubcat) && (
            <FormControl
              placeholder="Nombre de la subcategoría"
              value={subcategory}
              style={{ marginTop: "10px" }}
              type="text"
              onChange={(e) => {
                setSubcategory(e.target.value);
              }}
            ></FormControl>
          )}
        </FormGroup>
        {!newcat && (
          <Button
            size="sm"
            style={{ marginBottom: "10px" }}
            variant={newsubcat ? "warning" : "info"}
            onClick={(e) => {
              e.preventDefault();
              newsubcat ? setNewSubcat(false) : setNewSubcat(true);
            }}
          >
            {newsubcat ? "Cancelar" : "Nueva"}
          </Button>
        )}
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
        <FormGroup>
          <Form.Label>Ubicación: </Form.Label>
          <FormControl
            type="text"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>Sub-ubicación: </Form.Label>
          <FormControl
            type="text"
            value={sublocation}
            onChange={(e) => {
              setSublocation(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <FormGroup>
          <Form.Label>Estado: </Form.Label>
          <FormControl
            type="text"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          ></FormControl>
        </FormGroup>
        <Button variant="info" block onClick={() => handleCreateItem()}>
          Agregar item
        </Button>
      </Form>
    </AccordionFormWrap>
  );
};

export default NewItemForm;
