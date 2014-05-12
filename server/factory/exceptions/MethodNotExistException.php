<?php

class MethodNotExistException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(500);
	}
}