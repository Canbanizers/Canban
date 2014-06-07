<?php

require_once 'AbstractException.php';

class ResponseModelEmptyException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(400);
	}
}