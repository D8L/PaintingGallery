const express = require('express');
const { Painting, Gallery } = require("../models/Paintings");
const app = express();
app.use(express.json());

const getPaintings = async (req, res) => {
    try {
        const paintings = await Painting.find().populate('gallery');
        res.json(paintings);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createPainting = async (req, res) => {
    try {
        const { title, artist, year, URL, galleryId } = req.body;
        const painting = new Painting({ title, artist, year, URL, gallery: galleryId });
        await painting.save();
        if (galleryId) {
            const gallery = await Gallery.findById(galleryId);
            gallery.paintings.push(painting._id);
            await gallery.save();
        }
        res.json(painting);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createGallery = async (req, res) => {
    try {
        const gallery = new Gallery(req.body);
        await gallery.save();
        res.json(gallery);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getGalleries = async (req, res) => {
    try {
        const galleries = await Gallery.find().populate('paintings');
        res.json(galleries);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const deletePainting = async (req, res) => {
    try {
        const painting = await Painting.findByIdAndRemove(req.params.id);
        res.json(painting);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const clearPaintings = async (req, res) => {
    try {
        const paintings = await Painting.deleteMany();
        res.json(paintings);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updatePainting = async (req, res) => {
    try {
        const painting = await Painting.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            artist: req.body.artist,
            year: parseInt(req.body.year),
        }, { new: true, runValidators: true });
        res.json(painting);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getPaintings,
    createPainting,
    deletePainting,
    clearPaintings,
    updatePainting,
    createGallery,
    getGalleries,
};
