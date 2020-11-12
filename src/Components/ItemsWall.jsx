import React from "react";
import Utils from "../utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Router
import { useHistory } from "react-router-dom";

/* ItemsWall -------------------------------------- */

const ItemsWall = (props) => {
  const history = useHistory();
  const triplets = groupAsTriplets(props.items);
  return triplets.map((triplet) => {
    return (
      <div className="row">
        {triplet.map((item) => {
          return (
            <div className="col-lg-4" style={{ marginBottom: "20px" }}>
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

/* Auxiliary functions ------------------------------ */

const groupAsTriplets = (items) => {
  // Create a 2D array where every element is an array of 3 items.
  // It can be used to make rows with 3 items each.

  let triplets = [];
  let triplet = [];
  let count = 0;
  items.forEach((item) => {
    if (count < 2) {
      triplet.push(item);
      count++;
    } else {
      triplet.push(item);
      triplets.push(triplet);
      triplet = [];
      count = 0;
    }
  });
  if (triplet.length > 0) {
    triplets.push(triplet);
  }
  return triplets;
};

export default ItemsWall;
