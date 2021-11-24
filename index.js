// Import packages
const express = require('express');
const config = require('./lib/config');

// Import api routes
const apiRoutes = require('./lib/api');

const app = express();

// Use api routes
app.use('/api', apiRoutes);


// Run the webserver
app.listen(config.main.port, () => {
    console.log(`App online at port ${config.main.port}!`);
});