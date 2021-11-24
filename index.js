// Import packages
const express = require('express');
const config = require('./lib/config');
const logger = require('./lib/logging');

// Import api routes
const apiRoutes = require('./lib/api');

const app = express();
const DataBase = require('./lib/mysql');
const db = new DataBase();

app.use((req, res, next) => {
    logger.info(`${req.method} - ${req.path} - ${res.statusCode}`);
    return next();
});

// Use api routes
app.use(express.json());
app.set('json spaces', 4);
app.set('view engine', 'ejs');
app.use('/api', apiRoutes);

app.get('/', function(req, res) {
    res.render(`${config.main.theme}/index`);
});

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

// Run the webserver
app.listen(config.main.port, () => {
    logger.info(`app online at port ${config.main.port}!`);
});
