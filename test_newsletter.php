<?php
require_once __DIR__ . '/backend/config.php';
require_once __DIR__ . '/backend/Database.php';

function getResponseBody($url, $data)
{
    $options = [
        'http' => [
            'header' => "Content-type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($data),
            'ignore_errors' => true
        ]
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    return $result;
}

$apiUrl = "http://localhost:8000/api/newsletter/subscribe";
$testEmail = "test_" . time() . "@example.com";

echo "Testing newsletter subscription for $testEmail...\n";
$response = getResponseBody($apiUrl, ['email' => $testEmail]);

echo "Response: $response\n";

if (strpos($response, 'SUB50') !== false) {
    echo "SUCCESS: Discount code SUB50 found in response.\n";
}
else {
    echo "FAILURE: Discount code not found.\n";
}
