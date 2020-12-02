import React, { useState, useEffect, useContext } from "react";

// Bootstrap components
import GuiTexts from "./GuiTexts.js";

// Firebase
import firebaseApp from "../firebaseApp";
import { AuthContext } from "../Auth";

import { useHistory } from "react-router-dom";

// Components
import NavigationBar from "./NavigationBar.jsx";
import InventoryForm from "./InventoryForm.jsx";
import InventoriesWall from "./InventoriesWall.jsx";

const Inventories = (props) => {
  const txt = GuiTexts.Inventories; // Da el texto correspondiente al idioma seleccinado
  // Firebase:
  const db = firebaseApp.firestore();
  const ref = db.collection("inventories");

  // Auth:
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  // STATE:
  const [loading, setLoading] = useState(true); // Carga de la vista principal
  const [formLoading, setFormLoading] = useState(true); // Carga del formulario lateral/superior
  const [items, setItems] = useState([]); // Almacena los inventarios
  const [editMode, setEditMode] = useState(false); // Determina el comportamiento de InventoryForm
  const [selectedInventoryData, setSelectedInventoryData] = useState({});
  const reload = false;

  // METHODS:

  useEffect(() => {
    // Cargar los inventarios al acceder a esta ruta:

    const fetchData = async () => {
      try {
        await ref
          .where("users", "array-contains", currentUser.uid)
          .get()
          .then((inventories) => {
            const items = inventories.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            });
            setItems(items);
            setLoading(false);
            setFormLoading(false);
          });
      } catch (error) {
        console.log(error);
        history.push("/error");
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // RENDER
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="row" style={{ marginTop: "50px" }}>
        <div
          className="col-md-3 inventory-sidepanel"
          style={{
            marginBottom: "20px",
            backgroundImage: "url(./img/wavecut.png)",
          }}
        >
          {!formLoading && (
            <InventoryForm
              updateCurrentInventory={props.updateCurrentInventory}
              editMode={editMode}
              lang={props.lang}
              inventory={selectedInventoryData}
            />
          )}
        </div>
        <div
          className="col-md-9"
          style={{ minHeight: "100vh", padding: "10px 0px" }}
        >
          <h1 style={{ marginBottom: "40px", padding: "20px" }}>
            {txt.title[props.lang] + ": "}
          </h1>
          {loading ? (
            "Cargando Inventarios..."
          ) : (
            <InventoriesWall
              items={items} // Contenido para mostrar en las  tarjetas
              updateCurrentInventory={props.updateCurrentInventory} // Setear en state de <App/> el id del inventario activo
              setSelectedInventoryData={setSelectedInventoryData} // Cargar en state de <Inventories/> el inventario a editar
              setEditMode={setEditMode} // Setear en state de <Inventories/> el modo del formulario (Nuevo/Editar)
              setFormLoading={setFormLoading} // Setear en state de <Inventories/> mostrar/ocultar el formularion de Nuevo/Editar
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inventories;
