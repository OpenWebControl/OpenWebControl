// Import packages
const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');


// Init variables
try {
  const mainConfig = yaml.load(fs.readFileSync('./config/main.yml', 'utf8'));
} catch (e) {
  console.log(e);
} 

const apiRoutes = require('./lib/api');

const app = express();

app.use('/api', apiRoutes);


// Run the webserver
app.listen(mainConfig.port, () => {
    console.log(`App online at port ${mainConfig.port}!`);
});