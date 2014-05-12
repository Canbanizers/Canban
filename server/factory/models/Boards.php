<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

class Boards extends ActiveRecord\Model {

	public static $table_name = 'boards';
	public static $primary_key = 'id';

	public function createBoards($params) {
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			if ('tickets' === $param || 'owner' === $param) {
				unset($params[$param]);
			}
		};
		$board = self::create($params);
		//FIXME I need to fetch the board again to get the right creation_date which is created by default value
		$board = $this->findBoards($board->id);

		return $board;
	}

	/**
	 * @param $since
	 *
	 * @return array|mixed
	 */
	public function findAllBoards($since) {
		$boards = null;
		if (null !== $since) {
			$boards = self::find_by_sql(
				"SELECT boards.*, GROUP_CONCAT(id_ticket) AS tickets FROM boards ".
				"LEFT JOIN boardhasticket ON id_board = boards.id ".
				"WHERE creation_date > ?".
				"GROUP BY id_board"
				, array($since));
		} else {
			$boards = self::find_by_sql(
				"SELECT boards.*, GROUP_CONCAT(id_ticket) AS tickets FROM boards ".
				"LEFT JOIN boardhasticket ON id_board = boards.id ".
				"GROUP BY id_board"
			);
		}

		foreach ($boards as $board) {
			if ($board->tickets) {
				$board->tickets = explode(',', $board->tickets);
			} else {
				$board->tickets = array();
			}
		}

		return $boards;
	}

	public function deleteBoards($id) {
		$board = self::find($id);
		$board->delete();

		return null;
	}

	public function findBoards($id) {
		return self::find($id);
	}

	public function updateBoards($id, $params) {
		$board = self::find($id);
		foreach ($params as $param => $value) {
			if (!empty($value)) {
				$board->$param = $value;
			}
		}
		$board->save();

		return $board;
	}
}
