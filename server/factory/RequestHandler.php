<?php
require_once(__DIR__ . '\ModelController.php');
require_once(__DIR__ . '\ResponseFactory.php');
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'AbstractException.php';

class RequestModelEmptyException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(400);
	}
}

class HttpMethodNotAllowedException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(405);
	}
}

class InvalidJsonException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(400);
	}
}

class RequestHandler
{

	public function execute()
	{
		$response_factory = new ResponseFactory();
		try {
			$response = $this->handleRequest();

			if ($response instanceof Exception) {
				$response_factory->sendErrorResponse($response);
			} else {
				$response_factory->sendResponse($response);
			}

		} catch (Exception $e) {
			$response_factory->sendErrorResponse($e);
		}
	}


	/**
	 * json in request may look like this:
	 *
	 * {
	 * "user": {
	 * "email":"test@test.de",
	 * "firstname": "Max",
	 * "lastname": "Mustermann",
	 * "password": "password"
	 *         }
	 * }
	 *
	 * @return Exception|FileNotFoundException|MethodNotExistException|ActiveRecord\Model
	 * @throws HttpMethodNotAllowedException
	 * @throws InvalidJsonException
	 * @throws RequestModelEmptyException
	 */
	private function handleRequest()
	{
		$req_method = $_SERVER['REQUEST_METHOD'];
		$model = $_REQUEST['model'];
		if (null === $model) {
			$nrc_e = new RequestModelEmptyException();
			$nrc_e->setMessage('No model in request given.');
			throw $nrc_e;
		}
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
				$hmna_e = new HttpMethodNotAllowedException();
				$hmna_e->setMessage("HTTP-Method {$req_method} not allowed");
				throw $hmna_e;
				break;
		}

		$req_body = file_get_contents('php://input');
		$json = json_decode($req_body, true);

		//Methods without Request Body
		$allowed_values = array('find', 'findAll', 'delete');

		if (empty($json) && !in_array($req_method, $allowed_values)) {
			$ij_e = new InvalidJsonException();
			$ij_e->setMessage("Request body {$req_body} is not valid JSON for Method: {$req_method}.");
			throw $ij_e;
		}

		$modelcontroller = new ModelController();

		if (null !== $id) {
			return $modelcontroller->execute($model, $json, $req_method, $id);
		} else {
			return $modelcontroller->execute($model, $json, $req_method);
		}
	}

}