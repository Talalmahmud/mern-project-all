require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
    maxLength: [30, "Cananot exit 30 charaters"],
  },
  email: {
    type: String,
    require: [true, "Enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: [true, "Enter your password"],
    maxLength: [30, "Pasword must be 8 charaters"],
    select: false,
  },
  avtar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.checkPassword = async function (enterPassword) {
  const match = await bcrypt.compare(enterPassword, this.password);
  return match;
};

userSchema.methods.getresetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpired = Date.now() + 15 * 60 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
