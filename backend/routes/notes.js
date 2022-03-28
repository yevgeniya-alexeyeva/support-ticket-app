const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, addNote } = require("../controllers/notes");

const protect = require("../middleware/authenticate");

router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;
