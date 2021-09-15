const mongoose = require("mongoose");
const ProductSchema = require("./product.model");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    content: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: { type: Number, require: true },
      },
    ],
    amount: {
      type: Number,
      require: true,
      currency: {
        type: String,
        enum: ["EUR", "USD"],
      },
    },
    status: {
      type: String,
      enum: ["Send", "Delivered", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

// {
//   "userId": "613f4e599e2b2e99157aa3fb",
//   "content": [
//     {
//       "productId": "6141b84f6c7ae38ba72f5242",
//       "quantity": "2",
//     },
//   ],
//   "amount": "160",
// }
