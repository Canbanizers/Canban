USE `canban`;

DROP TABLE IF EXISTS `userhasinvitation`;
DROP TABLE IF EXISTS `invitations`;
DROP TABLE IF EXISTS `userhasgrouproles`;
DROP TABLE IF EXISTS `grouphasboard`;
DROP TABLE IF EXISTS `grouphasticket`;
DROP TABLE IF EXISTS `grouphasuser`;
DROP TABLE IF EXISTS `grouproles`;
DROP TABLE IF EXISTS `groups`;

TRUNCATE TABLE `boardhasticket`;
TRUNCATE TABLE `userhasboard`;

DELETE From `tickets`;
DELETE From `users`;
DELETE From `boards`;

ALTER TABLE `boardhasticket` AUTO_INCREMENT = 1;
ALTER TABLE `userhasboard` AUTO_INCREMENT = 1;
ALTER TABLE `tickets` AUTO_INCREMENT = 1;
ALTER TABLE `users` AUTO_INCREMENT = 1;
ALTER TABLE `boards` AUTO_INCREMENT = 1;