<?php
//TODO: change include_path
set_include_path('C:\xampp\htdocs\Canban');
require_once 'backend/php/factory/library/php-activerecord-master/ActiveRecord.php';

ActiveRecord\Config::initialize(function ($cfg) {
	$cfg->set_model_directory('models');
	$cfg->set_connections(array(
		'development' => 'mysql://root:@localhost/canban'));
});

class Tickets extends ActiveRecord\Model {

	public static $table_name = 'tickets';


	public static $primary_key = 'id';

	public function saveNewTicket() {

		if ($_REQUEST['action'] == 'saveNewTicket') {

			$title = $_REQUEST['title'];
			$now = date('Y-m-d H:i:S');

			parent::create(array(
				'state'         => 0,
				'content'       => '',
				'priority'      => 0,
				'creation_date' => $now,
				'last_modify_date' => $now,
				'title' => $title));
		}
	}
}

$t = new Tickets();
$t->saveNewTicket();

