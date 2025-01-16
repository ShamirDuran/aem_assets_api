const express = require("express");
const router = express.Router();
const testController = require("../controllers/test.controller");

router.get("/", testController.get);
router.post("/", testController.create);
router.put("/:id", testController.update);
router.delete("/:id", testController.remove);

module.exports = router;
