const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator =  require("validator");
const jwt = require("jsonwebtoken");
 const bcrypt = require("bcrypt");
 
const userSchema = new Schema(
  {
    firstName: { type: String, minLength: 4 }, // String is shorthand for {type: String}
    lastName: String,
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      // validate(value) {
      //   if (!["male", "female", "other"].includes(value)) {
      //     throw new Error("Gender data not present");
      //   }
      // },
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
       if(!validator.isEmail(value)) {
        throw new Error("Invalid email address: " +value)
       }
      }
      
    },
    password: { type: String },
    userId: { type: String },
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

userSchema.methods.getJWT = async function () {
  const user = this; // this refer to current obj(userSchema not full part of obj) schema

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};


module.exports = mongoose.model("User", userSchema);
