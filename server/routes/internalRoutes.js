const express = require("express");
const {
    getPaintings,
    createPainting,
    deletePainting,
    clearPaintings,
    updatePainting,
    createGallery,
    getGalleries,
} = require("../controllers/internalController");

const router = express.Router();

// Painting routes
router.get("/", getPaintings);
router.post("/", createPainting);
router.delete("/:id", deletePainting);
router.delete("/", clearPaintings);
router.patch("/:id", updatePainting);

// Gallery routes
router.post("/gallery", createGallery);
router.get("/gallery", getGalleries);

module.exports = router;
