import React from "react";
import Utils from "../utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Router
import { useHistory } from "react-router-dom";

/* ItemsWall -------------------------------------- */

const ItemsWall = (props) => {
  const history = useHistory();
  const triplets = Utils.groupAsTriplets(props.items);
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
                  <Card.Title>{item.name}</Card.Title>
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
