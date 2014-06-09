<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once 'BoardHasTicket.php';
require_once 'UserIdInterface.php';

/**
 * Class Tickets
 *
 * Represents our tickets-table in database.
 * The class provide the necessary REST-operations which are called dynamic in ModelFactory.
 */
class Tickets extends ActiveRecord\Model implements UserIdInterface {

	/**
	 * @var string
	 */
	public static $table_name = 'tickets';

	/**
	 * @var string
	 */
	public static $primary_key = 'id';

	/**
	 * @var int
	 */
	private $user_id;

	/**
	 * Function creates a ticket in database and associate it with its board
	 *
	 * @param array $params
	 *
	 * @return \ActiveRecord\Model
	 */
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

		$date = new DateTime('now');
		$params['creation_date'] = $date->format('Y-m-d H:i:s');
		$bhs = new BoardHasTicket();
		$ticket = self::create($params);
		$id_ticket = $ticket->id;
		$bhs->createBoardHasTicket($id_board, $id_ticket);

		$ticket = $this->findTickets($id_ticket);

		return $ticket;
	}

	/**
	 * Function to get all tickets from a single user.
	 * Only executed once when a user is logging in and retrieving all of his data.
	 *
	 *
	 * @param string $since
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

	/**
	 *
	 * Function delete a ticket in database. It's not resettable!
	 *
	 * @param int $id
	 *
	 * @return null
	 */
	public function deleteTickets($id) {
		$ticket = self::find($id);
		$ticket->delete();

		return null;
	}

	/**
	 *
	 * Retrieve a single ticket by the ticket-id.
	 *
	 * @param int $id
	 *
	 * @return \ActiveRecord\Model
	 */
	public function findTickets($id) {
		$search_array = $this->getSearchArray();
		$search_array['conditions'] = array('tickets.id = ?', $id);

		return self::first($search_array);
	}

	/**
	 * Update the properties of an existing ticket.
	 *
	 * @param int $id
	 * @param array $params
	 *
	 * @return \ActiveRecord\Model|mixed
	 */
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
		$select = array('select' => 'tickets.*, userhasboard.id_board AS board');
		$user_join =
			'JOIN userhasboard ON id_user = '.$this->user_id.' AND userhasboard.id_board = boardhasticket.id_board';
		$joins = array('joins' => array('LEFT JOIN boardhasticket on id_ticket = tickets.id', $user_join));

		return array_merge($select, $joins);
	}
}