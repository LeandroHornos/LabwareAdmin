import React, { useState, useEffect, useContext } from "react";

/* React-Bootstrap */
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";

// Router
import { useHistory } from "react-router-dom";

/* Firebase */
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

/* App Components */
import NavigationBar from "./NavigationBar.jsx";
import ItemForm from "./ItemForm.jsx";
import ItemsWall from "./ItemsWall.jsx";
import CircleSpinner from "./CircleSpinner.jsx";

/* Inventory ----------------------------------------- */

const Inventory = (props) => {
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(true); // Carga del formulario lateral/superior
  const [inventory, setInventory] = useState(null); // Contiene la info del inventario al que corresponden los items
  const [items, setItems] = useState([]); // Contiene los items a mostrarse en el muro de items
  const [filter, setFilter] = useState(true); // Indica si mostrar la búsqueda o el formulario
  const [editMode, setEditMode] = useState(false); // Determina el comportamiento de ItemForm
  const [selectedItemData, setSelectedItemData] = useState({}); // Contiene la info actual del item a editar
  const [activeTab, setActiveTab] = useState("filter"); // Determina el boton activo del menu de tabs en panel izquierdo
  const [users, setUsers] = useState([]);

  // Firebase
  const db = firebaseApp.firestore();
  const refInventories = db.collection("inventories");
  const refItems = db.collection("items");
  const usersRef = db.collection("users");
  const { currentUser } = useContext(AuthContext);

  // Router
  const history = useHistory();

  // Methods

  const classifyUsers = (usersArray, inventoryData) => {
    /* Luego de obtener los datos de todos los usuarios que figuran en el array "users" del inventario,
    quiero clasificarlos en el creador, los editores y los invitados para mostrar una tabla de roles en 
    pantalla. Para ello, clasifico los elementos en el array de usuarios en base a si sus uids coinciden o no
    con los que figuran como creador o editores en el inventario. 
    Devuelvo un objeto con el creador y un array para cada rol */

    const creatorSearch = usersArray.filter((user) => {
      return user.uid === inventoryData.creator; // Busco en el array de users aquel cuyo id es el del creador del inventario
    });
    const creator = creatorSearch[0]; // Debo tener un solo resultado porque hay un solo creador por inventario
    const editors = usersArray.filter((user) => {
      return (
        inventoryData.editors.includes(user.uid) &&
        user.uid != inventoryData.creator
      ); // Devuelvo aquellos usuarios cuyos uid estan en el array "editors" del inventario y que no son el creador
    });
    const others = inventoryData.users.filter((user) => {
      return !inventoryData.editors.includes(user); // Filtro del array "users" aquellos que tambien están en "editors", los que quedan son los invitados
    });
    const guests = usersArray.filter((user) => {
      return others.includes(user.uid); // Con la lista de uids de los invitados, filtro el array de usuarios
    });
    console.log("Usuarios clasificados", { creator, editors, guests });
  };

  const handleAddUserToInventory = async (user) => {
    const { email, role } = user;
    let { users, editors } = inventory;

    try {
      console.log(("email a buscar", email));
      const result = await usersRef.where("email", "==", email).get(); //Obtener usuario por email, recuperar id
      const matches = result.docs.map((doc) => {
        return { ...doc.data() };
      });
      const user = matches[0]; //Solo debe haber un resultado en el array

      console.log("este seria el usuario:", user);

      users.push(user.uid); // Agregar uid a users
      if (role === "editor") {
        editors.push(user.uid); // Si es editor, agregar uid a editors
      }
      await refInventories.doc(inventory.id).update({ users, editors }); // actualizar inventario
      console.log("El usuario se ha agregado con exito al inventario");
      history.push("./inventories");
      history.goBack();
    } catch (error) {
      console.log(error);
      history.push("./error");
    }
  };

  useEffect(() => {
    const fetchInventoryUsers = async (inventory) => {
      /* Obtiene la información de los usuarios que tienen acceso al inventario,
      a partir del array de usuarios. Luego los clasifica segun su rol */
      const idsArray = inventory.users;
      // Obtiene la info de los usuarios del inventario
      try {
        let dbResponse = await usersRef.where("uid", "in", idsArray).get();
        const inventoryUsers = dbResponse.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setUsers(inventoryUsers);
        console.log("los usuarios del inventario son:", inventoryUsers);
        classifyUsers(inventoryUsers, inventory);
      } catch (error) {
        console.log(error);
        history.push("/error");
      }
    };

    const fetchData = async () => {
      try {
        const inventoryDoc = await refInventories.doc(props.inventoryId).get();
        const data = { ...inventoryDoc.data(), id: inventoryDoc.id };
        await fetchInventoryUsers(data);
        setInventory(data);
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
        history.push("./error");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                // activeClassName="tabs-active-nav-item"
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
                // activeClassName="tabs-active-nav-item"
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
            <CircleSpinner />
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
    <React.Fragment>
      <div className="row">
        <div className="col-sm-6" style={{ padding: "15px" }}>
          <h1>{props.inventory.name}</h1>
          <p>{props.inventory.description}</p>
        </div>
        <div
          className="col-sm-6"
          style={{
            padding: "40px 15px",
          }}
        >
          <h4>Usuarios</h4>
          <div
            style={{ padding: "0px", maxHeight: "150px", overflowY: "auto" }}
          >
            <Table responsive size="sm" style={{ fontSize: "0.7em" }}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>pepito@gmail.com</td>
                  <td>Editor</td>
                </tr>
                <tr>
                  <td>jorgito@hotmail.com</td>
                  <td>Invitado</td>
                </tr>
                <tr>
                  <td>pepito@gmail.com</td>
                  <td>Editor</td>
                </tr>
                <tr>
                  <td>jorgito@hotmail.com</td>
                  <td>Invitado</td>
                </tr>
                <tr>
                  <td>pepito@gmail.com</td>
                  <td>Editor</td>
                </tr>
                <tr>
                  <td>jorgito@hotmail.com</td>
                  <td>Invitado</td>
                </tr>
                <tr>
                  <td>pepito@gmail.com</td>
                  <td>Editor</td>
                </tr>
                <tr>
                  <td>jorgito@hotmail.com</td>
                  <td>Invitado</td>
                </tr>
                <tr>
                  <td>pepito@gmail.com</td>
                  <td>Editor</td>
                </tr>
                <tr>
                  <td>jorgito@hotmail.com</td>
                  <td>Invitado</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const AddUserForm = (props) => {
  /* Brinda un formulario para agregar usuarios a un inventario.
  La funcion para actualizar la base de datos se recibe por props 
  desde <Inventory /> para dejar que sea el componente padre el 
  que se comunique con firebase */
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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
            que los invitados sólo pueden consultar la información. Solo el
            creador del inventario puede agregar o quitar usuarios y definir
            roles.
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
