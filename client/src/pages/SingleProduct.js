import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { Card, Grid, Image, Icon, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";

function SingleProduct(props) {
  const productId = props.match.params.productId;
  const { user } = useContext(AuthContext);

  const { data } = useQuery(FETCH_PRODUCT_QUERY, {
    variables: {
      productId,
    },
  });

  function deleteProductCallback() {
    props.history.push("/");
  }

  let productMarkup;

  if (!data || data.length < 0) {
    productMarkup = <p>Loading product..</p>;
  } else {
    const { name, description, createdAt } = data.getProduct;
    const date = new Date(parseInt(createdAt));

    productMarkup = (
      <Grid>
        <Grid.Row>
          <Button animated onClick={() => props.history.push("/home/products")}>
            <Button.Content visible>Back</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
          <Grid.Column width={4}>
            <Card>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                  <span className="date">
                    {moment(date, "DD-MM-YYYY").fromNow()}
                  </span>
                </Card.Meta>
                <Card.Description>{description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  22 Friends
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return productMarkup;
}

const FETCH_PRODUCT_QUERY = gql`
  query ($productId: ID!) {
    getProduct(productId: $productId) {
      _id
      name
      description
      createdAt
    }
  }
`;

export default SingleProduct;
