<?php

require_once 'UserIdInterface.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

/**
 * Class Boards
 *
 * Represents our boards-table in database.
 * The class provide the necessary REST-operations which are called dynamic in ModelFactory.
 */
class Boards extends ActiveRecord\Model implements UserIdInterface {

	/**
	 * @var string
	 */
	public static $table_name = 'boards';

	/**
	 * @var string
	 */
	public static $primary_key = 'id';

	/**
	 * @var int
	 */
	private $user_id;

	/**
	 * Function creates a board associated with a user
	 *
	 * @param array $params
	 *
	 * @return \ActiveRecord\Model
	 */
	public function createBoards($params) {
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}

			if ('tickets' === $param || 'children' === $param) {
				unset($params[$param]);
			}
		};
		$date = new DateTime('now');
		$params['creation_date'] = $date->format('Y-m-d H:i:s');
		$board = self::create($params);
		$uhb = new UserHasBoard();
		$id_board = $board->id;
		$uhb->createUserHasBoard($this->user_id, $id_board);
		$board = $this->findBoards($id_board);

		return $board;
	}

	/**
	 * Function to get all boards from a single user.
	 * Only executed once when a user is logging in and retrieving all of his data.
	 *
	 * @param string $since
	 *
	 * @return array|mixed
	 */
	public function findAllBoards($since) {
		$search_array = $this->getSearchArray();
		$boards = null;
		if (null !== $since) {
			$search_array['conditions'] = array('boards.creation_date > ?', $since);
		}
		$boards = self::all($search_array);
		foreach ($boards as $board) {
			if ($board->tickets) {
				$board->tickets = explode(',', $board->tickets);
			} else {
				$board->tickets = array();
			}
			if ($board->children) {
				$board->children = explode(',', $board->children);
			} else {
				$board->children = array();
			}
		}

		return $boards;
	}

	/**
	 * Function delete a board in database. It's not resettable!
	 *
	 * @param int $id
	 *
	 * @return null
	 */
	public function deleteBoards($id) {
		$board = self::find($id);
		$board->delete();

		return null;
	}

	/**
	 * Retrieve a single board by the id of the board.
	 *
	 * @param int $id
	 *
	 * @return mixed
	 */
	public function findBoards($id) {
		$search_array['conditions'] = array('boards.id = ?', $id);

		return self::find($search_array);
	}

	/**
	 * Update board settings like name, WIP and so on.
	 *
	 * @param int $id
	 * @param array $params
	 *
	 * @return mixed
	 */
	public function updateBoards($id, $params) {
		$board = self::find($id);
		foreach ($params as $param => $value) {
			if ('tickets' !== $param && 'children' !== $param) {
				$board->$param = $value;
			}
		}
		$board->save();

		return $this->findBoards($id);
	}

	/**
	 * @param int $user_id
	 */
	public function setUserId($user_id) {
		$this->user_id = $user_id;
	}

	/**
	 * Getter for query-parameters which are the same for several functions in this class.
	 *
	 * @return array
	 */
	private function getSearchArray() {
		$select =
			array('select' => 'boards.*, GROUP_CONCAT(id_ticket) AS tickets, GROUP_CONCAT(distinct b.id) AS children');
		$user_join =
			'JOIN userhasboard ON id_user = '.$this->user_id.' AND userhasboard.id_board = boards.id';
		$joins = array('joins' => array('LEFT JOIN boardhasticket ON boardhasticket.id_board = boards.id',
			'LEFT JOIN boards AS b ON b.parent = boards.id', $user_join));
		$group = array('group' => 'boards.id');

		return array_merge($select, $joins, $group);
	}
}
