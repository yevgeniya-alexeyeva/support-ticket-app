const errorHandler = (err, _, res, __) => {
  err.status = err.status || 500;

  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
  });
};

module.exports = errorHandler;
