<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'models/BoardHasTicket.php';

class Tickets extends ActiveRecord\Model {
	private $user = null;

	public static $table_name = 'tickets';
	public static $primary_key = 'id';

	public $searArray = array(
		'select' => 'tickets.*, id_board AS board',
		'joins' => array('boardhasticket', 'userhasboard')
	);

	public function _construct($user) {
		$this->user = $user;
	}

	public function createTickets($params) {
		$id_board = null;
		$id_ticket = null;
		foreach ($params as $param => $value) {
			if (empty($value)) {
				$index = array_search($param, $params);
				unset($index);
			}
			if ('board' === $param) {
				$id_board = $params[$param];
				unset($params[$param]);
			}
		}

		$bhs = new BoardHasTicket();
		$ticket = self::create($params);
		$bhs->createBoardHasTicket($id_board, $ticket->id);

		return $ticket;
	}

	/**
	 * @param $since
	 *
	 * @return array|mixed
	 */
	public function findAllTickets($since) {
		if (null !== $since) {
			$this->searArray['conditions'] = array('id_user = ? AND (creation_date > ? OR last_modify_date > ?)',
												   $this->user->id, $since, $since);
			return self::find($this->searArray);
		}
		$this->searArray['conditions'] = array('id_user = ?', $this->user->id);
		return self::find($this->searArray);
	}

	public function deleteTickets($id) {
		$ticket = self::find($id);
		$ticket->delete();

		return null;
	}

	public function findTickets($id) {
		return self::find($id);
	}

	public function updateTickets($id, $params) {
		$ticket = self::find($id);
		foreach ($params as $param => $value) {
			if (!empty($value) && 'board' !== $param) {
				$ticket->$param = $value;
			}
		}
		$ticket->save();

		return $ticket;
	}
}
