const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ErrorHandler("Please login to access this page.", 401);
  }

  const decodedtoken = jwt.verify(token, process.env.SECRET_KEY);
  req.user = await User.findById(decodedtoken.id);
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ErrorHandler(
        `Role :${req.user.role} is not allowed to access ths source.`,
        403
      );
    }
    next();
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
