<?php
//TODO: change include_path
set_include_path('D:\XAMPP\htdocs\Canban');
require_once 'server/php/factory/library/php-activerecord-master/ActiveRecord.php';
require_once 'server/php/factory/utils/CredentialsReader.php';

ActiveRecord\Config::initialize(function ($cfg) {
	$cfg->set_model_directory('models');
	$cr = new CredentialsReader();
	$credentials = $cr->getDBCredentials();
	$cfg->set_connections(array(
		'development' => 'mysql://'.$credentials['login'].':'.$credentials['password'].'@'.$credentials['domain']));
});

class Tickets extends ActiveRecord\Model implements SubjectInterface {

	public static $table_name = 'tickets';
	public static $primary_key = 'id';

	/**
	 * @var ObserverInterface
	 */
	private $observer = null;

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

	public function addObserver(ObserverInterface $observer) {
		$this->observer = $observer;
	}

	public function removeObserver(ObserverInterface $observer) {
		$this->observer = null;
	}

	public function notify() {
		$this->observer->update();
	}
}

