<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

class UserHasBoard extends ActiveRecord\Model {

	public static $table_name = 'userhasboard';
	public static $primary_key = 'id';

	public function createUserHasBoard($id_user, $id_board) {
		$params = [
			"id_user"  => $id_user,
			"id_board" => $id_board
		];

		return self::create($params);
	}
}
