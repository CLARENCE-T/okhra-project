import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { FETCH_PRODUCTS_QUERY } from "../util/graphql";

function Products() {
  const { user } = useContext(AuthContext);
  const { loading, data, refetch } = useQuery(FETCH_PRODUCTS_QUERY);

  return (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Recent Products</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <ProductForm />
          </Grid.Column>
        )}

        <Button
          style={{ margin: 13 }}
          secondary
          position="right"
          onClick={() => refetch()}
        >
          Refetch!
        </Button>
        {loading ? (
          <h1>Loading products..</h1>
        ) : (
          <Transition.Group>
            {data.getProducts &&
              data.getProducts.map((product) => (
                <Grid.Column style={{ marginBottom: 20 }} key={product._id}>
                  <ProductCard product={product} key={product._id} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Products;
