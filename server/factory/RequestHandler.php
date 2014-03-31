<?php
require_once(__DIR__.'\ModelController.php');

class RequestHandler {

	/**
	 * json in request may look like this:
	 *    {
	 * "user": {
	 * "email":"test@test.de",
	 * "firstname": "Max",
	 * "lastname": "Mustermann",
	 * "password": "password"
	 * }
	 * }
	 *
	 */
	public function handleRequest() {

		$req_method = $_SERVER['REQUEST_METHOD'];

		switch ($req_method) {
			case 'GET':
				$req_method = strtolower($req_method);
				break;
			case 'POST':
				$req_method = 'create';
				break;
			case 'PUT':
				$req_method = 'update';
				break;
			case 'DELETE':
				$req_method = strtolower($req_method);
				break;
			default:
				//TODO UndefinedRequestmethodException
				break;
		}

		$req_body = file_get_contents('php://input');
		$json = json_decode($req_body, true);

		if (empty($json)) {
			//TODO NoContentException
		}

		$modelcontroller = new ModelController();
		if (!empty($_REQUEST['id'])) {
			$modelcontroller->execute($_REQUEST['model'], $json, $req_method, $_REQUEST['id']);
		} else {
			$modelcontroller->execute($_REQUEST['model'], $json, $req_method);
		}
	}

}