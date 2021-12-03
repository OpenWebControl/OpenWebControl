const query = require('./lib/query');
const log = require('./lib/logging');
var { db } = require('./lib/config');

log.warn('Installing...');
log.info(`Host: ${db.host}\n[>] DataBase: ${db.database}`);

query.install_table('CREATE TABLE `users` ( `ID` INT NOT NULL AUTO_INCREMENT , `type` TEXT NOT NULL , `username` TEXT NOT NULL , `password` TEXT NOT NULL , `email` TEXT NOT NULL , `suspended` BOOLEAN NOT NULL , `limit_storage` INT NOT NULL , `limit_bandwidth` INT NOT NULL , `limit_db` INT NOT NULL , `limit_mail` INT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;');
query.install_table('CREATE TABLE `sessions` ( `ID` INT NOT NULL AUTO_INCREMENT , `userID` INT NOT NULL , `sessionID` TEXT NOT NULL , `expire` INT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;');
query.install_table('ALTER TABLE `sessions` CHANGE `expire` `expire` TEXT NOT NULL;');

query.install_table("INSERT INTO `users` (`ID`, `type`, `username`, `password`, `email`, `suspended`, `limit_storage`, `limit_bandwidth`, `limit_db`, `limit_mail`) VALUES (NULL, 'admin', 'Admin', 'ChangeMe!', 'admin@mysite.com', '0', '0', '0', '0', '0')");

log.warn('Installed!');

setInterval(() => {
    log.warn('Admin username: "Admin"');
    log.warn('Admin password: "ChangeMe!"');
}, 1000);
