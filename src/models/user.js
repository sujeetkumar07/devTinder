const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String }, // String is shorthand for {type: String}
  lastName: String,
  age: { type: Number },
  gender: { type: String },
  emailId: { type: String },
  password: { type: String },
});

module.exports =  mongoose.model("User", userSchema);
