<?php


class ResponseFactory
{
	/**
	 * @param mixed $response_models
	 * @param int $status_code
	 */
	public function sendResponse($response_models, $status_code = 200)
	{
		header("HTTP/1.0 {$status_code}");
		header('Content-Type: application/json');

		if (200 === $status_code) {
			$response_array = array();
			if (is_array($response_models)) {
				foreach ($response_models as $model) {
					$response_array[strtolower(get_class($model))][] = $model->to_array();
				}
			} else {
				$data_array = $response_models->to_array();
				$response_array =  array(strtolower(get_class($response_models)) => $data_array);
			}
			echo json_encode($response_array);
		} else {
			echo $response_models;
		}
	}

	/**
	 * @param Exception $e
	 */
	public function sendErrorResponse(Exception $e)
	{
		$data_array = array('error' => $e->getMessage());
		$json = json_encode($data_array, JSON_FORCE_OBJECT);

		if ($e instanceof AbstractException) {
			$status_code = $e->getStatusCode();
		} else {
			$status_code = '500';
		}
		$this->sendResponse($json, $status_code);
	}
} 