<?php
require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';

try {
    $db = Database::getInstance()->getConnection();

    // Find a user
    $user = $db->query("SELECT id, email FROM users LIMIT 1")->fetch(PDO::FETCH_ASSOC);

    // Find a salon
    $salon = $db->query("SELECT id, name FROM salons LIMIT 1")->fetch(PDO::FETCH_ASSOC);

    // Find a service from that salon
    $service = null;
    if ($salon) {
        $stmt = $db->prepare("SELECT id, name, price FROM services WHERE salon_id = ? LIMIT 1");
        $stmt->execute([$salon['id']]);
        $service = $stmt->fetch(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        'user' => $user,
        'salon' => $salon,
        'service' => $service
    ], JSON_PRETTY_PRINT);

}
catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
