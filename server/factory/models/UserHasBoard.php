<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

/**
 * Class UserHasBoard
 *
 * Represents our userhasboard-table in database.
 */
class UserHasBoard extends ActiveRecord\Model {

	/**
	 * @var string
	 */
	public static $table_name = 'userhasboard';

	/**
	 * @var string
	 */
	public static $primary_key = 'id';

	/**
	 * Set the relation between a user and his boards
	 *
	 * @param int $id_user
	 * @param int $id_board
	 *
	 * @return \ActiveRecord\Model
	 */
	public function createUserHasBoard($id_user, $id_board) {
		$params = [
			"id_user"  => $id_user,
			"id_board" => $id_board
		];

		return self::create($params);
	}
}
