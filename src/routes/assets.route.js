const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assets.controller');

router.post('/', assetsController.upload);

module.exports = router;