<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

class Users extends ActiveRecord\Model {

	public static $tablename = 'users';
	public static $primary_key = 'id';

	public function createUsers($params) {
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			if('password' === $param) {
				$params['password'] = password_hash($value, PASSWORD_DEFAULT);
			}
		}

		return self::create($params);
	}

	public function findAllUsers() {
		return self::find('all');
	}

	public function deleteUsers($id) {
		$user = self::find($id);
		$user->delete();

		return null;
	}

	public function findUsers($id) {
		return self::find($id);
	}

	public function updateUsers($id, $params) {
		$user = self::find($id);
		foreach ($params as $param => $value) {
			if (!empty($value)) {
				$user->$param = $value;
			}
		}
		$user->save();

		return $user;
	}
}
