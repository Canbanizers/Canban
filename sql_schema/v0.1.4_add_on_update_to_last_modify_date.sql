USE `canban`;

ALTER TABLE `tickets`
	CHANGE `last_modify_date`
		`last_modify_date`
		TIMESTAMP
		NOT NULL
		DEFAULT CURRENT_TIMESTAMP
		ON UPDATE CURRENT_TIMESTAMP;