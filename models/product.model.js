const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 3,
      maxLength: 20,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      minlength: 3,
      maxLength: 400,
    },
    category: {
      type: String,
      require: true,
      enum: [
        "T-shirts",
        "Shirts",
        "Jackets",
        "Jumpers & Sweatshirts",
        "Trousers",
      ],
    },
    size: {
      type: String,
      require: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    price: {
      type: Number,
      require: true,
      currency: {
        type: String,
        enum: ["EUR", "USD"],
        default: "EUR",
      },
    },
    quantity: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);





// {
//   "name": "Mariniere",
//   "description": "belle marieniere en coton",
//   "category": "Jumpers & Sweatshirts"
//   "size": "M"
//   "price": "80"
//   "quantity": "4"
// },