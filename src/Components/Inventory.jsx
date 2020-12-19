import React, { useState, useEffect, useContext } from "react";

import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

/* Firebase */
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

import NavigationBar from "./NavigationBar.jsx";
import ItemForm from "./ItemForm.jsx";
import ItemsWall from "./ItemsWall.jsx";

/* Inventory ----------------------------------------- */

const Inventory = (props) => {
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(true); // Carga del formulario lateral/superior
  const [inventory, setInventory] = useState(null); // Contiene la info del inventario al que corresponden los items
  const [items, setItems] = useState([]); // Contiene los items a mostrarse en el muro de items
  const [filter, setFilter] = useState(true); // Indica si mostrar la búsqueda o el formulario
  const [editMode, setEditMode] = useState(false); // Determina el comportamiento de ItemForm
  const [selectedItemData, setSelectedItemData] = useState({}); // Contiene la info actual del item a editar
  const [activeTab, setActiveTab] = useState("filter");
  const reload = false; //Variable para evitar que useEffect() haga un loop infinito, cambiar por array vacio?

  // Firebase
  const db = firebaseApp.firestore();
  const refInventories = db.collection("inventories");
  const refItems = db.collection("items");
  const { currentUser } = useContext(AuthContext);

  // Methods

  const handleAddUserToInventory = (user) => {
    const { email, role } = user;
    //Obtener usuario por email, recuperar id
    // Agregar id a users
    // role == "editor"? entonces agregar a editors
    // actualizar inventario
    console.log(email, role);
  };

  useEffect(() => {
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
        setFormLoading(false);
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
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [editMode]);

  useEffect(() => {
    activeTab === "filter" ? setFilter(true) : setFilter(false);
  }, [activeTab]);

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          className="col-md-5 col-lg-3 inventory-sidepanel"
          style={{ backgroundImage: "url(./img/wavecut.png)" }}
        >
          <div style={{ padding: "20px" }}>
            <Nav
              fill
              variant="tabs"
              activeKey={activeTab}
              className="tabs-form-nav"
            >
              <Nav.Item
                className="tabs-nav-item"
                activeClassName="tabs-active-nav-item"
              >
                <Nav.Link
                  className="tabs-nav-link"
                  variant="success"
                  eventKey="filter"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Filtrar");
                    setActiveTab("filter");
                  }}
                >
                  Filtrar
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                className="tabs-nav-item"
                activeClassName="tabs-active-nav-item"
              >
                <Nav.Link
                  className="tabs-nav-link"
                  eventKey="edit"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Editar/Nuevo");
                    setActiveTab("edit");
                  }}
                >
                  {editMode ? "Editar item" : "Nuevo item"}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          {filter
            ? !formLoading && <SearchItemForm inventory={inventory} />
            : !formLoading && (
                <ItemForm
                  inventory={inventory}
                  item={selectedItemData}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  updateCurrentItem={props.updateCurrentItem}
                  lang={props.lang}
                />
              )}
        </div>
        <div
          className="col-md-7 col-lg-9"
          style={{ minHeight: "100vh", padding: "0" }}
        >
          {loading ? (
            "Cargando..."
          ) : (
            <React.Fragment>
              <InventoryInfo inventory={inventory} />
              {currentUser.uid === inventory.creator && (
                <AddUserForm add={handleAddUserToInventory} />
              )}
              <ItemsWall
                items={items}
                updateCurrentItem={props.updateCurrentItem}
                setSelectedItemData={setSelectedItemData} // Cargar en state de <Inventory /> el item a editar
                setEditMode={setEditMode}
                setActiveTab={setActiveTab} // Setear en state de <Inventory /> el modo del formulario (Nuevo/Editar)
                setFormLoading={setFormLoading} // Setear en state de <Inventory /> mostrar/ocultar el formulario de Nuevo/Editar
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

// Subcomponents:

const InventoryInfo = (props) => {
  return (
    <div style={{ padding: "15px" }}>
      <h1>{props.inventory.name}</h1>
      <p>{props.inventory.description}</p>
    </div>
  );
};

const AddUserForm = (props) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {}, [email, role]);

  const isValid = () => {
    let emailIsValid = email.includes("@") && email.includes("."); // Validación muy básica, en la db se comprueba la existencia del email
    let roleIsValid = role !== "";

    return emailIsValid && roleIsValid;
  };

  return (
    <Form style={{ padding: "40px 0px" }}>
      <div className="row">
        <div className="col-12">
          <h4>Agrega un usuario</h4>
          <p style={{ fontSize: "0.8em" }}>
            Introduce el email de un usuario con quien deseas compartir el
            inventario. Los editores pueden crear y modificar items, mientras
            que los invitados sólo pueden consultar la información.
            Solo el creador del inventario puede agregar o quitar usuarios y definir roles.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6" style={{ padding: "10px" }}>
          <FormControl
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></FormControl>
        </div>
        <div className="col-sm-3" style={{ padding: "10px" }}>
          <FormControl
            as="select"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="">Rol del usuario...</option>
            <option value="guest">Invitado</option>
            <option value="editor">Editor</option>
          </FormControl>
        </div>
        <div className="col-sm-3" style={{ padding: "10px" }}>
          <Button
            disabled={!isValid()}
            block
            variant="outline-success"
            onClick={(e) => {
              e.preventDefault();
              props.add({ email, role });
            }}
          >
            Agregar
          </Button>
        </div>
      </div>
    </Form>
  );
};

const SearchItemForm = (props) => {
  return (
    <div style={{ padding: "20px" }}>
      {" "}
      <h3>Filtrar</h3>
      <p style={{ color: "white" }}>
        Usa las siguientes opciones para filtrar los resultados
      </p>
    </div>
  );
};

export default Inventory;
