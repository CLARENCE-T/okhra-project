const { ApolloServer } = require("apollo-server");

const mongoDb = require("./config/db.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config({ path: "./config/.env" });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const port = process.env["PORT"] || 80;

//Connect DB
mongoDb
  .then(() => {
    console.log("connect to the database");
    server.listen({ port: port });
  })
  .then(() => {
    console.log(`Server is running at ${port}`);
  })
  .catch((err) => {
    console.log("failed to connect:" + err);
    process.exit(1);
  });
