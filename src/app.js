const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json()); //middle ware
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  try {
    // const user = new User(req.body);
    const { firstName, lastName, emailId, password } = req.body;
    //validate ur api req
    validateSignUpData(req);
    //encypt ur password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    //   Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send(`ERROR: ${err.message}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT Token
      // jwt.sign("to whom key you want to encrpt", "set Secret key that to communicate the server")
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      console.log("login Token", token);
      res.cookie("token", token);
      // Add the token to cookie and send the response back to the user
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
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

app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    console.log("req.cookies????????????", cookies);

    const { token } = cookies;
    console.log("req.token", token);

    if (!token) {
      throw new Error("Invalid Token");
    }
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
// update userAPI

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const currentObj = req.body; //iss id pe updated object push ho jayenge
  try {
    const what_Allowed = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdate = Object.keys(currentObj).every((k) => {
      return what_Allowed.includes(k);
    });
    if (!isUpdate) {
      throw new Error("update not allowed");
    }
    if (currentObj?.skills.length > 3) {
      throw new Error("only update 3 skills");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, currentObj, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user is updated ");
  } catch (err) {
    res.status(400).send("Update failed " + err.message);
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
