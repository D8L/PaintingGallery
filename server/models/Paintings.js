const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
    name: { type: String, required: true },
    paintings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Painting' }]
});

const PaintingSchema = new mongoose.Schema({
    artist: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: false },
    URL: { type: String, required: false },
    gallery: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery' }
});

const Painting = mongoose.model("Painting", PaintingSchema);
const Gallery = mongoose.model("Gallery", GallerySchema);

module.exports = { Painting, Gallery };
