const assetsService = require("../services/assets.service");

/**
 * Recibe los datos en forma de formData, imagen es un file
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const upload = async (req, res, next) => {
  try {
    const { folder } = req.body;
    const files = req.files;

    if (!files || !files.length) {
      return res.status(400).json({ message: "No files provided" });
    }

    if (!folder) {
      return res.status(400).json({ message: "No folder provided" });
    }

    res.json(await assetsService.handleAssets(req.files, folder));
  } catch (error) {
    next(error);
  }
};

const getFolders = async (req, res, next) => {
  try {
    res.json(await assetsService.getFolders());
  } catch (error) {
    next(error);
  }
};

const createFolder = async (req, res, next) => {
  try {
    const { name, title } = req.body;
    res.json(await assetsService.createFolder(name, title));
  } catch (error) {
    next(error);
  }
};

const updateMetadata = async (req, res, next) => {
  try {
    const { folder, asset, metadata } = req.body;
    res.json(await assetsService.updateMetadata(folder, asset, metadata));
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const { folder, asset } = req.body;
    res.json(await assetsService.deleteResource(folder, asset));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upload,
  getFolders,
  createFolder,
  updateMetadata,
  deleteResource,
};
