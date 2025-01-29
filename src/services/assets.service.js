const { aemAssetsPath, aemAssetsUrl } = require("../configs/env.config");
const DirectBinary = require("@adobe/aem-upload");
const { deleteFile } = require("../utils/delete.file");
const axios = require("axios");

const DESTIONATION_URL = `${aemAssetsUrl}/${aemAssetsPath}`;
const CREDENTIALS = Buffer.from("admin:admin", "utf8").toString("base64");

/**
 * Upload image to AEM Assets
 * @param {*} image Multer file object
 * @returns
 */
const handleAssets = async (files) => {
  try {
    if (!files || files.length === 0) {
      throw new Error("No files to upload");
    }

    const images = files.map((file) => {
      const {
        // fieldname, // The name set in the form
        // originalname, // Original name of the file
        // mimetype, // File type ex: image/jpeg
        // destination, // Server folder path where the file is saved. It is just the folder route
        filename: fileName,
        path: filePath, // Full path to the file
        size: fileSize,
      } = file;

      return {
        fileName,
        fileSize,
        filePath,
      };
    });

    const result = await uploadImage(images);
    return result;
  } catch (err) {
    console.error("Error during upload:", err);
    throw new Error("Something went wrong during the upload process");
  } finally {
    files.forEach((file) => deleteFile(file.path));
  }
};

/**
 * Upload image to AEM Assets
 * @param {*} image full path to the local file
 */
const uploadImage = async (uploadFiles) => {
  try {
    const upload = new DirectBinary.DirectBinaryUpload();
    const options = new DirectBinary.DirectBinaryUploadOptions()
      .withUrl(DESTIONATION_URL)
      .withHttpOptions({
        headers: { Authorization: `Basic ${CREDENTIALS}` },
      })
      .withUploadFiles(uploadFiles);

    const result = await upload.uploadFiles(options);
    return result;
  } catch (err) {
    console.error("Error during upload:", err);
    throw new Error("Something went wrong during the upload process");
  }
};

/**
 * Crear un folder en aem assets
 * @param {*} name Identificador del folder a crear ex: folder-name
 * @param {*} title Nombre del folder a crear ex: Folder Name
 */
const createFolder = async (name, title) => {
  try {
    const url = `${aemAssetsUrl}/api/assets/${name}`;
    const resp = await axios.post(
      url,
      {
        class: "assetFolder",
        properties: {
          "jcr:title": title,
        },
      },
      {
        headers: {
          Authorization: `Basic ${CREDENTIALS}`,
        },
      }
    );

    return resp.data;
  } catch (error) {
    return error;
  }
};

const updateMetadata = async (folder, asset, metadata) => {
  try {
    const url = `${aemAssetsUrl}/api/assets/${folder}/${asset}`;

    const resp = await axios.put(
      url,
      {
        class: "asset",
        properties: {
          metadata: {
            ...metadata,
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${CREDENTIALS}`,
        },
      }
    );

    return resp.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error updating metadata");
  }
};

const deleteResource = async (folder, asset) => {
  try {
    const url = `${aemAssetsUrl}/api/assets/${folder}/${asset}`;
    const resp = await axios.delete(url, {
      headers: {
        Authorization: `Basic ${CREDENTIALS}`,
      },
    });

    return resp.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  handleAssets,
  createFolder,
  updateMetadata,
  deleteResource,
};
