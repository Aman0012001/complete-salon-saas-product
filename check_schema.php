<?php
require 'backend/config.php';
require 'backend/Database.php';
$db = Database::getInstance()->getConnection();
$stmt = $db->query('DESCRIBE customer_salon_profiles');
$columns = $stmt->fetchAll();
foreach ($columns as $col) {
    echo $col['Field'] . " - " . $col['Type'] . "\n";
}
