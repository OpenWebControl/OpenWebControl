var mysql = require('promise-mysql');
var { format } = require('mysql');
var { db } = require('./config');

class DataBase {
    constructor() {
        this.host = db.host;
        this.port = db.port;
        this.user = db.username;
        this.pass = db.password;
        this.database = db.database;
    }
    async connect() {
        return await mysql.createConnection({
            host     : this.host,
            port     : this.port,
            user     : this.user,
            password : this.pass,
            database : this.database
        })
    }
    async query(sql) {
        var conn = await this.connect();
        
        var data;
        data = {};
        data = conn.query(sql);
        data.queryId = conn.connection.threadId;

        console.log(`Executed query with ID ${data.queryId}`);

        return data;
    }

    async exampleQuery(user) {
        var sql = format('SELECT * FROM ?? WHERE ?? = ?;', ['users', 'discord_user', user]);
        return await this.query(sql);
    }
}
module.exports = DataBase;