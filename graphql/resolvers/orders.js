const { AuthenticationError, UserInputError } = require("apollo-server");

const Order = require("../../models/order.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async orders() {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
    async order(_, { orderId }) {
      try {
        const order = await Order.findById(orderId);
        if (order) {
          return order;
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createOrder(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Order body must not be empty");
      }

      const newOrder = new Order({
        body,
        user: user.id,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      const order = await newOrder.save();

      // context.pubsub.publish("NEW_POST", {
      //   newOrder: order,
      // });

      return order;
    },
    async deleteOrder(_, { orderId }, context) {
      const user = checkAuth(context);

      try {
        const order = await Order.findById(orderId);
        if (user.email === order.email) {
          await order.delete();
          return "Order deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likeOrder(_, { orderId }, context) {
      const { email } = checkAuth(context);

      const order = await Order.findById(orderId);
      if (order) {
        if (order.likes.find((like) => like.email === email)) {
          // Order already likes, unlike it
          order.likes = order.likes.filter(
            (like) => like.email !== email
          );
        } else {
          // Not liked, like order
          order.likes.push({
            email,
            createdAt: new Date().toISOString(),
          });
        }

        await order.save();
        return order;
      } else throw new UserInputError("Order not found");
    },
  },
  Subscription: {
    newOrder: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
