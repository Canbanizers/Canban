<?php
require_once(__DIR__ . '\ResponseFactory.php');
require_once(__DIR__ . '\SecurityController.php');
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'RequestModelEmptyException.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'HttpMethodNotAllowedException.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'InvalidJsonException.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'observer_subject' . DIRECTORY_SEPARATOR . 'ObserverInterface.php';

/**
 * Class RequestHandler
 *
 * Handler to process the request
 */
class RequestHandler implements ObserverInterface
{
	/**
	 * @var mixed
	 */
	private $response;

	/**
	 * function to start the whole process, one and only accessible function from external services
	 * and will be called in index.php (centralized entry point)
	 *
	 */
	public function execute()
	{
		$response_factory = new ResponseFactory();
		try {
			$this->handleRequest();
			if ($this->response instanceof Exception) {
				$response_factory->sendErrorResponse($this->response);
			} else {
				$response_factory->sendResponse($this->response);
			}

		} catch (Exception $e) {
			$response_factory->sendErrorResponse($e);
		}
	}


	/**
	 * function will divide and prepare the complete request
	 * 1. get the request-params
	 * 2. validate params
	 * 3. get REST-operation from request
	 * 4. call the modelfactory with prepared params
	 *
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
		$since = null;
		if (!empty($_REQUEST['since'])) {
			$since = $_REQUEST['since'];
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

		$security_controller = new SecurityController($this);
		$token = null;
		try {
			$token = @$_SERVER['HTTP_X_TOKEN'];
		} catch (Exception $e) {
		}
//		if(!$security_controller->hasPermission($model, $req_method, $token)) {
//			var_dump("TEST");
//			die;
//		}

		$req_body = file_get_contents('php://input');
		if('logins' === $model && 'findAll' === $req_method && empty($req_body)) {
			$req_method = 'findQuery';
			$model = 'users';
			$json = array('email' => $_REQUEST['email'], 'password' => $_REQUEST['password']);

		} else {
			$json = json_decode($req_body, true);
		}
		//Methods without Request Body
		$allowed_values = array('find', 'findAll', 'delete');

		if (empty($json) && !in_array($req_method, $allowed_values)) {
			$ij_e = new InvalidJsonException();
			$ij_e->setMessage("Request body {$req_body} is not valid JSON for Method: {$req_method}.");
			throw $ij_e;
		}

		$security_controller->execute($model, $json, $req_method, $id, $since);
	}

	/**
	 * @param mixed $response
	 */
	public function update($response)
	{
		$this->response = $response;
	}
}