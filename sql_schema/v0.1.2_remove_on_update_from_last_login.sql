USE `canban`;

ALTER TABLE `users`
	CHANGE COLUMN `lastlogin`
		`last_login`
		TIMESTAMP
		NOT NUlL
		DEFAULT CURRENT_TIMESTAMP;