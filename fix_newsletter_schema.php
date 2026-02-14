<?php
require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';

try {
    $db = Database::getInstance()->getConnection();
    echo "--- Fixing newsletter_subscribers table ---\n";

    // 1. Drop the table and recreate it correctly to avoid issues with potential data mismatches
    // (In a production environment, we would use ALTER, but since this is a dev/saas setup, 
    // recreating it is cleaner to ensure INT AUTO_INCREMENT)

    // Check if table exists
    $stmt = $db->query("SHOW TABLES LIKE 'newsletter_subscribers'");
    if ($stmt->rowCount() > 0) {
        echo "Backing up existing emails...\n";
        $stmt = $db->query("SELECT email FROM newsletter_subscribers");
        $emails = $stmt->fetchAll(PDO::FETCH_COLUMN);

        echo "Dropping old table...\n";
        $db->exec("DROP TABLE newsletter_subscribers");
    }
    else {
        $emails = [];
    }

    echo "Creating new table with INT AUTO_INCREMENT...\n";
    $db->exec("CREATE TABLE newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        is_active TINYINT(1) DEFAULT 1,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at TIMESTAMP NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    if (!empty($emails)) {
        echo "Restoring emails...\n";
        $stmt = $db->prepare("INSERT IGNORE INTO newsletter_subscribers (email) VALUES (?)");
        foreach ($emails as $email) {
            $stmt->execute([$email]);
        }
    }

    echo "Successfully fixed newsletter_subscribers schema.\n";
}
catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
