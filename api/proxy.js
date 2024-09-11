// /api/proxy.js
const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('No URL provided');
    }

    // Use 'request' to fetch the URL content and pipe it back
    request(url).pipe(res);
});

module.exports = app;
