import gql from "graphql-tag";

export const FETCH_PRODUCTS_QUERY = gql`
  {
    getProducts {
      _id
      name
      description
    }
  }
`;
