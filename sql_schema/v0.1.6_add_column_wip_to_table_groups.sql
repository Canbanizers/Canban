USE `canban`;

ALTER TABLE `groups`
	ADD COLUMN `wip`
		INT(11)
		NOT NULL;

