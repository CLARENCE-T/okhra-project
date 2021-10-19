const { AuthenticationError, UserInputError } = require("apollo-server");

const Product = require("../../models/product.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getProducts() {
      try {
        const products = await Product.find().sort({ createdAt: -1 });
        return products;
      } catch (err) {
        throw new Error(`il y a une erreur:  ${err}`);
      }
    },
    async getProduct(_, { productId }) {
      try {
        const product = await Product.findById(productId);
        if (product) {
          return product;
        } else {
          throw new Error("Product not found" + productId);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addProduct(_, { productInput }, context) {
      const user = checkAuth(context);

      if (user.admin) {
        const { name, description } = productInput;
        try {
          if (name.trim() === "" || description.trim() === "") {
            throw new Error(`Please provide valid credentials`);
          }
          const newProduct = new Product({
            name,
            description,
          });
          const product = await newProduct.save();
          return product;
        } catch (err) {
          throw new Error(`erreur dans creationProduct ${err}`);
        }
      } else {
        throw new Error(`You don't have the permission`);
      }
    },
    async deleteProduct(_, { productId }, context) {
      const user = checkAuth(context);

      try {
        const product = await Product.findById(productId);
        if (user.admin) {
          await product.delete();
          return "Product deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
