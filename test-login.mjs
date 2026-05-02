/**
 * test-login.mjs — اختبار مباشر لـ SAS API
 * شغّله: node test-login.mjs <username> <password>
 */

import CryptoJS from 'crypto-js'

// نفس المفتاح المستخدم في .env
const JWT_SECRET = 'KV1m8nfbJy90998h3HJGJuhNs6FPVOF7'
const API_URL    = 'https://admin.altkamel.ly/user/api/index.php/api/auth/login'

const username = process.argv[2] || 'test'
const password = process.argv[3] || 'test'

console.log('🔑 JWT_SECRET:', JWT_SECRET)
console.log('👤 username:', username)
console.log('🔐 password:', password)

// تشفير البيانات بنفس الطريقة التي يستخدمها useSas.js
const rawPayload = JSON.stringify({ username, password, language: 'en' })
console.log('\n📦 rawPayload:', rawPayload)

const encrypted = CryptoJS.AES.encrypt(rawPayload, JWT_SECRET).toString()
console.log('🔒 encrypted (first 50):', encrypted.substring(0, 50) + '...')

const body = JSON.stringify({ payload: encrypted })
console.log('📤 body (first 100):', body.substring(0, 100) + '...')

// إرسال الطلب
console.log('\n🚀 إرسال الطلب إلى:', API_URL)
try {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body,
  })

  const text = await response.text()
  console.log('\n📊 Status:', response.status)
  console.log('📨 Response:', text)

  try {
    const json = JSON.parse(text)
    if (json.token) {
      console.log('\n✅ تسجيل الدخول نجح! Token:', json.token.substring(0, 30) + '...')
    } else {
      console.log('\n❌ فشل تسجيل الدخول:', json)
    }
  } catch {
    console.log('\n⚠️ الرد ليس JSON:', text)
  }
} catch (err) {
  console.error('\n💥 خطأ في الاتصال:', err.message)
}
