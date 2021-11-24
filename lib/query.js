const DataBase = require('./mysql');
const db = new DataBase();
const md5 = require('md5');

var func = {};
func['auth_login'] = async function(type, username, pass) {
    var sql = await db.format('SELECT * FROM `users` WHERE  ?? = ? AND BINARY ?? = ? AND BINARY ?? = ?;', ['type', type, 'username', username, 'password', pass]);

    // console.log(sql);

    return await db.query(sql);
};
func['session_new'] = async function(id, now) {
    var expire = now + 120000;
    var sesId = md5(`${Date.now()}.${Math.random()}.${id}`);
  var sql = await db.format('INSERT INTO ?? (`ID`, `userID`, `sessionID`, `expire`) VALUES (NULL, ?, ?, ?)', ['sessions', id, sesId, expire]);
  
  await db.query(sql);

  return {
      id: sesId,
      expire: expire,
      userId: id
  };
};
func['session_valid'] = async function(id) {
    var sql = await db.format('SELECT * FROM ?? WHERE BINARY `sessionID` = ?', ['sessions', id]);
    var now = Date.now();

    var sesData = await db.query(sql)[0];
    if (!sesData) return false;

    if (sesData['expire'] < now) {
        var sql2 = await db.format('DELETE FROM ?? WHERE `ID` = ?', ['sessions', sesData['id']]);
        await db.query(sql2);
        return false;
    }
    return true;
}
func['install_table'] = async function(sql) {
    db.query(sql);
}

module.exports = func;