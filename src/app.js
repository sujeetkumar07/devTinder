const express = require("express");
const app = express();

// app.get("/user/:userId/:name/:password", (req, res) => {
//     // console.log(req.params)
//     // res.send({ firstName: "Sujeet", lastName: "Kumar" })
// });
// syntex app.use("/routePath", rh1,rh2,rh3,....)
//route handler might be in array or in object
app.use(
  "/user",
  (req, res, next) => {
    console.log("Hsndling the route user !!");
    res.send("1st Response");
    next();
  },
  (req, res) => {
    console.log("2nd Handling the route user !!");
    res.send("2nd Response");
  }
);

app.listen(7777, () => {
  console.log("server is successfully running at 7777");
});
