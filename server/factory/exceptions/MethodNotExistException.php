<?php

require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'AbstractException.php';

/**
 * Class MethodNotExistException
 */
class MethodNotExistException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(500);
	}
}