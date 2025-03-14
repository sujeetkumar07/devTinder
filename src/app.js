const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // const userObj = {
  //   firstName: "Sujeet",
  //   lastName: "Kumar",
  //   emailId: "sujeet181294@gmail.com",
  //   password: "12345",
  // };
  // try {
  //   const createdUser = await User.create(userObj);
  //   res.send("User Added successfully");
  // } catch (err) {
  //   console.log("err");
  // }
  /* 2nd method to create the db*/
  const user = new User({
    firstName: "Pallabi",
    lastName: "Prasad",
    emailId: "Pallabi181294@gmail.com",
    password: "12345",
  });
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("failed to save data", err.message);
  }
});

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
