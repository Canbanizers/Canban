USE `canban`;

ALTER TABLE tickets
	CHANGE `creation_date`
		`creation_date`
		TIMESTAMP
		NOT NULL
		DEFAULT CURRENT_TIMESTAMP;

