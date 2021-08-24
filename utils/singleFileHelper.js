require("dotenv/config");
const multer = require("multer");

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const uploadSingleFile = multer({ storage }).single("myfile");

module.exports = uploadSingleFile;
