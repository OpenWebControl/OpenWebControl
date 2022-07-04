var DiskDB = require('diskdb');
var { db } = require('./config');
const log = require('./logging');

class DataBase {
    constructor() {

        this.path = __dirname + '/../' + db.dir;

        this.collections = [
            'users',
            'domains',
            'databases',
            'mails',
            'sessions'
        ];

        this.db = DiskDB.connect(this.path, this.collections);

    }

    getDB() {
        return this.db;
    }

}
module.exports = DataBase;