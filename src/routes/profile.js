const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { userAuth } = require("../middlewares/auth");
const {
  validateProfileData,
  validatePasswordChangeData,
} = require("../utils/validation");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.send(req.loggedInUserData);
  } catch (error) {
    res.status(400).send(`ERROR: ${error.message}`);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Fields are not valid");
    }
    const loggedInUserData = req.loggedInUserData;

    Object.keys(req.body).forEach(
      (fieldKey) => (loggedInUserData[fieldKey] = req.body[fieldKey])
    );

    await loggedInUserData.save();

    res.json({
      staus: true,
      message: "Profile updated succesfuly",
      data: loggedInUserData,
    });
  } catch (error) {
    res.status(400).send(`ERROR: ${error.message}`);
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswordChangeData(req);
    const { oldPassword, newPassword } = req.body;
    const loggedInUserData = req.loggedInUserData;

    isOldPasswordMatch = await bcrypt.compare(
      oldPassword,
      loggedInUserData.password
    );
    if (!isOldPasswordMatch) {
      throw new Error("Old password is not valid");
    }

    hashPassword = await bcrypt.hash(newPassword, 10);
    loggedInUserData["password"] = hashPassword;
    await loggedInUserData.save();
    res.json({
      status: true,
      message: "Your profile password is updated succesfully",
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

module.exports = router;
