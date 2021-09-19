const { gql } = require("graphql-tag");

module.exports = gql`
  type Query {
    users: [User]
    user(userId: ID!): User!
    products: [Product]!
    product(productId: ID!): Product!
    orders: [Order!]!
    order(orderId: ID!): Order!
  }
  type Mutation {
    addProduct(body: String!): Product!
    deleteProduct(productId: ID!): String!
    createOrder(body: String!): Order!
    deleteOrder(orderId: ID!): String!
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    adminLogin(username: String!, email: String!, password: String!): Admin!
    createAdmin(adminInfo: AdminInfo): Admin!
  }
  # ADMIN
  type Admin {
    _id: ID!
    password: String!
    email: String!
    token: String
    username: String!
  }
  input AdminInfo {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  # USERS
  type User {
    _id: ID!
    firstName: String
    lastName: String
    password: String!
    confirmPassword: String
    email: String!
    token: String
    createdAt: String!
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
    category: String!
    size: String
    price: Int
    quantity: Int
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
