import React from "react";
import Utils from "../utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Router
import { useHistory } from "react-router-dom";

/* ItemsWall -------------------------------------- */

const ItemsWall = (props) => {
  const history = useHistory();
  const triplets = Utils.groupAsTriplets(props.items);

  const HandleEditItem = (itemData) => {
    props.setFormLoading(true); // Oculta el formulario mientras se carga la data
    props.setActiveTab("edit"); // Cambio la solapa activa a Edit
    props.setEditMode(true); // Activo el modo edicion para que el form sepa que debe cargar los datos que vienen por props en los inputs
    props.setSelectedItemData(itemData); // Carga los datos del item seleccionado en el state de inventario y los recibo por props en itemForm
    props.setFormLoading(false); // Hechos los cambios, muestro el formulario.
  };

  return triplets.map((triplet) => {
    return (
      <div className="row" key={Utils.makeid}>
        {triplet.map((item) => {
          return (
            <div
              className="col-lg-4"
              style={{ marginBottom: "20px" }}
              key={Utils.makeid}
            >
              <Card className="item-card">
                <Card.Header className="item-card-header"></Card.Header>
                <Card.Body className="d-flex flex-column justify-content-between align-items-left">
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{item.name}</Card.Title>
                    <DropdownButton
                      variant="outline-success"
                      size="sm"
                      title=""
                    >
                      <Dropdown.Item>
                        {/* --- Edit Item Button --- */}
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
                            HandleEditItem(item);
                          }}
                        >
                          <img
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
                        >
                          <img
                            src="./img/icons/066-erase.png"
                            style={{ height: "24px", marginRight: "5px" }}
                          ></img>
                          Borrar
                        </Button>
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <Card.Text>
                    {Utils.getTextPreview(item.description, 140)}
                  </Card.Text>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      props.updateCurrentItem(item.id);
                      history.push("./item");
                    }}
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

export default ItemsWall;
