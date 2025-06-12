require("dotenv").config();
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_o8Ic240Ia33JfO",
  key_secret: "djR0b9xCrCESNFSK3I9mQgFZ",
});

module.exports = instance;