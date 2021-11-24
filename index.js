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

const app = express();


// Run the webserver
app.listen(mainConfig.port, () => {
    console.log(`App online at port ${mainConfig.port}!`);
});