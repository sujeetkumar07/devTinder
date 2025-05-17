const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleWare/auth");
const { validateEditProfileData, validateNewPassword } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid Edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, Your Profile got Updated`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    if (!validateNewPassword(req)) {
      throw new Error("Invalid or missing password field.");
    }
    const loggedInUser = req.user;
    const { password } = req.body;

    const bcrypt = require("bcrypt");
    const passwordHash = await bcrypt.hash(password, 8);

    loggedInUser.password = passwordHash;
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your password has been successfully updated.`,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
module.exports = profileRouter;
