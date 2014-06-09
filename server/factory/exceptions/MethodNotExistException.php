<?php

require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'AbstractException.php';

class MethodNotExistException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(500);
	}
}