<?php


class InvalidJsonException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(400);
	}
}