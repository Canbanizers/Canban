<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once 'BoardHasTicket.php';
require_once 'UserIdInterface.php';

class Tickets extends ActiveRecord\Model implements UserIdInterface {

	public static $table_name = 'tickets';
	public static $primary_key = 'id';

	private $user_id;

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
		$search_array = $this->getSearchArray();
		if (null !== $since) {
			$search_array['conditions'] = array('creation_date > ? OR last_modify_date > ?', $since, $since);

			return self::all($search_array);
		}
		$search_array['conditions'] = array();

		return self::all($search_array);
	}

	public function deleteTickets($id) {
		$ticket = self::find($id);
		$ticket->delete();

		return null;
	}

	public function findTickets($id) {
		$search_array = $this->getSearchArray();
		$search_array['conditions'] = array('tickets.id = ?', $id);

		return self::first($search_array);
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

	public function setUserId($user_id) {
		$this->user_id = $user_id;
	}

	private function getSearchArray() {
		$select = array('select' => 'tickets.*, userhasboard.id_board AS board');
		$user_join =
			'JOIN userhasboard ON id_user = '.$this->user_id.' AND userhasboard.id_board = boardhasticket.id_board';
		$joins = array('joins' => array('LEFT JOIN boardhasticket on id_ticket = tickets.id', $user_join));

		return array_merge($select, $joins);
	}
}