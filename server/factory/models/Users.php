<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
//require_once getcwd().DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'utils'.DIRECTORY_SEPARATOR.'UserToken.php';
//require_once getcwd().DIRECTORY_SEPARATOR.'utils'.DIRECTORY_SEPARATOR.'UserToken.php';

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
	 * Create a single user (e.g in registration)
	 *
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
			if ('lastlogin' === $param) {
				$date = new DateTime('now');
				$params['lastlogin'] = $date->format('Y-m-d H:i:s');
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

	/**
	 * Find the user by params with unique values. This function will be called in loginprocess to validate the user.
	 *
	 * @param $params
	 *
	 * @return array
	 */
	public function findQueryUsers($params) {
		$users = self::all(array('conditions' => array ('email = ? and password = ?', $params['email'], $params['password'])));
		$user = null;
		if(!empty($users)){
			$user = $users[0];
			$id = $user->id;
			$user->token = UserToken::getToken();
			$user->save();
			$user = self::find($id);
			$users[0] = $user;
		}
		return $users;
	}

	/**
	 * Check if a user with the given validation-token exists in database.
	 * If there is a corresponding entry in database the user has the permission to do other actions,
	 * if not he will get logged out.
	 *
	 * @param string $token
	 *
	 * @return mixed
	 */
	public function findByToken($token) {
		return self::find(array('conditions' => array('token = ?', $token)));
	}

	/**
	 * Function delete a user in database. It's not resettable!
	 *
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
	 * Find a single user by his id.
	 *
	 * @param int $id
	 *
	 * @return mixed
	 */
	public function findUsers($id) {
		return self::find($id);
	}

	/**
	 * Update userattributes like if an user will update his personal data in profile area.
	 *
	 * @param int $id
	 * @param array $params
	 *
	 * @return mixed
	 */
	public function updateUsers($id, $params) {
		$user = self::find($id);
		if (!empty($params['password']) && $user->password !== $params['password']) {
			$params['password'] = md5($params['password']);
		}
		foreach ($params as $param => $value) {
			$user->$param = $value;
		}

		$user->save();
		return $user;
	}
}