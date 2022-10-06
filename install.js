const Data = require('./lib/database');
const D = new Data();
const DB = D.getDB();
const log = require('./lib/logging');
var { db } = require('./lib/config');

log.warn('Installing...');
log.info(`Host: ${db.host}\n[>] DataBase: ${db.database}`);

DB.users.save({
    type: 'admin',
    username: 'Admin',
    password: 'ChangeMe!',
    email: 'admin@example.com',
    suspended: false,
    limits: {
        storage: 1000,
        bandwidth: 1000,
        databases: 25,
        mails: 100
    }
});

log.warn('Installed!');

setInterval(() => {
    log.info('------------------------');
    log.warn('Admin username: "Admin"');
    log.warn('Admin password: "ChangeMe!"');
}, 1000);
