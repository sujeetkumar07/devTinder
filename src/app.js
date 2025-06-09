const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); //middle ware
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("mongoose connected to the mongoDB");
    app.listen(7777, () => {
      console.log("server is successfully running at 7777");
    });
  })
  .catch((err) => {
    console.log("Error in mongoose connection");
  });
