<?php
require 'backend/config.php';
require 'backend/Database.php';
$db = Database::getInstance()->getConnection();
$userId = "888a6dac-e54d-4ddb-91da-08af2e7f7396";
$stmt = $db->prepare('SELECT loyalty_points, membership_tier, membership_expiry FROM customer_salon_profiles WHERE user_id = ?');
$stmt->execute([$userId]);
$status = $stmt->fetch();
print_r($status);
