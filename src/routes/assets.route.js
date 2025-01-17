const express = require("express");
const router = express.Router();
const assetsController = require("../controllers/assets.controller");
const upload = require("../middlewares/multer.middleware");

const MAX_FILES = 5;

// router.post("/", upload.single("imagen"), assetsController.upload);
router.post("/", upload.array("images", MAX_FILES), assetsController.upload);
router.post("/static", assetsController.uploadTest);

module.exports = router;
