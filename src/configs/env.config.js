const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  prefix: process.env.PREFIX || 'api',
  environment: process.env.ENVIRONMENT || 'development',
};
