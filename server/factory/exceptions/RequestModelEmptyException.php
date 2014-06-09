<?php

require_once getcwd().DIRECTORY_SEPARATOR.'exceptions'.DIRECTORY_SEPARATOR.'AbstractException.php';

/**
 * Class RequestModelEmptyException
 */
class RequestModelEmptyException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(400);
	}
}