<?php

//require_once getcwd().DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once getcwd().DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

/**
 * Class BoardHasTicket
 *
 * Represents our boardhasticket-table in database.
 *
 */
class BoardHasTicket extends ActiveRecord\Model {

	/**
	 * @var string
	 */
	public static $table_name = 'boardhasticket';

	/**
	 * @var string
	 */
	public static $primary_key = 'id';

	/**
	 * Set the relation between a board and its tickets
	 *
	 * @param $id_board
	 * @param $id_ticket
	 *
	 * @return \ActiveRecord\Model
	 */
	public function createBoardHasTicket($id_board, $id_ticket) {
		$params = [
			"id_board"  => $id_board,
			"id_ticket" => $id_ticket
		];

		return self::create($params);
	}
}
