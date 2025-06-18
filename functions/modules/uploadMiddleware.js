const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // Stores in memory as a Buffer

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  //limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
