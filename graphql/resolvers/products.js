const { AuthenticationError, UserInputError } = require("apollo-server");

const Product = require("../../models/product.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async products() {
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        throw new Error(`il y a une erreur:  ${err}`);
      }
    },
    async product(_, { productId }) {
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
    async addProduct(_, { body }, context) {
      const user = checkAuth(context);

      try {
        if (body.trim() === "") {
          throw new Error("Please provide valid credentials");
        }
        const newProduct = new Product({
          body,
          // category,
        });
        const res = await newProduct.save();
        return {
          ...res._doc,
          id: res._id,
          name,
          // category,
        };
      } catch (err) {
        throw new Error(`erreur dans creationProduct ${err}`);
      }
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
