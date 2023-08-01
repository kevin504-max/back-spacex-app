const express = require('express')
const launches = require('./launchesRoutes');

module.exports = app => {
    app.use(express.json(), launches);
}