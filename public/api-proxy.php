<?php
/**
 * AlTakamul Net — SAS API PHP Proxy
 * يستقبل الطلبات من الـ Frontend ويوجّهها إلى SAS API مع الـ headers الصحيحة
 * يحل مشكلة CORS على shared cPanel hosting
 */

// ── الإعدادات ──────────────────────────────────────────────────────────────
define('SAS_BASE_URL', 'https://admin.altkamel.ly/user/api/index.php/api');
define('ALLOWED_ORIGIN', '*'); // أو ضع النطاق: 'https://altkamel.ly'

// ── CORS Headers ────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// ── استخراج المسار ──────────────────────────────────────────────────────────
// الطلب: /sas-api/login  →  يُوجَّه إلى: SAS_BASE_URL/login
$requestUri  = $_SERVER['REQUEST_URI'];
$path        = preg_replace('#^/sas-api/?#', '', parse_url($requestUri, PHP_URL_PATH));
$queryString = $_SERVER['QUERY_STRING'] ? '?' . $_SERVER['QUERY_STRING'] : '';
$targetUrl   = SAS_BASE_URL . '/' . ltrim($path, '/') . $queryString;

// ── نسخ الـ Request Headers ─────────────────────────────────────────────────
$forwardHeaders = ['Content-Type: application/json'];

if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
    $forwardHeaders[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
}
if (!empty($_SERVER['HTTP_USER_AGENT'])) {
    $forwardHeaders[] = 'User-Agent: ' . $_SERVER['HTTP_USER_AGENT'];
} else {
    $forwardHeaders[] = 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
}
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $forwardHeaders[] = 'Origin: ' . $_SERVER['HTTP_ORIGIN'];
}

// ── قراءة الـ Request Body ──────────────────────────────────────────────────
$requestBody = file_get_contents('php://input');

// ── cURL ────────────────────────────────────────────────────────────────────
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $targetUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => $forwardHeaders,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_CUSTOMREQUEST  => $_SERVER['REQUEST_METHOD'],
]);

if (!empty($requestBody)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
}

$response   = curl_exec($ch);
$httpCode   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$curlError  = curl_error($ch);
curl_close($ch);

// ── إرسال الاستجابة ─────────────────────────────────────────────────────────
if ($curlError) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['status' => 0, 'message' => 'Proxy error: ' . $curlError]);
    exit;
}

http_response_code($httpCode);
if ($contentType) {
    header('Content-Type: ' . $contentType);
} else {
    header('Content-Type: application/json');
}
echo $response;
