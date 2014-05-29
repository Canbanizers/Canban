<?php
require_once(__DIR__ . '\ModelFactory.php');
require_once(__DIR__ . '\ResponseFactory.php');
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'RequestModelEmptyException.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'HttpMethodNotAllowedException.php';
require_once __DIR__ . DIRECTORY_SEPARATOR . 'exceptions' . DIRECTORY_SEPARATOR . 'InvalidJsonException.php';


//TODO: auskommentiertes kann weg, wenn keine weiteren fehler beim includen auftreten

//class RequestModelEmptyException extends AbstractException
//{
//
//	public function __construct()
//	{
//		$this->setStatusCode(400);
//	}
//}

//class HttpMethodNotAllowedException extends AbstractException
//{
//
//	public function __construct()
//	{
//		$this->setStatusCode(405);
//	}
//}

//class InvalidJsonException extends AbstractException
//{
//
//	public function __construct()
//	{
//		$this->setStatusCode(400);
//	}
//}

/**
 * Class RequestHandler
 *
 * Handler to process the request
 */
class RequestHandler
{

	/**
	 * function to start the whole process, one and only accessible function from external services
	 * and will be called in index.php (centralized entry point)
	 *
	 */
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

		$modelfactory = new ModelFactory();

		if (null !== $id) {
			return $modelfactory->execute($model, $json, $req_method, $id);
		} else if (null !== $since) {
			return $modelfactory->execute($model, $json, $req_method, null, $since);
		} else {
			return $modelfactory->execute($model, $json, $req_method);
		}
	}

}