USE `canban`;

ALTER TABLE `BOARDS`
ADD COLUMN `CREATION_DATE` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

