<?php


class ModelController {

	public function execute($table, $action, array $params) {

		$path_to_models = '\models\\';
		$classname = $path_to_models . $table . '.php';

		/*if (!(class_exists($classname) && method_exists($classname, $action))) {
			//TODO return error message
		}

		$class = new $classname();*/


		print_r($params);

		for ($i = 0; $i < count($params); $i++) {
			echo $params[$i];
		}
		exit;
		$class->$action($params);
	}
}