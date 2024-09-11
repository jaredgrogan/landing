const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('No URL provided');
    }
    // Fetch the URL content and stream it back to the client
    request(url).pipe(res);
});

module.exports = app;
