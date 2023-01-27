const CustomError = require("../errorhandler/error");
const User = require("../models/user.model");

const userRegistration = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) throw new CustomError("User already register");
  const newUser = await User.create(req.body);
  res.status(200).json({
    newUser,
  });
};

const getAlluser = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
};

const getUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).json({
    user,
  });
};

const userDelete = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  res.status(200).json({
    msg: "Successfully delete",
  });
};

const userUpdate = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    user,
  });
};

module.exports = {
  userRegistration,
  getAlluser,
  getUser,
  userDelete,
  userUpdate,
};
