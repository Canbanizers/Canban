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
	 * @param ActiveRecord\Model $user
	 * @param string $model_name
	 *
	 * @throws FileNotFoundException
	 * @return ActiveRecord\Model
	 */
	private function getModel($user, $model_name) {
		$path_to_models = __DIR__.DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR;

		if (!file_exists($path_to_models.ucfirst($model_name).'.php')) {
			$fnf_e = new FileNotFoundException();
			$fnf_e->setMessage("File {$model_name} in {$path_to_models} not found");
			throw $fnf_e;
		}

		require_once($path_to_models.ucfirst($model_name).'.php');

		return new $model_name($user);
	}

	/**
	 * Function build the right REST-operation for the request (e.g. create, delete ....) and execute it on the modelclass
	 *
	 * @param ActiveRecord\Model $user
	 * @param string $model_name
	 * @param array $params
	 * @param string $req_method
	 * @param int $id
	 * @param null $since
	 *
	 * @return FileNotFoundException|MethodNotExistException|ActiveRecord\Model
	 */
	public function execute($user, $model_name, $params, $req_method, $id = 0, $since = null) {

		try {
			if ('users' === $model_name && 'update' !== $req_method) {
				if(!empty($params['password'])){
					$params['password'] = md5($params['password']);
				} elseif(!empty($params['user']['password'])){
					$params['user']['password'] = md5($params['user']['password']);
				}
			}
			$model = $this->getModel($user, $model_name);

			$model_class = ucfirst($model_name);

			$method_name = $req_method.$model_class;

			if (!method_exists($model, $method_name)) {
				$fnf_e = new MethodNotExistException();
				$fnf_e->setMessage("Method {$method_name} in class {$model_class} not found");
				throw $fnf_e;
			}

			$response = null;
			switch ($req_method) {
				case 'update':
					$response =  $model->$method_name($id, $params[array_shift(array_keys($params))]);
					break;
				case 'create':
					$response =  $model->$method_name($params[array_shift(array_keys($params))]);
					break;
				case 'findAll':
					$response =  $model->$method_name($since);
					break;
				case 'findQuery':
					$response =  $model->$method_name($params);
					break;
				default:
					$response =  $model->$method_name($id);
			}
			if(!$response){
				//TODO: throw error
			}
			$this->notify($response);
		} catch (Exception $e) {
			return $e;
		}
	}

	public function addObserver(ObserverInterface $observer) {
		$this->observer = $observer;
	}

	public function removeObserver(ObserverInterface $observer) {
		$this->observer = null;
	}

	public function notify($response) {
		var_dump($response);
		$this->observer->update($response);
	}
}