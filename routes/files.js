const express = require("express");
const router = express.Router();
const upload = require("../utils/fileHelper");

const fileController = require("../controllers/fileController");

router.post("/uploadFiles", upload, fileController.uploadFileToAws);

module.exports = router;
