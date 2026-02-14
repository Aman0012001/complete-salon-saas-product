<?php
/**
 * 📧 SMTP VERIFICATION SCRIPT
 * Run this to test your .env SMTP configuration
 */

require_once __DIR__ . '/backend/api/index.php'; // This loads config and EmailService
require_once __DIR__ . '/backend/Services/EmailService.php';

echo "--- 📧 SMTP Connection Test ---\n";
echo "Host: " . SMTP_HOST . "\n";
echo "Port: " . SMTP_PORT . "\n";
echo "User: " . SMTP_USER . "\n";
echo "From: " . SMTP_FROM_EMAIL . "\n";
echo "-------------------------------\n";

$testEmail = SMTP_USER; // Send to self
$subject = "SMTP Test from Noamskin";
$body = "<h1>Connection Successful!</h1><p>If you are reading this, your SMTP settings are working correctly.</p>";

echo "Attempting to send test email to $testEmail...\n";

$result = EmailService::send($testEmail, $subject, $body, "SMTP Test Successful!", true);

if ($result['success']) {
    echo "\n✅ SUCCESS: Email sent successfully!\n";
}
else {
    echo "\n❌ FAILURE: " . $result['error'] . "\n";
    echo "\n💡 TROUBLESHOOTING TIPS:\n";
    echo "1. Ensure SMTP_PASS in .env is a 16-character Gmail APP PASSWORD (not your account password).\n";
    echo "2. If using port 587, make sure your firewall allows outgoing traffic on this port.\n";
    echo "3. Try changing SMTP_PORT to 465 in .env if 587 fails.\n";
    echo "4. Ensure 'Less secure app access' is handled via App Passwords for Gmail.\n";
}
