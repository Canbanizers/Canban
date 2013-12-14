<?php
require(__DIR__.'\ModelController.php');

class RequestHandler {

	public function handleRequest() {
		//TODO: validate request
		if (!array_key_exists('controller', $_REQUEST)) {
			die("No Controller was assigned.");
		} else {
			switch ($_REQUEST['controller']) {
				case "modelController":
					$classname = 'ModelController';

					return new $classname($_REQUEST);
					break;
				default:
					die("No Job founded.");
			}
		}
	}
}

$r = new RequestHandler();
$r->handleRequest();