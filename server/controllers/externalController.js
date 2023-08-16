const express = require('express');
const app = express();
app.use(express.json());
const Axios = require('axios');
const server = require('../server');

const searchPaintings = async (req, res) => {
    try {
       const paintings = await Axios.get("https://www.wikiart.org/en/api/2/PaintingSearch?term=" + req.params.searchQuery + "&authSessionKey=" + server.sessionKey)
     res.json(paintings.data)
            } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {
    searchPaintings,
};