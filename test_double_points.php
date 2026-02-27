<?php
require 'backend/config.php';
require 'backend/Database.php';
require 'backend/Services/NotificationService.php';
require 'backend/Services/LoyaltyService.php';
require 'backend/Auth.php';

$db = Database::getInstance()->getConnection();
$loyaltyService = new LoyaltyService($db);
$userId = "888a6dac-e54d-4ddb-91da-08af2e7f7396";
$salonId = "41957a34-8f09-4490-ba3b-a2412397962d";

echo "Current status:\n";
$status = $loyaltyService->getCustomerStatus($salonId, $userId);
print_r($status);

$startPoints = $status['loyalty_points'];

echo "Earning RM100 spend (should be double = 200 points)...\n";
// Note: We might hang here if notifyUser hangs, but the DB update should happen before the hang.
// To avoid hang for this test, I'll use a try-catch and set a timeout if possible, 
// but since I can't easily set a PHP timeout for a specific call, I'll just check the DB AFTER if it hangs.
$points = $loyaltyService->earnPoints($salonId, $userId, 100, "double-points-test-" . time());
echo "Points earned: $points\n";

$newStatus = $loyaltyService->getCustomerStatus($salonId, $userId);
echo "New points: " . $newStatus['loyalty_points'] . "\n";
echo "Difference: " . ($newStatus['loyalty_points'] - $startPoints) . "\n";
