const chalk = require('chalk');

module.exports = {
    info: function(msg) {
        console.log(`[${chalk.blue('>')}] ${msg}`);
    },
    debug: function(msg) {
        console.log(`${chalk.grey('[')}${chalk.blue('+')}${chalk.grey(']')} ${chalk.grey(msg)}`);
    }
};