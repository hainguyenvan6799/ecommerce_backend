const express = require("express");
const testController = require("../controllers/testController");
const router = express.Router();

router.get("/", testController.getAllNotes);
router.get("/:id", testController.getNote);
router.post("/", testController.createANewNote);
router.delete("/:id", testController.deleteNote);
router.put("/:id", testController.updateNote);

module.exports = router;
