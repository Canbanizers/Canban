USE `canban`;

ALTER TABLE `tickets`
	ADD `title`
		VARCHAR( 255 )
		CHARACTER SET utf8
		COLLATE utf8_general_ci
		NOT NULL;