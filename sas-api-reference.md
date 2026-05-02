# SASv4 User Portal API Reference

## Base Information
- **Base URL:** `https://[Your-Server-IP]/user/api/index.php/api`
- **Authentication:** `Bearer Token` (Required for all endpoints except Login)
- **Encryption:** All `POST` requests require the payload to be encrypted using `crypto-js` (AES) with a secret key. The encrypted string must be sent inside a `{"payload": "encrypted_string"}` JSON object.

---

## 1. Login
- **Endpoint:** `http://admin.altkamel.ly/user/api/index.php/api/auth/login`
- **Method:** `POST`


payload
<text encrypted by CryptoJS>

encoded params:
json
{"username":"Example","password":"Example","language":"en"}

 ## Response (Success): 
{
  "status": 200,
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjI0MC4xMjJcL3VzZXJcL2FwaVwvaW5kZXgucGhwXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjAwOTQ1NjA0LCJleHAiOjE2MDA5NDkyMDQsIm5iZiI6MTYwMDk0NTYwNCwianRpIjoiMjlRM0xpS1NDbGpyV3BYZiIsInN1YiI6NiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.DdiI_fUdzbipKHuOy3vOVZUzEkEC1di8KIUxvGKt9OQ"
}

---
2. Get User Details & Permissions

Endpoint: http://admin.altkamel.ly/user/api/index.php/api/user
Method: GET
Headers: Authorization: Bearer <token>
Response (Success):
{
  {
  "status": 200,
  "data": {
    "username": "Example1",
    "firstname": null,
    "lastname": null,
    "name": null,
    "email": "Example1@gmail.com",
    "phone": "07813370000",
    "address": null,
    "company": null,
    "registered_on": {
      "date": "2020-09-24 13:48:34.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
    },
    "id": 6,
    "static_ip": null,
    "balance": 0,
    "auto_renew": 0,
    "profile_id": 1
  },
  "permissions": [
    "prm_ucp_activate",
    "prm_ucp_auto_login",
    "prm_ucp_billing",
    "prm_ucp_browse_packages",
    "prm_ucp_change_info",
    "prm_ucp_change_password",
    "prm_ucp_change_profile",
    "prm_ucp_data_usage",
    "prm_ucp_extend",
    "prm_ucp_login",
    "prm_ucp_sessions",
    "prm_ucp_support"
  ]
}
}

---
3. Get Balance Info

Endpoint: http://admin.altkamel.ly/user/api/index.php/api/dashboard
Method: GET
Headers: Authorization: Bearer <token>

Response:
{
  "status": 200,
  "data": {
    "remaining_days": 0,
    "remaining_traffic": "_",
    "remaining_uptime": "_",
    "balance": "0.00",
    "unpaid_invoices": 1,
    "loan": {
      "rx_mb": null,
      "tx_mb": null,
      "rxtx_mb": null,
      "days": null
    }
  }
}



> "هذا ملف `sas-api-reference.md` يحتوي على توثيق الـ API الخاص بنظام SASv4 الذي أربطه بمشروعي.
> المطلوب: بناء composable جديد في Vue.js باسم `useSas.js`، يحتوي على دوال تسجيل الدخول `login`، وجلب البيانات `getUserData`، وجلب الرصيد `getBalance`. 
> ملاحظة هامة: اتبع تعليمات التشفير (CryptoJS) المذكورة في الملف حرفياً عند كتابة كود الـ POST."





APP_NAME=sas4ucp
APP_ENV=local
APP_KEY=base64:UDNCiJ55sSTxK1ZCgZ8PWmzueofp0uLgsqS9sESB3Kk=
APP_DEBUG=false
APP_URL=http://localhost

LOG_CHANNEL=single

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=sas4
DB_USERNAME=sas
DB_PASSWORD=sas123


BROADCAST_DRIVER=log
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

JWT_SECRET=KV1m8nfbJy90998h3HJGJuhNs6FPVOF7