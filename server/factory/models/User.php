<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord/ActiveRecord.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'observer_subject/SubjectInterface.php';

class User extends ActiveRecord\Model implements SubjectInterface {

	/**
	 * @var ObserverInterface
	 */
	private $observer;

	public static $tablename = 'user';
	public static $primary_key = 'id';

	public function createUser($params) {
		self::create($params);
	}

	//	public function getFirstnameById($id) {
	//		$sql = <<<SQL
	//SELECT firstname
	//FROM users
	//WHERE id = $id
	//SQL;
	//
	//		$firstname_ar = User::find_by_sql($sql);
	//
	//		foreach ($firstname_ar as $firstname) {
	//			return $firstname->firstname;
	//		}
	//
	//		return null;
	//	}
	//
	//	public function getPasswordByEmail($email) {
	//		$sql = <<<SQL
	//SELECT password
	//FROM users
	//WHERE email = "$email"
	//SQL;
	//
	//		$email_ar = User::find_by_sql($sql);
	//		foreach ($email_ar as $password) {
	//			return $password->password;
	//		}
	//
	//		return null;
	//	}

	public function addObserver(ObserverInterface $observer) {
		$this->observer = $observer;
	}

	public function removeObserver(ObserverInterface $observer) {
		$this->observer = null;
	}

	public function notify() {
		$this->observer->update();
	}
}
