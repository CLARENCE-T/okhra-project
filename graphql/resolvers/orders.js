const Order = require("../../models/order.model");

module.exports = {
  Query: {
    async Orders() {
      try {
        const orders = await Order.find();
        return orders;
      } catch (err) {
        throw new Error(`il y a une erreur:  ${err}`);
      }
    },
  },
};
