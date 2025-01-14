const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  prefix: process.env.PREFIX || 'api',
  environment: process.env.ENVIRONMENT || 'development',
  aemAssetsUrl: process.env.AEM_ASSETS_URL || 'http://localhost:4502',
  aemAssetsPath: process.env.AEM_ASSETS_PATH || '/content/dam',
};
