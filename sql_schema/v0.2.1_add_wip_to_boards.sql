USE `canban`;
#ADD wip to boards table
ALTER TABLE `boards`
ADD COLUMN `wip` INT(2) NOT NULL;