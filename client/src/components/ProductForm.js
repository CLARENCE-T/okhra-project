import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { useForm } from "../util/hooks";
import { FETCH_PRODUCTS_QUERY } from "../util/graphql";

function ProductForm() {
  const { refetch } = useQuery(FETCH_PRODUCTS_QUERY);
  const { values, onChange, onSubmit } = useForm(addProductCallback, {
    name: "",
    description: "",
  });

  const [addProduct, { error }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: values,
    update() {
      refetch();
      values.name = "";
      values.description = "";
    },
  });

  function addProductCallback() {
    addProduct();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Ajouter un Produit</h2>
        <Form.Field>
          <Form.Input
            placeholder="Nom"
            name="name"
            onChange={onChange}
            value={values.name}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Description"
            name="description"
            onChange={onChange}
            value={values.description}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error &&
        console.log(error) &
        (
          <div className="ui error message" style={{ marginBottom: 20 }}>
            <ul className="list">
              <li>{error.message}</li>
            </ul>
          </div>
        )}
    </>
  );
}

const CREATE_PRODUCT_MUTATION = gql`
  mutation addProduct($name: String!, $description: String!) {
    addProduct(productInput: { name: $name, description: $description }) {
      _id
      description
      name
    }
  }
`;

export default ProductForm;
