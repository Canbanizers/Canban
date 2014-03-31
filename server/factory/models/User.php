<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'observer_subject/SubjectInterface.php';

class User extends ActiveRecord\Model implements SubjectInterface {

	/**
	 * @var ObserverInterface
	 */
	private $observer;

	public static $tablename = 'user';
	public static $primary_key = 'id';

	public function createUser($params) {
		foreach ($params as $param => $value) {
			if (!empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			if ('lastlogin' === $param) {
				$date = new DateTime('now');
				$params['lastlogin'] = $date->format('Y-m-d H:i:s');
			}
		}
		self::create($params);
	}

	public function findAllUser() {
		return self::find('all');
	}

	public function deleteUser($id) {
		$user = self::find($id);
		$user->delete();
	}

	public function findUser($id) {
		return self::find($id);
	}

	public function updateUser($id, $params) {
		$user = self::find($id);
		foreach ($params as $param => $value) {
			if (!empty($value)) {
				$user->$param = $value;
			}
		}
		$user->save();
	}

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
