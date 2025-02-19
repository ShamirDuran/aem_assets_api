const {
  aemAssetsPath,
  aemAssetsUrl,
  aemUsername,
  aemPassword,
} = require("../configs/env.config");
const DirectBinary = require("@adobe/aem-upload");
const { deleteFile } = require("../utils/delete.file");
const axios = require("axios");

const DESTIONATION_URL = `${aemAssetsUrl}/${aemAssetsPath}`;
const CREDENTIALS = Buffer.from(
  `${aemUsername}:${aemPassword}`,
  "utf8"
).toString("base64");

console.log(
  aemAssetsUrl,
  aemAssetsPath,
  aemUsername,
  aemPassword,
  DESTIONATION_URL,
  CREDENTIALS
);

/**
 * Upload image to AEM Assets
 * @param {*} files Array of files to upload
 * @param {*} folder Folder where the file will be saved
 * @returns
 */
const handleAssets = async (files, folder) => {
  try {
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

    const result = await uploadImage(images, folder);
    return result;
  } catch (err) {
    return err;
  } finally {
    files.forEach((file) => deleteFile(file.path));
  }
};

/**
 * Upload image to AEM Assets
 * @param {*} uploadFiles Array of files to upload
 * @param {*} folder Folder where the file will be saved
 */
const uploadImage = async (uploadFiles, folder) => {
  try {
    const upload = new DirectBinary.DirectBinaryUpload();
    const options = new DirectBinary.DirectBinaryUploadOptions()
      .withUrl(`${DESTIONATION_URL}/${folder}`)
      .withHttpOptions({
        headers: { Authorization: `Basic ${CREDENTIALS}` },
      })
      .withUploadFiles(uploadFiles);

    const result = await upload.uploadFiles(options);
    return result;
  } catch (err) {
    return err;
  }
};

const getFolders = async () => {
  try {
    const url = `${aemAssetsUrl}/api/assets.json`;
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Basic ${CREDENTIALS}`,
      },
    });

    if (!resp.data || !resp.data.entities) {
      return [];
    }

    return resp.data.entities
      .filter((entity) => !entity.properties.hidden)
      .map((entity) => ({
        id: entity.properties.name,
        name: entity.properties.name,
      }));
  } catch (error) {
    return error;
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

/**
 * Actualizar metadata de un asset
 * @param {*} folder Folder donde se encuentra el asset
 * @param {*} asset Nombre del asset
 * @param {*} metadata Metadata a actualizar
 * @returns
 */
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
    return error;
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
  getFolders,
  createFolder,
  updateMetadata,
  deleteResource,
};
