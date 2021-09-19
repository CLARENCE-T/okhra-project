const productsResolvers = require("./products");
const usersResolvers = require("./users");
const ordersResolvers = require("./orders");
const adminsResolvers = require("./admins");

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
    ...adminsResolvers.Mutation,
  },
};
