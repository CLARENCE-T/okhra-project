const { ApolloServer } = require("apollo-server");

const mongoDb = require("./config/db.js");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Connect DB
mongoDb
  .then(() => {
    console.log("connect to the database");
    server.listen({ port: 3000 });
  })
  .then(() => {
    console.log(`Server is running at 3000`);
  })
  .catch((err) => console.log("failed to connect:" + err));
