<?php

require_once getcwd().DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR.'UserIdInterface.php';
require_once getcwd().DIRECTORY_SEPARATOR.'observer_subject'.DIRECTORY_SEPARATOR.'SubjectInterface.php';
require_once getcwd().DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';
require_once getcwd().DIRECTORY_SEPARATOR.'utils'.DIRECTORY_SEPARATOR.'CredentialsReader.php';
require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'AbstractException.php';
require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'FileNotFoundException.php';
require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'MethodNotExistException.php';
require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'SQLException.php';

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
	 * @var mixed
	 */
	private $user_id;

	/**
	 * @param mixed $user_id
	 */
	public function __construct($user_id) {
		$this->user_id = $user_id;
	}

	/**
	 * Function get the $model_name, build and return the correct classname for the model
	 *
	 * @param string $model_name
	 *
	 * @throws FileNotFoundException
	 * @throws Exception
	 *
	 * @return ActiveRecord\Model
	 */
	private function getModel($model_name) {
		$path_to_models = __DIR__.DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR;

		if (!file_exists($path_to_models.ucfirst($model_name).'.php')) {
			$fnf_e = new FileNotFoundException();
			$fnf_e->setMessage("File {$model_name} in {$path_to_models} not found");
			throw $fnf_e;
		}
		require_once realpath($path_to_models.ucfirst($model_name).'.php');
		try{
			return new $model_name();
		} catch (\Exception $e){
			throw($e);
		}
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
			if ('users' === $model_name && 'update' !== $req_method) {
				if (!empty($params['password'])) {
					$params['password'] = md5($params['password']);
				} elseif (!empty($params['user']['password'])) {
					$params['user']['password'] = md5($params['user']['password']);
				}
			}
			$model = $this->getModel($model_name);
			if ($model instanceof UserIdInterface) {
				$model->setUserId($this->user_id);
			}
			$model_class = ucfirst($model_name);
			$method_name = $req_method.$model_class;
			if (!method_exists($model, $method_name)) {
				$fnf_e = new MethodNotExistException();
				$fnf_e->setMessage("Method {$method_name} in class {$model_class} not found");
				throw $fnf_e;
			}

			$response = null;
			try {
				switch ($req_method) {
					case 'update':
						$response = $model->$method_name($id, $params[array_shift(array_keys($params))]);
						break;
					case 'create':
						$response = $model->$method_name($params[array_shift(array_keys($params))]);
						break;
					case 'findAll':
						$response = $model->$method_name($since);
						break;
					case 'findQuery':
						$response = $model->$method_name($params);
						break;
					default:
						$response = $model->$method_name($id);
				}
			} catch (Exception $e) {
				$sql_e = new SQLException();
				$sql_e->setMessage('Unable to execute ' . $req_method . 'on model ' . $model_name. '. Reason: '.$e->getMessage());
				throw $sql_e;
			}
			$this->notify($response);
		} catch (Exception $e) {
			return $e;
		}
	}

	/**
	 * @param ObserverInterface $observer
	 */
	public function addObserver(ObserverInterface $observer) {
		$this->observer = $observer;
	}

	/**
	 * @param ObserverInterface $observer
	 */
	public function removeObserver(ObserverInterface $observer) {
		$this->observer = null;
	}

	/**
	 * @param mixed $response
	 */
	public function notify($response) {
		$this->observer->update($response);
	}
}