/**
 * test-keys.mjs — اختبار كل المفاتيح الممكنة
 */

import CryptoJS from 'crypto-js'

const username = 'BN-be8901'
const password = '0924758901'
const API_URL  = 'https://admin.altkamel.ly/user/api/index.php/api/auth/login'

const rawPayload = JSON.stringify({ username, password, language: 'en' })

// كل المفاتيح الممكنة
const keysToTest = [
  { label: 'JWT_SECRET (current)',         key: 'KV1m8nfbJy90998h3HJGJuhNs6FPVOF7' },
  { label: 'APP_KEY without base64: prefix', key: 'UDNCiJ55sSTxK1ZCgZ8PWmzueofp0uLgsqS9sESB3Kk=' },
  { label: 'APP_KEY full string',           key: 'base64:UDNCiJ55sSTxK1ZCgZ8PWmzueofp0uLgsqS9sESB3Kk=' },
  { label: 'APP_KEY decoded from base64',   key: Buffer.from('UDNCiJ55sSTxK1ZCgZ8PWmzueofp0uLgsqS9sESB3Kk=', 'base64').toString('utf8') },
  { label: 'APP_KEY decoded hex',          key: Buffer.from('UDNCiJ55sSTxK1ZCgZ8PWmzueofp0uLgsqS9sESB3Kk=', 'base64').toString('hex') },
]

for (const { label, key } of keysToTest) {
  console.log(`\n🔑 Testing: ${label}`)
  console.log(`   Key: ${key.substring(0, 20)}...`)
  
  const encrypted = CryptoJS.AES.encrypt(rawPayload, key).toString()
  const body = JSON.stringify({ payload: encrypted })

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body,
    })
    const text = await response.text()
    const icon = response.status === 200 || text.includes('token') ? '✅ SUCCESS' : '❌ FAIL'
    console.log(`   ${icon} → Status: ${response.status} | Response: ${text.substring(0, 80)}`)
    
    if (text.includes('token')) {
      console.log('\n🎉 FOUND THE RIGHT KEY:', label, '=', key)
      break
    }
  } catch (err) {
    console.log(`   💥 Error: ${err.message}`)
  }
}
