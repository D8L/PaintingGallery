const express = require("express");
const {
    getPaintings,
    createPainting,
    deletePainting,
    clearPaintings,
    updatePainting,
} = require("../controllers/internalController");

const router = express.Router();

// GET all paintings
router.get("/", getPaintings);

// POST a new painting
router.post("/", createPainting);

// DELETE a painting
router.delete("/:id", deletePainting);

// DELETE a painting
router.delete("/", clearPaintings);

// UPDATE a painting
router.patch("/:id", updatePainting);

module.exports = router;