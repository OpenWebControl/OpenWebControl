// Import packages
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');


// Init variables
const mainConfig = yaml.load(fs.readFileSync('./config/main.yml', 'utf8'));
const dbConfig = yaml.load(fs.readFileSync('./config/mysql.yml', 'utf8'));
const pteroConfig = yaml.load(fs.readFileSync('./config/pterodactyl.yml', 'utf8'));

// Import api routes
const apiRoutes = require('./lib/api');

const app = express();

// Use api routes
app.use('/api', apiRoutes);


// Run the webserver
app.listen(mainConfig.port, () => {
    console.log(`App online at port ${mainConfig.port}!`);
});