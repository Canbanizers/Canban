<?php

/**
 * Class ResponseFactory
 *
 * Factory to get and prepare the Response for the client
 */
class ResponseFactory
{
	/**
	 * function to send the response to the client with the correct http-header
	 * the response will be decoded to json
	 *
	 * @param mixed $response_models
	 * @param int $status_code
	 */
	public function sendResponse($response_models, $status_code = 200)
	{
		mb_internal_encoding('UTF-8');
		header("HTTP/1.0 {$status_code}");
		header('Content-Type: application/json');

		//		$debug = ($response_models[0] instanceof Tickets);
		if (200 === $status_code) {
			$response_array = array();
			if (is_array($response_models)) {
				foreach ($response_models as $model) {
					$response_array[strtolower(get_class($model))][] = $model->to_array();
				}
			} elseif (null === $response_models) {
				$response_array = null;
			} else {
				$data_array = $response_models->to_array();
				$response_array = array(strtolower(get_class($response_models)) => $data_array);
			}
			$response_array = $this->utf8Encode($response_array);
			$jsonResponse = json_encode($response_array);

			echo $jsonResponse;
		} else {
			echo $response_models;
		}
	}

	/**
	 * if any errors occured in response (e.g. from database or internal server error), the function will provide them
	 *
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

	/**
	 * TODO: catch exceptions
	 *
	 * Encode array regardless of which depth to UTF
	 *
	 * @param array $array
	 *
	 * @return array
	 */
	private function utf8Encode(array $array) {
		$utf8_encoded = array();
		foreach ($array as $key => $value) {
			if (is_array($value)) {
				$utf8_encoded[$key] = $this->utf8Encode($value);
			} elseif (is_string($value)) {
				$utf8_encoded[$key] = utf8_encode($value);
			} else {
				$utf8_encoded[$key] = $value;
			}
		}

		return $utf8_encoded;

	}
} 