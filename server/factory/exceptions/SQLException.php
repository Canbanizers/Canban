<?php


class SQLException extends AbstractException{

	public function __construct()
	{
		$this->setStatusCode(500);
	}
} 