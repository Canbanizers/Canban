<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

$time = date('D, d M Y H:i');
echo "data: {$time}\n\n";
flush();
sleep(1);