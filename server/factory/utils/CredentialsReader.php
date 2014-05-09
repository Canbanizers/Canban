<?php

require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'AbstractException.php';
require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'FileNotFoundException.php';

class UndefinedOffsetException extends AbstractException {

	public function __construct() {
		$this->setStatusCode(500);
	}
}

/**
 * Class CredentialsReader
 *
 * Utility class to load the database-credentials from unversioned xml-file
 */
class CredentialsReader {

	const PATH_TO_XML = '..\xml';
	const PROTOCOL = 'mysql';
	const SERVER = 'localhost';
	const DB_NAME = 'canban';
	private $db_login = '';
	private $db_password = '';

	/**
	 * setter-function to set the private member-variables above
	 * 1. load xml-file
	 * 2. get credentials with SimpleXMLs xpath
	 * 3. set variables
	 *
	 * @throws FileNotFoundException
	 */
	private function setDBCredentials() {

		$full_path_to_xml = __DIR__.'/'.self::PATH_TO_XML.'\db_credentials.xml';

		if (!file_exists($full_path_to_xml)) {
			$fnf_e = new FileNotFoundException();
			$fnf_e->setMessage("Config-File db_credentials.xml in {$full_path_to_xml} not found");
			throw $fnf_e;
		}

		$xml = simplexml_load_file($full_path_to_xml);

		$xpaths = array(
			'password' => '/credentials/password/db/text()',
			'login'    => '/credentials/login/db/text()'
		);


		$password = $xml->xpath($xpaths['password']);
		$login = $xml->xpath($xpaths['login']);

		$this->db_password = (string) $password[0];
		$this->db_login = (string) $login[0];
	}

	/**
	 * visible function to get the credentials when they're needed
	 *
	 * @return string
	 */
	public function getSqlConnectionString() {
		$this->setDBCredentials();

		return
			self::PROTOCOL.'://'.trim($this->db_login).':'.trim($this->db_password).'@'.self::SERVER.'/'.self::DB_NAME;
	}

}