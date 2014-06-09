<?php

abstract class AbstractException extends Exception {

	/**
	 * @var int
	 */
	private $status_code = 0;

	/**
	 * @param int $status_code
	 */
	public function setStatusCode($status_code) {
		$this->status_code = $status_code;
	}

	/**
	 * @return int
	 */
	public function getStatusCode() {
		return $this->status_code;
	}

	/**
	 * @param string $message
	 */
	public function setMessage($message) {
		$this->message = $message;
	}
}