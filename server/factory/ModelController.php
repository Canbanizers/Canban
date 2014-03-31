<?php

require_once __DIR__.DIRECTORY_SEPARATOR.'observer_subject'.DIRECTORY_SEPARATOR.'SubjectInterface.php';
require_once __DIR__.DIRECTORY_SEPARATOR.'library/php-activerecord-master/ActiveRecord.php';

//TODO: load credentials from config
ActiveRecord\Config::initialize(function ($cfg) {
	$cfg->set_model_directory('models');
	$cfg->set_connections(array(
		'development' => 'mysql://root:@localhost/canban'));
});
class ModelController implements SubjectInterface {

	/**
	 * @var ObserverInterface
	 */
	private $observer = null;

	public function execute($model_name, $params, $req_method, $id = 0) {
		$path_to_models = __DIR__.DIRECTORY_SEPARATOR.'models'.DIRECTORY_SEPARATOR;

		if (!file_exists($path_to_models.$model_name)) {
			//TODO FileNotFoundException
		} elseif (!class_exists($path_to_models.$model_name)) {
			//TODO ClassNotFoundException
		}

		require_once($path_to_models.ucfirst($model_name).'.php');

		$model_class = new $model_name();


		$method_name = $req_method.ucfirst($model_name);
		if (!method_exists($model_class, $method_name)) {
			//TODO MethodNotFoundException
		}

		if ('update' === $req_method) {
			$model_class->$method_name($id, $params[array_shift(array_keys($params))]);
		} elseif ('create' === $req_method) {
			$model_class->$method_name($params[array_shift(array_keys($params))]);
		} else {
			$model_class->$method_name($id);
		}
	}

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