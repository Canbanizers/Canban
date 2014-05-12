<?php

class RequestModelEmptyException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(400);
	}
}