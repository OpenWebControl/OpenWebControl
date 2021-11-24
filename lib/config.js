const fs = require('fs');
const yaml = require('js-yaml');


// Init variables
const mainConfig = yaml.load(fs.readFileSync('../config/main.yml', 'utf8'));
const dbConfig = yaml.load(fs.readFileSync('../config/mysql.yml', 'utf8'));
const pteroConfig = yaml.load(fs.readFileSync('../config/pterodactyl.yml', 'utf8'));

var e = {
    main: mainConfig,
    db: dbConfig,
    ptero: pteroConfig
};

module.exports = e;