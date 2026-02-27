<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

function debug_log($msg)
{
    echo $msg . "\n";
    file_put_contents('debug_test.txt', date('[H:i:s] ') . $msg . "\n", FILE_APPEND);
}

@unlink('debug_test.txt');
debug_log("Starting test_membership_v3.php");

require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';
require_once __DIR__ . '/backend/Services/NotificationService.php';
require_once __DIR__ . '/backend/Services/LoyaltyService.php';
require_once __DIR__ . '/backend/Auth.php';

try {
    debug_log("Getting Database Instance...");
    $dbInstance = Database::getInstance();
    debug_log("Got Instance, getting connection...");
    $db = $dbInstance->getConnection();
    debug_log("Got connection!");

    $loyaltyService = new LoyaltyService($db);
    debug_log("LoyaltyService instantiated.");

    $userId = "888a6dac-e54d-4ddb-91da-08af2e7f7396";
    $salonId = "41957a34-8f09-4490-ba3b-a2412397962d";

    debug_log("Resetting user status...");
    $stmt = $db->prepare("UPDATE customer_salon_profiles SET membership_tier = 'standard', membership_expiry = NULL WHERE user_id = ? AND salon_id = ?");
    $stmt->execute([$userId, $salonId]);
    debug_log("User status reset (affected: " . $stmt->rowCount() . ")");

    debug_log("Executing Phase 2 (RM600 spend)...");
    $points = $loyaltyService->earnPoints($salonId, $userId, 600, "test-booking-" . time());
    debug_log("Earned Points: $points");

    $status = $loyaltyService->getCustomerStatus($salonId, $userId);
    debug_log("New Membership Tier: " . $status['membership_tier']);
    debug_log("Expiry: " . $status['membership_expiry']);

    if ($status['membership_tier'] === 'prestige') {
        debug_log("SUCCESS: Upgraded to Prestige!");
    }
    else {
        debug_log("FAILURE: Not upgraded to Prestige.");
    }

    debug_log("Executing Phase 3 (RM100 spend, double points)...");
    $points2 = $loyaltyService->earnPoints($salonId, $userId, 100, "test-booking-double-" . time());
    debug_log("Points for RM100 spend: $points2 (Expected 200 if settings is 1 point/RM)");

}
catch (Exception $e) {
    debug_log("EXCEPTION: " . $e->getMessage());
}
catch (Error $e) {
    debug_log("ERROR: " . $e->getMessage());
}
debug_log("Script finished.");
