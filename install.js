const query = require('./lib/query');

console.log('Installing...')

query.install_table('CREATE TABLE `webhosting`.`users` ( `ID` INT NOT NULL AUTO_INCREMENT , `type` TEXT NOT NULL , `username` TEXT NOT NULL , `password` TEXT NOT NULL , `email` TEXT NOT NULL , `suspended` BOOLEAN NOT NULL , `limit_storage` INT NOT NULL , `limit_bandwidth` INT NOT NULL , `limit_db` INT NOT NULL , `limit_mail` INT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;');
query.install_table('CREATE TABLE `webhosting`.`sessions` ( `ID` INT NOT NULL AUTO_INCREMENT , `userID` INT NOT NULL , `sessionID` TEXT NOT NULL , `expire` INT NOT NULL , PRIMARY KEY (`ID`)) ENGINE = InnoDB;');