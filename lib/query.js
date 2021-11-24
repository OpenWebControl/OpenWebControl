const DataBase = require('./mysql');
const db = new DataBase();

var func = {};
func['auth_login'] = async function(type, username, pass) {
    var sql = await db.format('SELECT * FROM `users` WHERE  ?? = ? AND BINARY ?? = ? AND BINARY ?? = ?;', ['type', type, 'username', username, 'password', pass]);

    // console.log(sql);

    return await db.query(sql);
};
func['install_table'] = async function(sql) {
    db.query(sql);
}

module.exports = func;