const DataBase = require('./mysql');
const config = require('./config');
const db = new DataBase();
const md5 = require('md5');
const log = require('./logging');

var func = {};
func['auth_login'] = async function(type, username, pass) {
    var sql = await db.format('SELECT * FROM `users` WHERE  ?? = ? AND BINARY ?? = ? AND BINARY ?? = ?;', ['type', type, 'username', username, 'password', pass]);

    // console.log(sql);

    return await db.query(sql);
};
func['session_new'] = async function(id, now) {
    var expire = Date.now();
    var sesId = md5(`${Date.now()}.${Math.random()}.${id}`);
  var sql = await db.format('INSERT INTO ?? (`ID`, `userID`, `sessionID`, `expire`) VALUES (NULL, ?, ?, ?)', ['sessions', id, sesId, expire]);
  
  log.info(`User with ID ${id} logged in!`);

  await db.query(sql);

  return {
      id: sesId,
      expire: expire,
      userId: id
  };
};
func['session_valid'] = async function(id) {
    var sql = await db.format('SELECT * FROM ?? WHERE BINARY `sessionID` = ?', ['sessions', id]);
    var now = Date.now() - config.main.expire;

    var sesData = await db.query(sql);
    sesData = sesData[0];
    // console.log(sesData);
    if (!sesData) return false;

    // log.debug('Session will expire in ' + config.main.expire + '' + Date.now() - sesData['expire'] + ' ms');

    if ((Date.now() - sesData['expire']) > config.main.expire) {
        var sql2 = await db.format('DELETE FROM ?? WHERE `ID` = ?', ['sessions', sesData['id']]);
        log.info(`The session ${id} expired!`);
        await db.query(sql2);
        return false;
    }
    return true;
}
func['session_all'] = async function() {
    var sql = await db.format('SELECT * FROM ??', ['sessions']);
    var results = await db.query(sql);

    var c;
    c = 0;

    for (let i = 0; i<results.length; i++) {
        var row = results[i];

        if ((Date.now() - row['expire']) > config.main.expire) {
            var sql2 = await db.format('DELETE FROM ?? WHERE `ID` = ?', ['sessions', row['ID']]);
            log.info(`The session ${row['ID']} expired!`);
            await db.query(sql2);
            c = c = 1;
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