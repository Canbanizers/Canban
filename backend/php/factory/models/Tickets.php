<?php
//TODO: change include_path
set_include_path('D:\XAMPP\htdocs\Canban');
require_once 'backend/php/factory/library/php-activerecord-master/ActiveRecord.php';
require_once 'backend/php/factory/utils/CredentialsReader.php';

ActiveRecord\Config::initialize(function ($cfg) {
	$cfg->set_model_directory('models');
	$cr = new CredentialsReader();
	$credentials = $cr->getDBCredentials();
	$cfg->set_connections(array(
		'development' => 'mysql://'.$credentials['login'].':'.$credentials['password'].'@'.$credentials['domain']));
});

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

