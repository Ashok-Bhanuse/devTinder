const jwt = require("jsonwebtoken");

const User = require("../models/users");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is invalid");
    }

    const decodedMessage = await jwt.verify(token, "DevTinder@1993");
    if (!decodedMessage) {
      throw new Error("Token is invalid");
    }

    const userData = await User.findById(decodedMessage.id);

    if (!userData) {
      throw new Error("User data not found");
    }

    req.loggedInUserData = userData;
    next();
  } catch (error) {
    res.send(`Error: ${error.message}`);
  }
};

module.exports = {
  userAuth,
};
