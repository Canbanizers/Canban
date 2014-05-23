USE `canban`;

DROP TABLE IF EXISTS `invitations`;
DROP TABLE IF EXISTS `userhasinvitation`;
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