<?php


class ModelController {

	private $request;

	public function __construct($request) {
		$this->request = $request;
		$this->execute();
	}

	private function execute() {

		$path_to_class = '\models\\';
		$classname = '';

		if (!$_REQUEST['table']) {
			die("Invalid Modelclass.");
		} else {
			switch ($_REQUEST['table']) {
				case 'Tickets':
					$classname .= $_REQUEST['table'];
					break;
				default:
					die("Invalid Modelclass");

			}
		}

		$classpath = $classname;

		$include_path = getcwd().$path_to_class.$classname.'.php';
		include($include_path);
		$class = new $classpath;

		switch ($_REQUEST['action']) {
			case 'save':
				$class->saveNewTicket();
				break;
			default:
				die("Funtion not found. Use the same name for funtions and actions");
		}
	}
}