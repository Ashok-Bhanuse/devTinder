const useExpress = require("express");
const router = useExpress.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/users");
const ConnectionRequestModel = require("../models/connectionRequest");

/* get all connections of logged in user */
router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUserData = req.loggedInUserData;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUserData._id, status: "accepted" },
        { toUserId: loggedInUserData._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName skills")
      .populate("toUserId", "firstName lastName skills");

    const data = connectionRequests.map((request) => {
      if (request.toUserId._id.toString() === loggedInUserData._id.toString()) {
        return request.fromUserId;
      }
      return request.toUserId;
    });
    res.json({ status: true, data });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

module.exports = router;
