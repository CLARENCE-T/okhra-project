const { UserInputError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });
const SECRET_KEY = process.env["SECRET_KEY"];
const Admin = require("../../models/admin.model");
const {
  validateLoginInput,
  validateRegisterInput,
} = require("../../util/validators");

// TOKEN GENERATOR FUNCTION

function generateToken(admin) {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    //REGISTER
    async createAdmin(
      _,
      { adminInfo: { username, email, password, confirmPassword } }
    ) {
      // Validate admin data
      const { valid, errors } = validateRegisterInput(
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // TODO: Make sure admin doesnt already exist
      const admin = await Admin.findOne({ email });
      if (admin) {
        throw new UserInputError("Email already exist", {
          errors: {
            email: "This email already exist",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newAdmin = new Admin({
        email,
        password,
        username,
      });

      const res = await newAdmin.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    //LOGIN
    async adminLogin(_, { username, email, password }) {
      const { errors, valid } = validateLoginInput(username, email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const admin = await Admin.findOne({ email });

      if (!admin) {
        errors.general = "Admin not found";
        throw new UserInputError("Admin not found", { errors });
      }

      const match = await bcrypt.compare(password, admin.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = generateToken(admin);

      return {
        ...admin._doc,
        id: admin._id,
        token,
      };
    },
  },
};
