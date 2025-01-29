const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  // Set the destination folder where the files will be saved
  destination: (req, file, cb) => {
    cb(null, "tmp/uploads");
  },
  // Set the filename which will be saved
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}.${file.originalname.split(".").pop()}`);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
