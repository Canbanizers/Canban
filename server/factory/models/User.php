<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

class User extends ActiveRecord\Model {

	public static $tablename = 'user';
	public static $primary_key = 'id';

	public function createUser($params) {
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			if ('lastlogin' === $param) {
				$date = new DateTime('now');
				$params['lastlogin'] = $date->format('Y-m-d H:i:s');
			}
		}

		return self::create($params);
	}

	public function findAllUser() {
		return self::find('all');
	}

	public function deleteUser($id) {
		$user = self::find($id);
		$user->delete();

		return $user;
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

		return $user;
	}
}
