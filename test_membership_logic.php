<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';
require_once __DIR__ . '/backend/Services/NotificationService.php';
require_once __DIR__ . '/backend/Services/LoyaltyService.php';
require_once __DIR__ . '/backend/Auth.php';

try {
    $db = Database::getInstance()->getConnection();
    $loyaltyService = new LoyaltyService($db);

    $userId = "888a6dac-e54d-4ddb-91da-08af2e7f7396";
    $salonId = "41957a34-8f09-4490-ba3b-a2412397962d";
    $serviceId = "3b50a0c5-fc64-4158-9833-774b1d4844e5"; // Hydra Boost

    echo "--- Phase 1: Reset Status ---\n";
    $db->prepare("UPDATE customer_salon_profiles SET membership_tier = 'standard', membership_expiry = NULL WHERE user_id = ? AND salon_id = ?")
        ->execute([$userId, $salonId]);

    echo "--- Phase 2: Simulate RM600 Spend ---\n";
    $points = $loyaltyService->earnPoints($salonId, $userId, 600, "test-booking-1");
    echo "Earned Points: $points\n";

    $status = $loyaltyService->getCustomerStatus($salonId, $userId);
    echo "New Membership Tier: " . $status['membership_tier'] . "\n";
    echo "Expiry: " . $status['membership_expiry'] . "\n";

    if ($status['membership_tier'] === 'prestige') {
        echo "SUCCESS: Upgraded to Prestige!\n";
    }
    else {
        echo "FAILURE: Upgrade failed.\n";
    }

    echo "\n--- Phase 3: Verify Double Points ---\n";
    // Earn points on RM100 spend. Should be (100 * points_per_unit) * 2
    $points2 = $loyaltyService->earnPoints($salonId, $userId, 100, "test-booking-2");
    echo "Points for RM100 spend (should be doubled): $points2\n";

    echo "\n--- Phase 4: Verify Transaction Log ---\n";
    $stmt = $db->prepare("SELECT * FROM loyalty_transactions WHERE reference_id = 'test-booking-1'");
    $stmt->execute();
    $tx = $stmt->fetch();
    echo "TX Description: " . $tx['description'] . "\n";

}
catch (Exception $e) {
    echo "Test Error: " . $e->getMessage() . "\n";
}
