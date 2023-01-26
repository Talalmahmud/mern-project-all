const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Server has something wrong..";

  res.status(err.statusCode).json({
    message: err.message,
  });
};

module.exports = errorHandler;
