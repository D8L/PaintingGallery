const express = require('express');
const app = express();
app.use(express.json());
const Axios = require('axios');

const searchPaintings = async (req, res) => {
    try {
        const paintings = await Axios.get("http://www.wikiart.org/en/search/" + req.params.searchQuery + "/1?json=2&PageSize=1") // + "&authSessionKey=" + sessionKey)
        res.json(paintings.data)
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {
    searchPaintings,
};