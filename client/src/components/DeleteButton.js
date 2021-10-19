import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { FETCH_PRODUCTS_QUERY } from "../util/graphql";
import MyPopup from "../util/MyPopup";

function DeleteButton({ productId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { refetch } = useQuery(FETCH_PRODUCTS_QUERY);

  const [deleteProductOrMutation] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      refetch();
      if (callback) callback();
    },
    variables: {
      productId,
    },
  });

  return (
    <>
      <MyPopup content="Delete product">
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteProductOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId)
  }
`;

export default DeleteButton;
