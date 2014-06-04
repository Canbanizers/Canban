<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

class Boards extends ActiveRecord\Model {

	public static $table_name = 'boards';
	public static $primary_key = 'id';


	private $searchArray = array(
		'select' => 'boards.*, GROUP_CONCAT(id_ticket) AS tickets, GROUP_CONCAT(distinct b.id) AS children',
		'joins'  => array('LEFT JOIN boardhasticket ON id_board = boards.id', 'LEFT JOIN boards AS b ON b.parent = boards.id'),
		'group'  => 'boards.id'



	);

	public function createBoards($params) {
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			if ('tickets' === $param || 'owner' === $param || 'children' === $param) {
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
			$this->searchArray['conditions'] = array('boards.creation_date > ?', $since);
			$boards = self::all($this->searchArray);
		} else {
			$this->searchArray['conditions'] = array();
			$boards = self::all($this->searchArray);
		}

		foreach ($boards as $board) {
			if ($board->tickets) {
				$board->tickets = explode(',', $board->tickets);
			} else {
				$board->tickets = array();
			}
                        if($board->children) {
                            $board->children = explode(',', $board->children);
                        } else {
                            $board->children = array();
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
		$this->searchArray['conditions'] = array('boards.id = ?', $id);

		return self::find($this->searchArray);
	}

	public function updateBoards($id, $params) {
		$board = self::find($id);
		foreach ($params as $param => $value) {
			if ('owner' !== $param && 'tickets' !== $param && 'children' !== $param) {
				$board->$param = $value;
			}
		}
		$board->save();

		return $this->findBoards($id);
	}
}
