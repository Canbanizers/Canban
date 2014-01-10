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
					break;
				default:
					die("No Job founded.");
			}
		}

		return new $classname($_REQUEST);
	}
}

$r = new RequestHandler();
$r->handleRequest();