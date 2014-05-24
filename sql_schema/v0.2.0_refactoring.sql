USE `canban`;

#remove unneeded tables
DROP TABLE IF EXISTS `userhasinvitation`;
DROP TABLE IF EXISTS `invitations`;
DROP TABLE IF EXISTS `userhasgrouproles`;
DROP TABLE IF EXISTS `grouphasboard`;
DROP TABLE IF EXISTS `grouphasticket`;
DROP TABLE IF EXISTS `grouphasuser`;
DROP TABLE IF EXISTS `grouproles`;
DROP TABLE IF EXISTS `groups`;

#empty all tables
TRUNCATE TABLE `boardhasticket`;
TRUNCATE TABLE `userhasboard`;

DELETE From `tickets`;
DELETE From `users`;
DELETE From `boards`;

#reset auto_increment
ALTER TABLE `boardhasticket` AUTO_INCREMENT = 1;
ALTER TABLE `userhasboard` AUTO_INCREMENT = 1;
ALTER TABLE `tickets` AUTO_INCREMENT = 1;
ALTER TABLE `users` AUTO_INCREMENT = 1;
ALTER TABLE `boards` AUTO_INCREMENT = 1;

#change last_login for registration user to have null in last_login
ALTER TABLE `users` CHANGE `last_login` `last_login` TIMESTAMP NULL;

#increase the maximum char value of ticket content an if none given to be null
ALTER TABLE `tickets` CHANGE `content` `content` VARCHAR(800) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL;