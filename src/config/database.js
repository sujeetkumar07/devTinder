const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sujeet:12345@namastenode.m5ojn.mongodb.net/devTinder"
  );
};
module.exports = {
  connectDB,
};
