const { environment } = require('../configs/env.config');

/**
 * Centralized logger for personalization and easy maintenance of logs
 * @param {*} type Type of log error | warn | info | debug
 * @param {*} message Message to log
 */
const logger = (type, message) => {
  const date = new Date().toLocaleString();
  const typeIndicator = type[0].toUpperCase();
  const environmentIndicator = environment[0].toUpperCase();

  console[type](`[${date}] |${typeIndicator}|${environmentIndicator}|`, message);
};

module.exports = {
  logger,
};
