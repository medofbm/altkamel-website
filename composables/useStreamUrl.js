// ✅ useStreamUrl — كشف نوع الجهاز وتحديد رابط البث المناسب
// Smart TVs غالباً تستخدم HTTP لأن شهادة SSL قد لا تُقبل على متصفحاتها المدمجة

const SMART_TV_PATTERNS = [
  /tizen/i,         // Samsung Smart TV
  /webos/i,         // LG Smart TV
  /netcast/i,       // LG NetCast (older)
  /viera/i,         // Panasonic Viera
  /hbbtv/i,         // HbbTV (standard for many EU smart TVs)
  /cobalt/i,        // YouTube TV (Chromecast-based)
  /crkey/i,         // Chromecast
  /roku/i,          // Roku
  /appletv/i,       // Apple TV
  /tvos/i,          // Apple tvOS
  /googletv/i,      // Google TV
  /androidtv/i,     // Android TV
  /smart.?tv/i,     // Generic "Smart TV" / "SmartTV"
  /smarttv/i,
  /philips.*tv/i,   // Philips Smart TV
  /sony.*tv/i,      // Sony Bravia
  /nettv/i,         // Philips NetTV
  /freebox/i,       // Freebox (French IPTV box)
  /inettv/i,        // iNetTV
  /tv safari/i,     // Safari on TV
  /\bDL-\w+/,       // Some IPTV receivers
  /huawei.*tv/i,    // Huawei Smart TV
  /aquos/i,         // Sharp AQUOS TV
  /bravia/i,        // Sony Bravia (explicit)
  /opera.*tv/i,     // Opera TV Store (many set-top boxes)
]

/**
 * تحديد ما إذا كان الجهاز الحالي Smart TV
 * @returns {boolean}
 */
export function isSmartTV() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return SMART_TV_PATTERNS.some(pattern => pattern.test(ua))
}

/**
 * الحصول على رابط منصة البث المناسب حسب نوع الجهاز
 * - Smart TV → http (يتجاوز مشاكل SSL في المتصفحات المدمجة)
 * - بقية الأجهزة → https
 * @returns {string}
 */
export function getStreamUrl() {
  return isSmartTV()
    ? 'http://tv.altkamel.ly'
    : 'https://tv.altkamel.ly'
}

/**
 * Composable لاستخدام رابط البث في مكونات Vue
 * يُعيد دالة openStream لاستخدامها مع @click
 */
export function useStreamUrl() {
  /**
   * فتح منصة البث في تاب جديد مع الرابط الصحيح حسب الجهاز
   */
  function openStream() {
    const url = getStreamUrl()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return { openStream, getStreamUrl, isSmartTV }
}
