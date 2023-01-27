const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Enter your email"],
    },
    phone: {
      type: String,
      required: [true, "Enter your phone number"],
    },
    address: {
      type: String,
      required: [true, "Enter your address"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
