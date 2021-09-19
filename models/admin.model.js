const mongoose = require("mongoose");
const { isEmail } = require("validator");

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
