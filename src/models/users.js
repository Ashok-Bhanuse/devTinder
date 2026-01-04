const { Schema, default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    minLength: 4,
    maxLength: 10,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  password: {
    type: String,
  },
  aboutus: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  skills: {
    type: Array,
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ id: user._id }, "DevTinder@1993", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validtePassword = async function (passwordInputByUser) {
  const user = this;
  return bcrypt.compare(passwordInputByUser, user.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
