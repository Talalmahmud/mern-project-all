const CustomError = require("../errorhandler/error");

const userRegistration = (req, res, next) => {
  throw new CustomError("Register error", 402);
};

module.exports = { userRegistration };
