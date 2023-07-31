const express = require('express');
const app = express();
const UserModel = require("../models/Paintings");
app.use(express.json());

const getPaintings = async (req, res) => {
    try {
        const paintings = await UserModel.find()
        res.json(paintings);
    } catch (error) {
        console.error('Error:', error);
    }
};

const createPainting = async (req, res) => {
    try {
        const painting = await UserModel.create(req.body)
        res.json(painting);
    } catch (error) {
        console.error('Error:', error);
    }
};

const deletePainting = async (req, res) => {
    try {
        const painting = await UserModel.findByIdAndRemove({_id: req.params.id})
        res.json(painting);
    } catch (error) {
        console.error('Error:', error);
    }
};

const clearPaintings = async (req, res) => {
    try {
        const paintings = await UserModel.deleteMany()
        res.json(paintings);
    } catch (error) {
        console.error('Error:', error);
    }
};

const updatePainting = async (req, res) => {
    try {
        const painting = await UserModel.findByIdAndUpdate({_id: req.body.id}, {
            title: req.body.title,
            artist: req.body.artist,
            URL: req.body.URL,
            year: parseInt(req.body.year),
            color: req.body.color
        }, {ignoreUndefined: true})
        res.json(painting);
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = {
    getPaintings,
    createPainting,
    deletePainting,
    clearPaintings,
    updatePainting
};