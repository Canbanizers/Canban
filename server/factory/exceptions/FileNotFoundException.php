<?php


class FileNotFoundException extends AbstractException
{

	public function __construct()
	{
		$this->setStatusCode(500);
	}
}