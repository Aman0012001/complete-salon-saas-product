<?php
require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';

try {
    $db = Database::getInstance()->getConnection();
    echo "--- newsletter_subscribers schema ---\n";
    $stmt = $db->query("DESCRIBE newsletter_subscribers");
    $fields = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($fields);
}
catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
