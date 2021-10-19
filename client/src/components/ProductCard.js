import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import DeleteButton from "./DeleteButton";

function ProductCard({ product: { name, _id, description, createdAt } }) {
  const date = new Date(parseInt(createdAt));

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/products/${_id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{moment(date, "DD-MM-YYYY").fromNow()}</Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <DeleteButton productId={_id} />
      </Card.Content>
    </Card>
  );
}

export default ProductCard;
