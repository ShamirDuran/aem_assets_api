const express = require("express");
const router = express.Router();
const assetsController = require("../controllers/assets.controller");

router.post("/", assetsController.upload);
router.post("/static", assetsController.uploadTest);

module.exports = router;
