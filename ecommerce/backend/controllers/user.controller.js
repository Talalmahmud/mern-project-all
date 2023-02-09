const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const { sendMail } = require("../utils/sendMail");
const crypto = require("crypto");

// user regster

const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avtar: {
      public_id: "sample",
      url: "xyz",
    },
  });

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    user,
    token,
  });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ErrorHandler("User or password is invalid", 402);
  }
  // const match = await bcrypt.compare(password, user.password);
  const match = user.checkPassword(password);
  if (!match) {
    throw new ErrorHandler("User or password is invalid", 402);
  }
  sendToken(user, 200, res);
};

const userLogout = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({
    success: true,
    msg: "Logout success",
  });
};

const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ErrorHandler("User not found", 402);
  }
  const resetToken = user.getresetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `http://${req.get(
    "host"
  )}/api/v1/user/password/reset/${resetToken}`;
  const message = `Your passowrd reset token is:- \n \n ${resetPasswordUrl} \n\n If you have not requested please ignor it.`;

  try {
    await sendMail({
      email: user.email,
      subject: "Ecommerce password reset",
      message: message,
    });
    res.status(200).json({
      success: true,
      msg: `Email send to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });
    throw new ErrorHandler(error, 402);
  }
};
const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  if (!user) {
    throw new ErrorHandler("Reset password token has been expired", 400);
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ErrorHandler("Confirm password not match", 400);
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;

  await user.save();
  sendToken(user, 200, res);
};

const userDetails = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ErrorHandler("User not found", 400);
  }
  res.status(200).json({
    success: true,
    user,
  });
};

const updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    throw new ErrorHandler("User not found", 400);
  }
  const match = user.checkPassword(req.body.oldPassword);
  if (!match) {
    throw new ErrorHandler("Password does not match.", 402);
  }
  if (req.body.newPassworrd !== req.body.oldPassword) {
    if (!match) {
      throw new ErrorHandler("Password does not match.", 402);
    }
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
};

const updateUserProfile = async (req, res, next) => {
  const newProfiledata = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newProfiledata);
  res.status(200).json({
    success: true,
    msg: "Update proifle successfully",
    user,
  });
};

const getAllUser = async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorHandler("User not found", 400);
  }
  res.status(200).json({
    success: true,
    user,
  });
};

const updateProfile = async (req, res, next) => {
  const newProfiledata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newProfiledata);
  res.status(200).json({
    success: true,
    msg: "Update proifle successfully",
    user,
  });
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }
  await user.remove();

  res.status(200).json({
    success: true,
    msg: "Delete proifle successfully",
    user,
  });
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateUserProfile,
  updateProfile,
  getSingleUser,
  getAllUser,
  deleteUser,
};
