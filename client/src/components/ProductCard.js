import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function ProductCard({ product: { name, _id, description, createdAt } }) {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${_id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <DeleteButton productId={_id} />
      </Card.Content>
    </Card>
  );
}

export default ProductCard;
