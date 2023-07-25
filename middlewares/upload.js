const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "../", "tmp"); //шлях до тимчасової папки
// console.log(tmpDir);

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname);
  //   },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
