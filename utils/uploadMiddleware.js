const multer = require("multer");
const { v4: uuid } = require("uuid");

const storage = (folder = "") =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/uploads/${folder}`);
    },
    filename: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${uuid()}.${ext}`);
    },
  });

module.exports = {
  upload(folder) {
    return multer({ storage: storage(folder) });
  },
};
