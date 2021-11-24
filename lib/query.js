const DataBase = require('./mysql');
const db = new DataBase();

var func = {};
func['auth_login'] = async function(type, username, pass) {
    var sql = await db.format('SELECT * FROM `users` WHERE ?? = ? AND ?? = ? AND ?? = ?;', ['type', type, 'username', username, 'password', pass]);

    return await db.query(sql);
};
func['install_table'] = async function(sql) {
    db.query(sql);
}

module.exports = func;