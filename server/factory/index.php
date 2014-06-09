<?php

require_once getcwd() . DIRECTORY_SEPARATOR . 'RequestHandler.php';
//entry point to the server
$r = new RequestHandler();
$r->execute();