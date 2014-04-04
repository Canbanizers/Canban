<?php


class ResponseFactory
{
	public function sendResponse($response_model, $status_code = 200)
	{
		header("HTTP/1.0 {$status_code}");
		header('Content-Type: application/json');
		if (200 === $status_code) {
			$data_array = $response_model->to_array();
			$response_array = array(strtolower(get_class($response_model)) => $data_array);
			echo json_encode($response_array, JSON_FORCE_OBJECT);
		} else {
			echo $response_model;
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