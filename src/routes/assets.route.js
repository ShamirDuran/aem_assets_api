const express = require("express");
const router = express.Router();
const assetsController = require("../controllers/assets.controller");
const upload = require("../middlewares/multer.middleware");

router.post("/", upload.any(), assetsController.upload);
router.get("/folders", assetsController.getFolders);
router.post("/folder", assetsController.createFolder);
router.put("/metadata", assetsController.updateMetadata);
router.delete("/", assetsController.deleteResource);

module.exports = router;
