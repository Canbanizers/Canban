<?php
require(__DIR__.'\ModelController.php');
require(__DIR__.'\SecurityController.php');

class RequestHandler {


	/**
	 * @var array
	 */
	private $params = array(
		'controller', 'table', 'action', 'params'
	);

	/**
	 * @param string $param
	 *
	 * @return string
	 */
	private function mapParam($param) {

		$param_name = '';
		$param = explode('_', $param);
		foreach ($param as $part) {
			$param_name .= ucfirst($part);
		}

		return $param_name;
	}

	/**
	 * @param $request
	 *
	 * @return bool
	 */
	private function validateRequest($request) {

		foreach ($request as $request_param_key => $request_param_value) {

			if (!in_array($request_param_key, $this->params)) {
				return false;
			}

			if (!is_array($request_param_value)) {
				$param = explode('_', $request_param_value);
				foreach ($param as $param_part) {
					//TODO Check for forbidden characters
					if (!is_string($param_part)) {
						return false;
					}
				}
			}
		}

		return true;
	}

	public function handleRequest() {
		if (!$this->validateRequest($_REQUEST)) {
			//TODO return error message
		}
		$class_name = $this->mapParam($_REQUEST['controller']);
		$function_name = $this->mapParam($_REQUEST['action']);
		if (!(class_exists($class_name) && method_exists($class_name, $function_name))) {
			//TODO return error message
		}
		$class = new $class_name();
		$class->$function_name($_REQUEST['params']);
	}
}

$r = new RequestHandler();
$r->handleRequest();