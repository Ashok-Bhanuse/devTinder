const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const User = require("../models/users");
const { validationSignupData } = require("../utils/validation");

router.post("/user/signup", async (req, res) => {
  try {
    validationSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const userSaveObj = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await userSaveObj.save();

    res.send("User created successfully");
  } catch (error) {
    res.status(400).send(`Error: ${error.message}`);
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const userData = await User.findOne({ emailId: emailId });
    if (!userData) {
      throw new Error("Credential invalid");
    }

    isPasswordValid = await userData.validtePassword(password);

    if (isPasswordValid) {
      const jwtToken = await userData.getJWT();
      res.cookie("token", jwtToken, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      res.send("user logged in");
    } else {
      throw new Error("Credential invalid");
    }
  } catch (error) {
    res.status(400).send(`ERROR: ${error.message}`);
  }
});

router.post("/user/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout succesfully");
});

module.exports = router;
