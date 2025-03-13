const express = require("express");
const app = express();
const { adminAuth, userAuth } = require("./middleWare/auth");


/* This is middleWare starting from .use or .all*/
app.use("/admin", adminAuth);
// app.use("/user", userAuth);
app.use("/user", userAuth, (req, res) => {
  res.send("User sent a data");
});
app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});
app.delete("/admin/deleteAdmin", (req, res) => {
  res.send("All Data deleted");
});

app.listen(7777, () => {
  console.log("server is successfully running at 7777");
});
