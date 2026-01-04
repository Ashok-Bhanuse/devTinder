const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateProfileData } = require("../utils/validation");

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
      message: "Profile updated succesfulyy",
      data: loggedInUserData,
    });
  } catch (error) {
    res.status(400).send(`ERROR: ${error.message}`);
  }
});

module.exports = router;
