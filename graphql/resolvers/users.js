require("dotenv").config({ path: "./config/.env" });
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env["SECRET_KEY"];

module.exports = {
  Mutation: {
    async register(
      parent,
      { registerInput: { password, confirmPassword, email } },
      context,
      info
    ) {
      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },

  Query: {
    async Users() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(`il y a une erreur:  ${err}`);
      }
    },
  },
};
