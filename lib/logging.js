const chalk = require('chalk');

module.exports = {
    info: function(msg) {
        console.log(`[${chalk.blue('>')}] ${msg}`);
    }
};