const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxLength: 20,
      trim: true,
    },
    lastName: {
      type: String,
      minlength: 3,
      maxLength: 20,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
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
  {
    timestamps: true,
  }
);

//play function before save into display: "block"
// UserSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("User", UserSchema);
module.exports = User;
