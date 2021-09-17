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
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
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
  # input AddProductInput {
  #   name: String!
  #   # category: String!
  # }
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
