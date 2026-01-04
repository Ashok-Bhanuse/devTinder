const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ashokscriptsystech_db_user:sSLnnTcoB4u057zk@cluster0.4mk2f6h.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
