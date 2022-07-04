const DataBase = require('./database');
const config = require('./config');
const db = new DataBase();
const md5 = require('md5');
const log = require('./logging');

var func = {};
func['auth_login'] = function(type, username, pass) {
    var DB = db.getDB();

    return DB.users.find({
        type,
        username,
        password: pass
    })[0];
};
func['session_new'] = function(id, now) {
    var expire = Date.now();
    var sesId = md5(`${Date.now()}.${Math.random()}.${id}`);
    var DB = db.getDB();

    db.sessions.save({
        id,
        sesId,
        expire
    });
  
  log.info(`User with ID ${id} logged in!`);

  return {
      id: sesId,
      expire,
      userId: id
  };
};
func['session_valid'] = function(id) {
    var DB = db.getDB();

    var sesData = DB.sessions.find({
        id
    })[0];

    var now = Date.now() - config.main.expire;
    if (!sesData) {
        return false;
    }

    log.debug('Session will expire in ' + config.main.expire + '' + Date.now() - sesData['expire'] + ' ms');

    if ((Date.now() - sesData['expire']) > config.main.expire) {
        DB.sessions.remove({
            id
        });
        log.info(`The session ${id} expired!`);
        return false;
    }
    return true;
}
func['session_all'] = function() {
    var DB = db.getDB();

    var results = db.sessions.find();

    log.debug(`Session count: ${results.length}!`);

    var c;
    c = 0;

    for (let i = 0; i<results.length; i++) {
        var row = results[i];

        if ((Date.now() - row['expire']) > config.main.expire) {

            log.info(`The session ${row['ID']} expired!`);
            DB.sessions.remove({
                id
            });
            c = c + 1;
        }
    }

    if (!results[0]) {
        c = 0;
        log.info('There are no expired sessions!');
    }

    log.info(`Deleted ${c} expired sessions!`);
}
func['install_table'] = async function(sql) {
    await db.query(sql);
    return true;
}

module.exports = func;