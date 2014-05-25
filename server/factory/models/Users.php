<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'../utils'.DIRECTORY_SEPARATOR.'UserToken.php';

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
	public function createUsers($params) {
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
	public function findAllUsers() {
		return self::find('all');
	}

	public function findQueryUsers($params) {
		$users = self::all(array('conditions' => array ('email = ? and password = ?', $params['email'], $params['password'])));
		$user = null;
		if(!empty($users)){
			$user = $users[0];
			$id = $user->id;
			$user->token  = UserToken::getToken();
			$user->save();
			$user = self::find($id);
		}

		return $user;
	}

	/**
	 * @param int $id
	 *
	 * @return null
	 */
	public function deleteUsers($id) {
		$user = self::find($id);
		$user->delete();

		return null;
	}

	/**
	 * @param int $id
	 *
	 * @return mixed
	 */
	public function findUsers($id) {
		return self::find($id);
	}

	/**
	 * @param int $id
	 * @param array $params
	 *
	 * @return mixed
	 */
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
