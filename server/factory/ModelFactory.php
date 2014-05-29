<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'observer_subject'.DIRECTORY_SEPARATOR.'SubjectInterface.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'utils'.DIRECTORY_SEPARATOR.'CredentialsReader.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'AbstractException.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'FileNotFoundException.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'MethodNotExistException.php';

/**
 * Loading credentials and initialize connection to database
 */
ActiveRecord\Config::initialize(
	function ($cfg) {
		$credentials_reader = new CredentialsReader();
		try {
			$credentials_reader->getSqlConnectionString();
		} catch (Exception $e) {
			return $e;
		}
		$connection_string = $credentials_reader->getSqlConnectionString();
		$cfg->set_model_directory('models');
		$cfg->set_connections(array('development' => $connection_string));
	}
);


//TODO: auskommentiertes kann weg, wenn keine weiteren fehler beim includen auftreten

//class MethodNotExistException extends AbstractException {
//
//	public function __construct() {
//		$this->setStatusCode(500);
//	}
//}

/**
 * Class ModelFactory
 *
 * Factory to load dynamic the required modelclass and execute the correct REST-operation on it
 */
class ModelFactory implements SubjectInterface {

	/**
	 * @var ObserverInterface
	 */
	private $observer = null;

	/**
	 * Function get the $model_name, build and return the correct classname for the model
	 *
	 * @param string $model_name
	 *
	 * @return ActiveRecord\Model
	 * @throws FileNotFoundException
	 */
	private function getModel($model_name) {
		$path_to_models = __DIR__.DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR;

		if (!file_exists($path_to_models.ucfirst($model_name).'.php')) {
			$fnf_e = new FileNotFoundException();
			$fnf_e->setMessage("File {$model_name} in {$path_to_models} not found");
			throw $fnf_e;
		}

		require_once($path_to_models.ucfirst($model_name).'.php');

		return new $model_name();
	}

	/**
	 * Function build the right REST-operation for the request (e.g. create, delete ....) and execute it on the modelclass
	 *
	 * @param string $model_name
	 * @param array $params
	 * @param string $req_method
	 * @param int $id
	 * @param null $since
	 *
	 * @return FileNotFoundException|MethodNotExistException|ActiveRecord\Model
	 */
	public function execute($model_name, $params, $req_method, $id = 0, $since = null) {
		try {
			$model = $this->getModel($model_name);

			$model_class = ucfirst($model_name);

			$method_name = $req_method.$model_class;

			if (!method_exists($model, $method_name)) {
				$fnf_e = new MethodNotExistException();
				$fnf_e->setMessage("Method {$method_name} in class {$model_class} not found");
				throw $fnf_e;
			}


			switch ($req_method) {
				case 'update':
					return $model->$method_name($id, $params[array_shift(array_keys($params))]);
				case 'create':
					return $model->$method_name($params[array_shift(array_keys($params))]);
				case 'findAll':
					return $model->$method_name($since);
				case 'findQuery':
					return $model->$method_name($params);
				default:
					return $model->$method_name($id);
			}

		} catch (Exception $e) {
			return $e;
		}
	}


	//TODO: Bleibt erstmal drin!
	public function addObserver(ObserverInterface $observer) {
		$this->observer = $observer;
	}

	public function removeObserver(ObserverInterface $observer) {
		$this->observer = null;
	}

	public function notify() {
		$this->observer->update();
	}
}