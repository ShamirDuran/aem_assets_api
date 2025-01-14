const assetsService = require('../services/assets.service');

const upload = async (req, res, next) => {
  try {
    const image = 'D:/Codigos/aem-local/node-cascaron/src/assets/images/image.jpg';
    res.json(await assetsService.uploadImage(image));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
};
