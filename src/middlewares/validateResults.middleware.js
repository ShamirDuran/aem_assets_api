const { validationResult } = require('express-validator');

/**
 * Validate express-validator route results.
 * If there is an error, send response with list of errors
 */
const validateResultsMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }
  // if there is no other middleware, continue with the rest of the code
  next();
};

module.exports = validateResultsMiddleware;
