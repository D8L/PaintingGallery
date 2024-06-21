const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const axios = require('axios');

const externalRouter = require('../../../../Documents/PaintingGallery/server/routes/externalRoutes');
const internalRouter = require('../../../../Documents/PaintingGallery/server/routes/internalRoutes');

app.use('/api/external', externalRouter);
app.use('/api/internal', internalRouter);

// Connect to database
mongoose.connect(process.env.DB_LINK)
    .then(() => {
        console.log("Connected to MongoDB");
        // listen to port
        app.listen(process.env.SERVER_PORT, () => {
            console.log("Server is listening for requests on port", process.env.SERVER_PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Fetch ArtWiki API session key (API V2)
axios.get(
    `https://www.wikiart.org/en/Api/2/login?accessCode=${process.env.API_ACCESS_KEY}&secretCode=${process.env.API_SECRET_KEY}`
).then(response => {
    exports.sessionKey = response.data.SessionKey;  // API V2
    // console.log(exports.sessionKey + " <--- Session Key")
})
    .catch((err) => {
        console.log("Session Key experienced an error", err);
    });
