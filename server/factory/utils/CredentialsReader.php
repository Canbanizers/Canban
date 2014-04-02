<?php

class CredentialsReader {

	const PATH_TO_XML = '..\xml\db_credentials.xml';
	const PROTOCOL = 'mysql';
	const SERVER = 'localhost';
	const DB_NAME = 'canban';
	private $db_login = '';
	private $db_password = '';

	private function setDBCredentials() {
		$xml = simplexml_load_file(__DIR__.'/'.self::PATH_TO_XML);

		$xpaths = array(
			'password' => '/credentials/password/db/text()',
			'login'    => '/credentials/login/db/text()'
		);

		$password = $xml->xpath($xpaths['password']);
		$this->db_password = (string) $password[0];

		$login = $xml->xpath($xpaths['login']);
		$this->db_login = (string) $login[0];
	}

	public function getSqlConnectionString() {
		$this->setDBCredentials();

		return
			self::PROTOCOL.'://'.trim($this->db_login).':'.trim($this->db_password).'@'.self::SERVER.'/'.self::DB_NAME;
	}

}