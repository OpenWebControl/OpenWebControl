const DataBase = require('./mysql');
const db = new DataBase();
const md5 = require('md5');

var func = {};
func['auth_login'] = async function(type, username, pass) {
    var sql = await db.format('SELECT * FROM `users` WHERE  ?? = ? AND BINARY ?? = ? AND BINARY ?? = ?;', ['type', type, 'username', username, 'password', pass]);

    // console.log(sql);

    return await db.query(sql);
};
func['session_new'] = async function(id) {
    var expire = Date.now() + 120000;
    var sesId = md5(`${Date.now()}.${Math.random()}.${id}`);
  var sql = await db.format('INSERT INTO ?? (`ID`, `userID`, `sessionID`, `expire`) VALUES (NULL, ?, ?, ?)', ['sessions', id, sesId, expire]);
  
  await db.query(sql);

  return {
      id: sesId,
      expire: expire,
      userId: id
  };
};
func['install_table'] = async function(sql) {
    db.query(sql);
}

module.exports = func;