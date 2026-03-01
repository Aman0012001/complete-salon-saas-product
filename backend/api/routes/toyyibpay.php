<?php
/**
 * ToyyibPay Payment Routes
 */

function sendToyyibPayRequest($url, $data)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        error_log('[ToyyibPay] cURL Error: ' . curl_error($ch));
    }

    curl_close($ch);
    return json_decode($response, true);
}

// POST /api/toyyibpay/create-bill
if ($method === 'POST' && count($uriParts) === 2 && $uriParts[1] === 'create-bill') {
    $data = getRequestBody();
    $bookingIdsString = $data['booking_id'] ?? null;

    if (!$bookingIdsString) {
        sendResponse(['error' => 'Booking ID is required.'], 400);
    }

    $bookingIds = explode(',', $bookingIdsString);
    $totalAmount = 0;
    $firstBooking = null;

    foreach ($bookingIds as $index => $id) {
        $stmt = $db->prepare("SELECT b.*, s.name as service_name, salon.name as salon_name, u.email, p.full_name, p.phone 
                              FROM bookings b 
                              JOIN services s ON b.service_id = s.id 
                              JOIN salons salon ON b.salon_id = salon.id
                              JOIN users u ON b.user_id = u.id
                              JOIN profiles p ON u.user_id = p.user_id
                              WHERE b.id = ?");
        $stmt->execute([$id]);
        $booking = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$booking) {
            continue; // Skip if not found, or handle error
        }

        $totalAmount += (float) $booking['price_paid'];
        if ($index === 0) {
            $firstBooking = $booking;
        }
    }

    if (!$firstBooking) {
        sendResponse(['error' => 'No valid bookings found.'], 404);
    }

    if ($totalAmount <= 0) {
        sendResponse(['error' => 'Invalid total booking amount.'], 400);
    }

    $toyyibData = [
        'userSecretKey' => TOYYIBPAY_SECRET_KEY,
        'categoryCode' => TOYYIBPAY_CATEGORY_CODE,
        'billName' => 'Salon Booking - ' . $firstBooking['salon_name'],
        'billDescription' => 'Booking for ' . (count($bookingIds) > 1 ? count($bookingIds) . ' services' : $firstBooking['service_name']) . ' at ' . $firstBooking['booking_date'] . ' ' . $firstBooking['booking_time'],
        'billPriceSetting' => 1,
        'billPayorInfo' => 1,
        'billAmount' => (int) ($totalAmount * 100), // Convert to cents/sen (integer)
        'billReturnUrl' => TOYYIBPAY_RETURN_URL . '?booking_id=' . $bookingIdsString,
        'billCallbackUrl' => TOYYIBPAY_CALLBACK_URL,
        'billExternalReferenceNo' => (string) $bookingIdsString,
        'billTo' => $firstBooking['full_name'],
        'billEmail' => $firstBooking['email'],
        'billPhone' => $firstBooking['phone'] ?: '0000000000',
        'billPaymentChannel' => '0', // 0 for all channels
    ];

    // Log the request for debugging
    error_log('[ToyyibPay] Creating Bill Request: ' . json_encode($toyyibData));

    $response = sendToyyibPayRequest(TOYYIBPAY_BASE_URL . '/index.php/api/createBill', $toyyibData);

    // Log the full response
    error_log('[ToyyibPay] API Response: ' . json_encode($response));

    if (isset($response[0]['BillCode'])) {
        $billCode = $response[0]['BillCode'];

        // Use the first ID for the transaction record, but full string is in external_ref
        $stmt = $db->prepare("INSERT INTO payment_transactions (booking_id, gateway, bill_code, amount, status) VALUES (?, 'toyyibpay', ?, ?, 'pending')");
        $stmt->execute([$bookingIds[0], $billCode, $totalAmount]);

        $paymentUrl = rtrim(TOYYIBPAY_BASE_URL, '/') . '/' . $billCode;

        sendResponse([
            'payment_url' => $paymentUrl
        ]);
    } else {
        file_put_contents(
            dirname(__DIR__, 2) . '/logs/toyyibpay.log',
            json_encode($response, JSON_PRETTY_PRINT) . "\n==========\n",
            FILE_APPEND
        );
        sendResponse([
            'error' => 'Failed to generate payment URL',
            'toyyibpay_response' => $response
        ], 500);
    }
}

// POST /api/toyyibpay/callback
if ($method === 'POST' && count($uriParts) === 2 && $uriParts[1] === 'callback') {
    // ToyyibPay sends data as POST fields, not JSON
    $statusId = $_POST['status_id'] ?? null;
    $billCode = $_POST['billcode'] ?? null;
    $bookingId = $_POST['order_id'] ?? null; // billExternalReferenceNo is passed as order_id in callback
    $transactionId = $_POST['transaction_id'] ?? null;

    if (!$bookingId || !$statusId) {
        error_log('[ToyyibPay] Invalid Callback: ' . json_encode($_POST));
        exit('Invalid Data');
    }

    if ($statusId == 1) {
        // Successful payment
        $db->beginTransaction();
        try {
            $ids = explode(',', $bookingId);
            foreach ($ids as $id) {
                $id = trim($id);
                if (!$id)
                    continue;

                // Update booking status
                $stmt = $db->prepare("UPDATE bookings SET payment_status = 'paid', status = 'confirmed' WHERE id = ?");
                $stmt->execute([$id]);

                // Update transaction log
                $stmt = $db->prepare("UPDATE payment_transactions SET status = 'success', transaction_id = ? WHERE booking_id = ? AND bill_code = ?");
                $stmt->execute([$transactionId, $id, $billCode]);
            }

            $db->commit();
            echo 'OK';
        } catch (Exception $e) {
            $db->rollBack();
            error_log('[ToyyibPay] Callback Processing Error: ' . $e->getMessage());
            http_response_code(500);
            echo 'Error';
        }
    } else {
        // Failed payment
        $ids = explode(',', $bookingId);
        foreach ($ids as $id) {
            $id = trim($id);
            if (!$id)
                continue;
            $stmt = $db->prepare("UPDATE payment_transactions SET status = 'failed', transaction_id = ? WHERE booking_id = ? AND bill_code = ?");
            $stmt->execute([$transactionId, $id, $billCode]);
        }
        echo 'OK';
    }
    exit();
}

sendResponse(['error' => 'ToyyibPay route not found'], 404);
