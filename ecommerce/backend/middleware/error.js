module.exports = (err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  let message = err.message || "Server has something wrong";

  if (err.name == "CastError") {
    message = "Invalid mogodb id";
  }
  res.status(statuscode).json({
    success: false,
    msg: message,
  });
};
