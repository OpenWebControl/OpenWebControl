// Import packages
const express = require('express');
const config = require('./lib/config');
const logger = require('./lib/logging');

// Import api routes
const apiRoutes = require('./lib/api');

const app = express();
const DataBase = require('./lib/mysql');
const db = new DataBase();

// Use api routes
app.use('/api', apiRoutes);

db.query('SELECT 1 + 1;');


// Run the webserver
app.listen(config.main.port, () => {
    logger.info(`app online at port ${config.main.port}!`);
});