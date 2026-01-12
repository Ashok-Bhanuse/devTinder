const express = require("express");
const router = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/users");
const ConnectionRequestModel = require("../models/connectionRequest");

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const { toUserId, status } = req.params;
    const allowedStatus = ["ignore", "interested"];
    const fromUserId = req.loggedInUserData._id;

    if (!allowedStatus.includes(status)) {
      throw new Error(`${status} status is not allowed`);
    }

    toUserExist = await User.findById(toUserId);
    if (!toUserExist) {
      throw new Error("User not found");
    }

    checkConnectRequestExist = await ConnectionRequestModel.findOne({
      $or: [
        { toUserId, fromUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (checkConnectRequestExist) {
      throw new Error("Connection request is already exists");
    }

    const connectionRequest = new ConnectionRequestModel({
      toUserId,
      fromUserId,
      status,
    });
    await connectionRequest.save();

    res.json({
      staus: true,
      message: "Connection request sent successfully",
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

router.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      const loggedInUserData = req.loggedInUserData;

      if (!allowedStatus.includes(status)) {
        throw new Error("Status is not allowed");
      }

      const connectionRequestData = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUserData._id,
        status: "interested",
      });

      if (!connectionRequestData) {
        throw new Error("Connection request not found");
      }

      connectionRequestData.status = status;
      const data = await connectionRequestData.save();
      res.json({
        status: true,
        message: `Connection request is ${status}`,
        data,
      });
    } catch (error) {
      res.status(400).json({ staus: false, message: error.message });
    }
  }
);

module.exports = router;
