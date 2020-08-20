const ErrorResponse = require("../Utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  // log to console
  console.log(err.stack.red);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose Duplicate key
  if (err.code === 11000) {
    const message = `Duplicate Field, The value already exist`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose Validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "server Error" });
};

module.exports = errorHandler;
