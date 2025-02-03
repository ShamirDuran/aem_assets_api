const dotenv = require("dotenv");
dotenv.config();

const environment = process.env.ENVIRONMENT || "development";

switch (environment) {
  case "staging":
    module.exports = {
      port: process.env.PORT,
      prefix: process.env.PREFIX,
      environment: process.env.ENVIRONMENT,
      aemAssetsUrl: process.env.AEM_ASSETS_URL,
      aemAssetsPath: process.env.AEM_ASSETS_PATH,
      aemUsername: process.env.AEM_USERNAME,
      aemPassword: process.env.AEM_PASSWORD,
    };
    break;

  default:
    module.exports = {
      port: 3000,
      prefix: "api",
      environment: "development",
      aemAssetsUrl: "http://localhost:4502",
      aemAssetsPath: "content/dam",
      aemUsername: "admin",
      aemPassword: "admin",
    };
    break;
}

// module.exports = {
//   port: process.env.PORT || 3000,
//   prefix: process.env.PREFIX || "api",
//   environment: process.env.ENVIRONMENT || "development",
//   aemAssetsUrl: process.env.AEM_ASSETS_URL || "http://localhost:4502",
//   aemAssetsPath: process.env.AEM_ASSETS_PATH || "/content/dam",
//   aemUsername: process.env.AEM_USERNAME || "admin",
//   aemPassword: process.env.AEM_PASSWORD || "admin",
// };
