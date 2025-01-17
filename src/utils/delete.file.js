const fs = require("fs");

const deleteFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
};

module.exports = {
  deleteFile,
};
