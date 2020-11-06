import React from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


/* ItemsWall -------------------------------------- */

const ItemsWall = (props) => {
    const triplets = groupAsTriplets(props.items);
    return triplets.map((triplet) => {
      return (
        <div className="row">
          {triplet.map((item) => {
            return (
              <div className="col-lg-4">
                <Card className="item-card">
                  <Card.Header className="item-card-header"></Card.Header>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="success">Editar</Button>
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

  
  export default ItemsWall