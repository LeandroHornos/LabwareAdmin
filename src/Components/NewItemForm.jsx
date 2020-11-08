import React, { useState, useContext } from "react";

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

const NewItemForm = (props) => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [newcat, setNewCat] = useState(false);
  const [newsubcat, setNewSubcat] = useState(false);
  const [subcatlist, setSubcatlist] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [location, setLocation] = useState("");
  const [sublocation, setSublocation] = useState("");
  const [sublocationlist, setSublocationList] = useState([]);
  const [newlocation, setNewLocation] = useState(false);
  const [newsublocation, setNewSublocation] = useState(false);
  const [ammount, setAmmount] = useState(0);
  const [status, setStatus] = useState("");
  const [newstatus, setNewStatus] = useState(false);
  const [groupname, setGroupName] = useState("");

  const categories = props.inventory.categories.map((cat) => cat.name);
  const locations = props.inventory.locations.map((loc) => loc.name);

  const cleanForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setSubcategory("");
    setSubcatlist([]);
    setLocation("");
    setSublocation("");
    setSublocationList([]);
    setAmmount(0);
    setStatus("");
  };

  const listSubcats = (name, catArray) => {
    let subcats = [];
    catArray.forEach((cat) => {
      if (cat.name == name) {
        subcats = cat.subcategories;
      }
    });
    return subcats;
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

  const updateInventory = () => {
    let inventory = props.inventory;
    const hasChanged =
      newcat || newsubcat || newlocation || newsublocation || newstatus;
    if (newcat) {
      inventory.categories.push({
        name: category,
        subcategories: [subcategory],
      });
    }
    if (!newcat && newsubcat) {
      let index = 0;
      inventory.categories.forEach((cat) => {
        if (cat.name === category) {
          inventory.categories[index].subcategories.push(subcategory);
        } else {
          index++;
        }
      });
    }
    if (newlocation) {
      inventory.locations.push({ name: location, sublocations: [sublocation] });
    }
    if (!newlocation && newsublocation) {
      let index = 0;
      inventory.locations.forEach((loc) => {
        if (loc.name === location) {
          inventory.locations[index].sublocations.push(sublocation);
        } else {
          index++;
        }
      });
    }
    if (newstatus) {
      inventory.statuses.push(status);
    }
    return { hasChanged, newInventory: inventory };
  };

  const handleCreateItem = async () => {
    const db = firebaseApp.firestore();

    let data = {
      inventoryId: props.inventory.id,
      creationdate: new Date(),
      creatorId: currentUser.uid,
      name,
      description,
      category,
      subcategory,
      groups: [
        {
          date: new Date(),
          groupname,
          location,
          sublocation,
          status,
          ammount,
        },
      ],
    };
    data = {
      ...data,
      changelog: [
        {
          date: data.creationdate,
          userId: currentUser.uid,
          groups: data.groups,
        },
      ],
    };
    console.log("he aqui la data a guardar", data);
    try {
      await db
        .collection("items")
        .add(data)
        .then((docref) => {
          console.log(
            "El item se guardó con éxito, aquí está su id:",
            docref.id
          );
        });
    } catch (error) {
      console.log(error);
    }

    console.log("he aqui la data", data);
    const { hasChanged, newInventory } = updateInventory();
    if (hasChanged) {
      /* Meter aquí el guardado a la base de datos */
      console.log(
        "El inventario ha recibido nuevas opciones, he aquí la nueva versión:",
        newInventory
      );
      try {
        await db
          .collection("inventories")
          .doc(props.inventory.id)
          .update(newInventory)
          .then(() => {
            console.log(
              "El inventario se ha actualizado con las nuevas opciones"
            );
            props.setReload(true);
            cleanForm();
          });
      } catch (error) {
        console.log(error);
      }
    }

    // cleanForm();
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
            as="textarea"
            rows={3}
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
        {/* ---------------- FIN LOCATION  ----------- */}
        <FormGroup>
          {/* STATUS */}

          <Form.Label>Estado: </Form.Label>

          {/* STATUS SELECT */}
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

          {/* STATUS INPUT */}
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

          {/* STATUS BOTON NUEVA OPCION */}
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
        <FormGroup>
          <Form.Label>Grupo: </Form.Label>
          <FormControl
            placeholder="Ej: Guardados en depósito"
            type="text"
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
          ></FormControl>
          <Form.Text className="text-muted">
            Puedes crear distintos grupos dentro de un mismo item, por ejemplo
            para distribuir el stock entre diferentes marcas, ubicaciones o
            estados
          </Form.Text>
        </FormGroup>
        <Button variant="info" block onClick={() => handleCreateItem()}>
          Agregar item
        </Button>
      </Form>
    </AccordionFormWrap>
  );
};

export default NewItemForm;
