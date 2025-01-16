const fs = require("fs");
const { aemAssetsPath, aemAssetsUrl } = require("../configs/env.config");
const DirectBinary = require("@adobe/aem-upload");
const { v4: uuidv4 } = require("uuid");

const DESTIONATION_URL = `${aemAssetsUrl}/${aemAssetsPath}`;
const CREDENTIALS = Buffer.from("admin:admin", "utf8").toString("base64");

/**
 * Upload static image to AEM Assets
 * @param {*} image Static image saved in the project
 * @returns
 */
const handleStaticImage = async (image = "") => {
  try {
    const fileExtension = image.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const fileSize = fs.statSync(image).size;
    const filePath = image;

    const uploadFiles = [
      {
        fileName,
        fileSize,
        filePath,
      },
    ];

    const result = await uploadImage(uploadFiles);
    return result;
  } catch (err) {
    console.error("Error during upload:", err);
    throw new Error("Something went wrong during the upload process");
  }
};

/**
 * Upload image to AEM Assets
 * @param {*} image File got from the request, came in a formData
 * @returns
 */
const handleImageFile = async (image) => {
  try {
    const fileExtension = image.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const fileSize = image.size;
    const filePath = image.path;

    const uploadFiles = [
      {
        fileName,
        fileSize,
        filePath,
      },
    ];

    const result = await uploadImage(uploadFiles);
    return result;
  } catch (err) {
    console.error("Error during upload:", err);
    throw new Error("Something went wrong during the upload process");
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

module.exports = {
  handleStaticImage,
  handleImageFile,
};
