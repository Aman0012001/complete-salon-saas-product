<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';
require_once __DIR__ . '/backend/Services/NotificationService.php';
require_once __DIR__ . '/backend/Services/LoyaltyService.php';
require_once __DIR__ . '/backend/Auth.php';

ob_implicit_flush(true);
while (ob_get_level())
    ob_end_clean();

try {
    echo "Getting Database Instance...\n";
    $dbInstance = Database::getInstance();
    echo "Got Instance, getting connection...\n";
    $db = $dbInstance->getConnection();
    echo "Got connection!\n";
    $loyaltyService = new LoyaltyService($db);

    echo "Checking if getCustomerStatus exists: " . (method_exists($loyaltyService, 'getCustomerStatus') ? 'YES' : 'NO') . "\n";

    $userId = "888a6dac-e54d-4ddb-91da-08af2e7f7396";
    $salonId = "41957a34-8f09-4490-ba3b-a2412397962d";

    echo "Resetting user status...\n";
    $db->prepare("UPDATE customer_salon_profiles SET membership_tier = 'standard', membership_expiry = NULL WHERE user_id = ? AND salon_id = ?")
        ->execute([$userId, $salonId]);

    echo "Executing Phase 2 (RM600 spend)...\n";
    $points = $loyaltyService->earnPoints($salonId, $userId, 600, "test-booking-" . time());
    echo "Earned Points: $points\n";

    $status = $loyaltyService->getCustomerStatus($salonId, $userId);
    echo "New Membership Tier: " . $status['membership_tier'] . "\n";
    echo "Expiry: " . $status['membership_expiry'] . "\n";

    if ($status['membership_tier'] === 'prestige') {
        echo "SUCCESS: Upgraded to Prestige!\n";
    }

    echo "Executing Phase 3 (RM100 spend, double points)...\n";
    $points2 = $loyaltyService->earnPoints($salonId, $userId, 100, "test-booking-double-" . time());
    echo "Points for RM100 spend (expected duplicated): $points2\n";

}
catch (Exception $e) {
    echo "EXCEPTION: " . $e->getMessage() . "\n";
}
catch (Error $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
echo "Script finished.\n";
