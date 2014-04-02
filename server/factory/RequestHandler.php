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
		$model = $_REQUEST['model'];
		$id = null;

		if (!empty($_REQUEST['id'])) {
			$id = $_REQUEST['id'];
		}

		switch ($req_method) {
			case 'GET':
				if (null !== $id) {
					$req_method = 'find';
				} else {
					$req_method = 'findAll';
				}
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
		$response_model = null;

		if (null !== $id) {
			$response_model = $modelcontroller->execute($model, $json, $req_method, $id);
		} else {
			$response_model = $modelcontroller->execute($model, $json, $req_method);
		}


		$json = $response_model->to_array();

		$response_array = array(strtolower(get_class($response_model)) => $json);
		header("HTTP/1.0 200 ok");
		header('Content-Type: application/json');
		echo json_encode($response_array, JSON_FORCE_OBJECT);
	}

}