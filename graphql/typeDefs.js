const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    password: String!
    confirmPassword: String!
    email: String!
    token: String
    createdAt: String!
  }
  type Product {
    _id: ID!
    name: String!
    description: String!
    category: String!
    size: String!
    price: String!
    quantity: String!
    createdAt: String!
  }
  type Item {
    _id: ID!
  }
  type Order {
    _id: ID!
    userId: ID!
    content: [Item!]!
    amount: String!
    status: String!
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    Users: [User]
    Products: [Product]
    Orders: [Order]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;
