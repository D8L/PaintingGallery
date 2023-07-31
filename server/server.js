const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const externalRouter = require('./routes/externalRoutes');
const internalRouter = require('./routes/internalRoutes');

app.use('/api/external', externalRouter);
app.use('/api/internal', internalRouter);

// Connect to database
mongoose.connect(process.env.DB_LINK)
    .then(() => {
        console.log("Connected to MongoDB");
        // listen to port
        app.listen(process.env.API_PORT, () => {
            console.log("Server is listening for requests on port", process.env.API_PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// Fetch ArtWiki API session key

/* Axios.get
("https://www.wikiart.org/en/Api/2/login?accessCode=" + process.env.API_ACCESS_KEY + "&secretCode=" + process.env.API_SECRET_KEY).then(response => {
    const sessionKey = response.data.SessionKey
    console.log(sessionKey + " <--- Session Key")
}) */
