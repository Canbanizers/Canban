<?php

class HttpMethodNotAllowedException extends AbstractException
{
	public function __construct()
	{
		$this->setStatusCode(405);
	}
}
