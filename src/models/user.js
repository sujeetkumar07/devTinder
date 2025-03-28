const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, minLength: 4 }, // String is shorthand for {type: String}
    lastName: String,
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data not present");
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    userId: { type: String },
    gender: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://stock.adobe.com/in/search?k=admin",
    },
    about: {
      type: String,
      default: "This is the default value",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
