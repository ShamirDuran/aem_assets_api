const { logger } = require("../utils/logs.util");

/**
 * Validate global errors and send response
 */
const errorHandlerMiddleware = (err, req, res, next) => {
  const errorStatus = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";

  console.log(err);

  // logger('error', `{${req.method}} ${req.originalUrl} -> ${errorMessage}`);
  // logger("error", `{${req.method}} ${req.originalUrl} -> ${errorMessage}`);

  return res.status(errorStatus).json({
    error: errorStatus === 500 ? "Internal server error" : errorMessage,
  });
};

module.exports = errorHandlerMiddleware;
