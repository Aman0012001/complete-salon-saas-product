<?php
require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';

try {
    $db = Database::getInstance()->getConnection();
    echo "Database connection successful.\n";

    // Add membership columns to customer_salon_profiles
    echo "Updating customer_salon_profiles table...\n";

    // Check if columns exist first
    $stmt = $db->query("SHOW COLUMNS FROM customer_salon_profiles LIKE 'membership_tier'");
    if (!$stmt->fetch()) {
        $db->exec("ALTER TABLE customer_salon_profiles ADD COLUMN membership_tier ENUM('standard', 'prestige') DEFAULT 'standard' AFTER loyalty_points");
        echo "Added 'membership_tier' column.\n";
    }
    else {
        echo "'membership_tier' column already exists.\n";
    }

    $stmt = $db->query("SHOW COLUMNS FROM customer_salon_profiles LIKE 'membership_expiry'");
    if (!$stmt->fetch()) {
        $db->exec("ALTER TABLE customer_salon_profiles ADD COLUMN membership_expiry DATE NULL AFTER membership_tier");
        echo "Added 'membership_expiry' column.\n";
    }
    else {
        echo "'membership_expiry' column already exists.\n";
    }

    echo "Migration completed successfully.\n";

}
catch (Exception $e) {
    echo "Migration Error: " . $e->getMessage() . "\n";
}
