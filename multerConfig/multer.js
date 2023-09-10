const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/"); // The directory where uploaded images will be stored
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname); // Rename files with a timestamp
  },
});

// Create a Multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
