const express = require("express");
const {
    searchPaintings
} = require("../controllers/externalController");
const router = express.Router();

// SEARCH all paintings
router.get("/:searchQuery", searchPaintings);

module.exports = router;