<?php

class User extends ActiveRecord\Model {

	public static $tablename = 'user';
	public static $primary_key = 'id';

	public function getFirstnameById($id) {
		$sql = <<<SQL
SELECT firstname
FROM users
WHERE id = $id
SQL;

		$firstname_ar = User::find_by_sql($sql);

		foreach ($firstname_ar as $firstname) {
			return $firstname->firstname;
		}

		return null;
	}

	public function getPasswordByEmail($email) {
		$sql = <<<SQL
SELECT password
FROM users
WHERE email = '$email'
SQL;

		$email_ar = User::find_by_sql($sql);
		foreach ($email_ar as $password) {
			return $password->password;
		}

		return null;
	}
	public function retrieveByCredentials($email, $password_hash) {

		$sql = <<<SQL
	SELECT *
	FROM users
	WHERE email = '$email'
	AND password = '$password_hash'
SQL;

		$user = User::find_by_sql($sql);

		return $user;
	}


}

?>
