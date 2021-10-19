const { gql } = require("graphql-tag");

module.exports = gql`
  type Query {
    users: [User]
    user(userId: ID!): User!
    getProducts: [Product]!
    getProduct(productId: ID!): Product!
    orders: [Order!]!
    order(orderId: ID!): Order!
  }
  type Mutation {
    addProduct(productInput: ProductInput!): Product!
    deleteProduct(productId: ID!): String!
    register(registerInput: RegisterInput!): User!
    login(email: String!, password: String!): User!
    createOrder(body: String!): Order!
    deleteOrder(orderId: ID!): String!
  }
  # USERS
  type User {
    _id: ID!
    firstName: String
    lastName: String
    username: String
    password: String
    confirmPassword: String
    email: String!
    admin: Boolean!
    token: String
    createdAt: String
  }
  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }
  # PRODUCTS
  type Product {
    _id: ID!
    name: String!
    description: String
    category: String
    price: Int
    quantity: Int
    createdAt: String!
  }
  input ProductInput {
    name: String!
    description: String!
  }
  # ORDERS
  type Order {
    _id: ID!
    userId: ID!
    content: [ContentObject!]!
    amount: String!
    status: String!
    createdAt: String!
  }
  type ContentObject {
    productId: ID!
    quantity: Int!
  }
`;
