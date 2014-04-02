<?php
require_once 'server/php/factory/library/php-activerecord-master/ActiveRecord.php';

class Tickets extends ActiveRecord\Model {

	public static $table_name = 'tickets';
	public static $primary_key = 'id';

	public function createNewTicket() {

		$title = $_REQUEST['title'];
		$now = date('Y-m-d H:i:S');

		parent::create(array(
			'state'            => 0,
			'content'          => '',
			'priority'         => 0,
			'creation_date'    => $now,
			'last_modify_date' => $now,
			'title'            => $title));
	}
}

