<?php
/**
 * AlTakamul Net — SAS API PHP Proxy (Secure Edition)
 * ===================================================
 * يستقبل الطلبات من الـ Frontend ويُشفّرها بـ AES قبل إرسالها لـ SAS API
 *
 * 🔒 مفتاح AES يبقى على الخادم فقط — لا يُرسل للمتصفح أبداً
 *
 * التدفق:
 *   Browser → [JSON خام] → PHP Proxy → [JSON مشفّر بـ AES] → SAS API
 *
 * التثبيت:
 *   1. ارفع هذا الملف على cPanel في: public_html/sas-api/index.php
 *   2. أضف ملف sas-config.php خارج public_html مع المفتاح (اختياري)
 *      أو عيّن الثابت SAS_AES_KEY مباشرة هنا
 */

// ══════════════════════════════════════════════════════════════════════════════
// 1. الإعدادات — يمكن نقل المفتاح لملف خارج public_html لمزيد من الأمان
// ══════════════════════════════════════════════════════════════════════════════
define('SAS_BASE_URL',  'https://admin.altkamel.ly/user/api/index.php/api');
define('SAS_AES_KEY',   getenv('SAS_AES_KEY') ?: 'abcdefghijuklmno0123456789012345');
define('ALLOWED_ORIGIN', 'https://altkamel.ly');   // ← قيّد بنطاقك لمزيد من الأمان

// ══════════════════════════════════════════════════════════════════════════════
// 2. CORS Headers
// ══════════════════════════════════════════════════════════════════════════════
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin === ALLOWED_ORIGIN || ALLOWED_ORIGIN === '*') {
    header('Access-Control-Allow-Origin: ' . $origin ?: ALLOWED_ORIGIN);
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. دالة تشفير AES متوافقة مع CryptoJS (OpenSSL EVP_BytesToKey)
//    CryptoJS.AES.encrypt(text, key) يستخدم EVP_BytesToKey داخلياً
//    نحاكيها هنا بـ PHP بالضبط
// ══════════════════════════════════════════════════════════════════════════════
function cryptoJsAesEncrypt(string $jsonData, string $passphrase): string
{
    // أنشئ Salt عشوائي (8 بايت — نفس ما يفعله CryptoJS)
    $salt = random_bytes(8);

    // اشتق الـ key (32 بايت) والـ iv (16 بايت) باستخدام EVP_BytesToKey
    $keyAndIv = evpBytesToKey($passphrase, $salt, 48);
    $key = substr($keyAndIv, 0,  32);
    $iv  = substr($keyAndIv, 32, 16);

    // شفّر باستخدام AES-256-CBC
    $encrypted = openssl_encrypt($jsonData, 'aes-256-cbc', $key, OPENSSL_RAW_DATA, $iv);

    // بنِ تنسيق OpenSSL المتوافق مع CryptoJS: "Salted__" + salt + encrypted
    $salted = 'Salted__' . $salt . $encrypted;

    return base64_encode($salted);
}

/**
 * EVP_BytesToKey — خوارزمية اشتقاق المفاتيح التي يستخدمها CryptoJS
 */
function evpBytesToKey(string $passphrase, string $salt, int $keySize): string
{
    $derivedKey = '';
    $lastHash   = '';

    while (strlen($derivedKey) < $keySize) {
        $lastHash   = md5($lastHash . $passphrase . $salt, true);
        $derivedKey .= $lastHash;
    }

    return substr($derivedKey, 0, $keySize);
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. استخراج المسار وبناء الـ Target URL
// ══════════════════════════════════════════════════════════════════════════════
$requestUri  = $_SERVER['REQUEST_URI'];
$path        = preg_replace('#^/sas-api/?#', '', parse_url($requestUri, PHP_URL_PATH));
$queryString = !empty($_SERVER['QUERY_STRING']) ? '?' . $_SERVER['QUERY_STRING'] : '';
$targetUrl   = SAS_BASE_URL . '/' . ltrim($path, '/') . $queryString;

// ══════════════════════════════════════════════════════════════════════════════
// 5. معالجة الـ Request Body — التشفير للـ POST فقط
// ══════════════════════════════════════════════════════════════════════════════
$method      = $_SERVER['REQUEST_METHOD'];
$requestBody = file_get_contents('php://input');
$bodyToSend  = $requestBody; // افتراضياً: أرسل كما هو (GET / DELETE)

if ($method === 'POST' && !empty($requestBody)) {
    // تحقق إذا كان الـ body JSON خاماً (وليس مشفّراً مسبقاً)
    $decoded = json_decode($requestBody, true);

    if ($decoded !== null && !isset($decoded['payload'])) {
        // ← JSON خام من الـ Frontend — نُشفّره هنا على الخادم
        $encryptedPayload = cryptoJsAesEncrypt($requestBody, SAS_AES_KEY);
        $bodyToSend       = json_encode(['payload' => $encryptedPayload]);

    } elseif (isset($decoded['payload'])) {
        // ← مُشفَّر مسبقاً (للتوافق مع الإصدارات القديمة) — أرسله كما هو
        $bodyToSend = $requestBody;
    }
    // إذا لم يكن JSON صالحاً، أرسله كما هو
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. Forward Headers
// ══════════════════════════════════════════════════════════════════════════════
$forwardHeaders = ['Content-Type: application/json', 'Accept: application/json'];

if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
    $forwardHeaders[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
}

// ══════════════════════════════════════════════════════════════════════════════
// 7. cURL — إرسال الطلب لـ SAS API
// ══════════════════════════════════════════════════════════════════════════════
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $targetUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => $forwardHeaders,
    CURLOPT_SSL_VERIFYPEER => false,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_TIMEOUT        => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_CUSTOMREQUEST  => $method,
]);

if (!empty($bodyToSend) && in_array($method, ['POST', 'PUT', 'PATCH'])) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $bodyToSend);
}

$response    = curl_exec($ch);
$httpCode    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
$curlError   = curl_error($ch);
curl_close($ch);

// ══════════════════════════════════════════════════════════════════════════════
// 8. إرسال الاستجابة للـ Frontend
// ══════════════════════════════════════════════════════════════════════════════
if ($curlError) {
    http_response_code(502);
    header('Content-Type: application/json');
    echo json_encode(['status' => 0, 'message' => 'Proxy connection error']);
    exit;
}

http_response_code($httpCode);
header('Content-Type: ' . ($contentType ?: 'application/json'));
echo $response;
