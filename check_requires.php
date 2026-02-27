<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "Checking config...\n";
require_once __DIR__ . '/backend/config.php';
echo "Checking Database...\n";
require_once __DIR__ . '/backend/Database.php';
echo "Checking NotificationService...\n";
require_once __DIR__ . '/backend/Services/NotificationService.php';
echo "Checking LoyaltyService...\n";
require_once __DIR__ . '/backend/Services/LoyaltyService.php';
echo "Checking Auth...\n";
require_once __DIR__ . '/backend/Auth.php';

echo "All files required successfully!\n";
