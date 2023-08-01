const express = require('express');
const app = express();
app.use(express.json());
const Axios = require('axios');
const server = require('../server');

const searchPaintings = async (req, res) => {
    try {
    //    console.log(server.sessionKey);     For when I upgrade to this API V2
     //   console.log("https://www.wikiart.org/en/api/2/PaintingSearch?term=" + req.params.searchQuery + "&authSessionKey=" + server.sessionKey)
        const paintings = await Axios.get("http://www.wikiart.org/en/search/" + req.params.searchQuery + "/1?json=2&PageSize=1") // + "&authSessionKey=" + sessionKey)        res.json(paintings.data)
        res.json(paintings.data)
            } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {
    searchPaintings,
};