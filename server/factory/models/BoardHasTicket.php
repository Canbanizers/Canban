<?php

//require_once getcwd().DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once getcwd().DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

class BoardHasTicket extends ActiveRecord\Model {

	public static $table_name = 'boardhasticket';
	public static $primary_key = 'id';

	public function createBoardHasTicket($id_board, $id_ticket) {
		$params = [
			"id_board"  => $id_board,
			"id_ticket" => $id_ticket
		];

		return self::create($params);
	}

	public function findTicketsByBoard($id_board) {
		return self::find('all');
	}
}
