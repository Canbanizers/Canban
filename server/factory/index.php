<?php
require_once(__DIR__ . '\RequestHandler.php');

//entry point to the server
$r = new RequestHandler();
$r->execute();