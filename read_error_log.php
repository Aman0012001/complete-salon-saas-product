<?php
$logFile = 'logs/php_error.log';
if (file_exists($logFile)) {
    $lines = file($logFile);
    $lastLines = array_slice($lines, -20);
    echo implode("", $lastLines);
}
else {
    echo "Log file not found.\n";
}
