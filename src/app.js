const useExpress = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = useExpress();
app.use(useExpress.json());
app.use(cookieParser());

const { userAuth } = require("./middlewares/auth");
const { validationSignupData } = require("./utils/validation");
const User = require("./models/users");
const bcrypt = require("bcrypt");

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);

app.use("/", (error, req, res, next) => {
  if (error) {
    res.status(500).send("Something went wrong1" + error.message);
  }
});
