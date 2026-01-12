const mongoose = require("mongoose");

const ConnectionRequestSchema = mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "rejected", "accepted"],
        message: `{VALUE} is not a valid status type`,
      },
    },
  },
  {
    timestamp: true,
  }
);

ConnectionRequestSchema.pre("save", function (next) {
  const connectionRequestData = this;
  if (connectionRequestData.fromUserId.equals(connectionRequestData.toUserId)) {
    throw new Error("Cannot send the request to yourself");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);
module.exports = ConnectionRequestModel;
