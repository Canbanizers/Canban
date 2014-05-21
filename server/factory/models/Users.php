<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

/**
 * Class User
 *
 * Representation of the Userstable in Database
 * The class provide the necessary REST-operations which are called dynamic in ModelFactory
 */
class Users extends ActiveRecord\Model {

	/**
	 * @var string
	 */
	public static $tablename = 'users';

	/**
	 * @var string
	 */
	public static $primary_key = 'id';

	/**
	 * @param array $params
	 *
	 * @return \ActiveRecord\Model
	 */
	public function createUser($params) {
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			// TODO Check if on new user an date will be set or not
			if ('lastlogin' === $param) {
				$date = new DateTime('now');
				$params['lastlogin'] = $date->format('Y-m-d H:i:s');
			}

			if('password' === $param) {
				$params['password'] = password_hash($value, PASSWORD_DEFAULT);
			}
		}

		return self::create($params);
	}

	/**
	 * @return mixed
	 */
	public function findAllUser() {
		return self::find('all');
	}

	/**
	 * @param int $id
	 *
	 * @return null
	 */
	public function deleteUser($id) {
		$user = self::find($id);
		$user->delete();

		return null;
	}

	/**
	 * @param int $id
	 *
	 * @return mixed
	 */
	public function findUser($id) {
		return self::find($id);
	}

	/**
	 * @param int $id
	 * @param array $params
	 *
	 * @return mixed
	 */
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
