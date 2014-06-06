<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'models/BoardHasTicket.php';

class Tickets extends ActiveRecord\Model {

	public static $table_name = 'tickets';
	public static $primary_key = 'id';

	private $searchArray = array(
		'select' => 'tickets.*, id_board AS board',
		'joins' => 'LEFT JOIN boardhasticket on id_ticket = tickets.id'
	);

	public function createTickets($params) {
		$id_board = null;
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
		$id_ticket = $ticket->id;
		$bhs->createBoardHasTicket($id_board, $id_ticket);

		$ticket = $this->findTickets($id_ticket);

		return $ticket;
	}

	/**
	 * @param $since
	 *
	 * @return array|mixed
	 */
	public function findAllTickets($since) {
		if (null !== $since) {
			$this->searchArray['conditions'] = array('creation_date > ? OR last_modify_date > ?', $since, $since);

			return self::all($this->searchArray);
		}
		$this->searchArray['conditions'] = array();

		return self::all($this->searchArray);
	}

	public function deleteTickets($id) {
		$ticket = self::find($id);
		$ticket->delete();

		return null;
	}

	public function findTickets($id) {
		$this->searchArray['conditions'] = array('tickets.id = ?', $id);

		return self::first($this->searchArray);
	}

	public function updateTickets($id, $params) {
		$ticket = self::find($id);
		foreach ($params as $param => $value) {
			if (!empty($value) && 'board' !== $param) {
				$ticket->$param = $value;
			}
		}
		$ticket->save();
		$ticket = $this->findTickets($id);

		return $ticket;
	}
}