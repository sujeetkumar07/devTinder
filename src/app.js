const express = require("express");
const app = express();

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("gedygrue");
    res.send("All Data sent");
  } catch (err) {
    res.status(500).send("something went wrong connect with support team");
  }
});

app.use("/", (err, req, res, next) => {
  //all parameter order matters
  if (err) {
    //log eror as well
    res.status(500).send("Something went wrong");
  }
  res.send("User sent a data");
});

app.listen(7777, () => {
  console.log("server is successfully running at 7777");
});
