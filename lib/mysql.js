var mysql = require('promise-mysql');
var { format } = require('mysql');
var { db } = require('./config');
const log = require('./logging');

class DataBase {
    constructor() {
        this.host = db.host;
        this.port = db.port;
        this.user = db.username;
        this.pass = db.password;
        this.database = db.database;
    }
    async connect() {
        var con = await mysql.createConnection({
            host     : this.host,
            port     : this.port,
            user     : this.user,
            password : this.pass,
            database : this.database
        });
        // log.debug(`Database connected to ${this.host}:${this.port}!`);
        return con;
    }
    async query(sql) {
        var conn = await this.connect();
        
        var data;
        data = {};
        data = conn.query(sql);
        data.queryId = conn.connection.threadId;

        log.debug(`Database executed query with ID ${data.queryId}`);

        return data;
    }

    async format(sql, data) {

        var sqls = format(sql, data);
        return  sqls;

    }

    async exampleQuery(user) {
        var sql = format('SELECT * FROM ?? WHERE ?? = ?;', ['users', 'discord_user', user]);
        return await this.query(sql);
    }
}
module.exports = DataBase;