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
		$url_params = $this->getUrlParams($_SERVER['REQUEST_URI']);

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
		$json = json_decode($req_body);

		if (empty($json)) {
			//TODO NoContentException
		}

		foreach ($json as $model_name => $params) {
			$modelcontroller = new ModelController();
			$modelcontroller->execute($model_name, $params, $req_method);
		};
	}

	private function getUrlParams($url) {
		$url_parts = explode('/', $url);

		foreach ($url_parts as $url_part) {
			$url_parts[] = strtolower($url_part);
		}

		return $url_parts;
	}
}