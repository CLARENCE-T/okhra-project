const Product = require("../../models/product.model");

module.exports = {
  Query: {
    async Products() {
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        throw new Error(`il y a une erreur:  ${err}`);
      }
    },
  },
};
