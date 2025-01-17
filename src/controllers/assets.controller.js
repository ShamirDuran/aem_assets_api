const assetsService = require("../services/assets.service");

const uploadTest = async (req, res, next) => {
  try {
    const image =
      "D:/Codigos/aem-local/node-cascaron/src/assets/images/image.jpg";
    res.json(await assetsService.handleStaticImage(image));
  } catch (error) {
    next(error);
  }
};

/**
 * Recibe los datos en forma de formData, imagen es un file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const upload = async (req, res, next) => {
  try {
    res.json(await assetsService.handleFileImages(req.files));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  uploadTest,
};
