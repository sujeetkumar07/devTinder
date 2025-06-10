const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid!!!!!!!!!");
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; //ab user ko req.user mai hi daal diye hai to req. ke saath user info bhi hai
    next(); // next means iske baad wala line execute hoga
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};
module.exports = {
  userAuth,
};
