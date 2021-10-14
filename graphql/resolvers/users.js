const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });
const SECRET_KEY = process.env["SECRET_KEY"];
const User = require("../../models/user.model");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");

// TOKEN GENERATOR FUNCTION

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      admin: user.admin,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async users() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(`il y a une erreur:  ${err}`);
      }
    },
    async user(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error("User not found" + userId);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    //LOGIN
    async login(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    //REGISTER
    async register(_, { registerInput: { email, password, confirmPassword } }) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure user doesnt already exist
      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Email already exist", {
          errors: {
            email: "This email already exist",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
