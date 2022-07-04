// Modules
const fs = require('fs');
const yaml = require('js-yaml');

// Init variables
const mainConfig = yaml.load(fs.readFileSync(__dirname + '/../config/main.yml', 'utf8'));
const dbConfig = yaml.load(fs.readFileSync(__dirname + '/../config/database.yml', 'utf8'));
const nginxConfig = yaml.load(fs.readFileSync(__dirname + '/../config/nginx.yml', 'utf8'));

var e = {
    main: mainConfig,
    db: dbConfig,
    nginx: nginxConfig
};

module.exports = e;