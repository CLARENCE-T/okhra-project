const productsResolvers = require("./products");
const usersResolvers = require("./users");
const ordersResolvers = require("./orders");

module.exports = {
  Query: {
    ...productsResolvers.Query,
    ...usersResolvers.Query,
    ...ordersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...productsResolvers.Mutation,
    ...ordersResolvers.Mutation,
  },
};
