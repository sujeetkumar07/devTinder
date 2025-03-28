const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send(`failed to save data: ${err.message}`);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: userEmail });
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
// const users = await User.find({ emailId: userEmail });
//   if (users.length === 0) {
//     res.status(400).send("User Not Found");
//   } else {
//     res.send(users);
//   }
// } catch (err) {
//   res.status(400).send("something went wrong");
// }
// });

//Feed API

// delete userAPI
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// update userAPI

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updatedObj = req.body; //iss id pe updated object push ho jayenge
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, updatedObj, {
      returnDocument:"after",
      runValidators:true
    });
    res.send("user is updated ");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
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
