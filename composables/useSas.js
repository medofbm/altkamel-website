/**
 * useSas.js — SASv4 User Portal API Composable
 *
 * المفتاح: مخزون في .env → NUXT_PUBLIC_SAS_AES_KEY
 * التشفير: AES عبر CryptoJS — كل POST يُشفَّر في { payload: "..." }
 * المصادقة: Bearer Token لكل الـ endpoints ما عدا Login
 */

import CryptoJS from 'crypto-js'

const BASE_URL = '/sas-api'

// ─── دالة التشفير ─────────────────────────────────────────────────────────────
function encryptPayload(data, secretKey) {
  const jsonStr = JSON.stringify(data)
  const encrypted = CryptoJS.AES.encrypt(jsonStr, secretKey).toString()
  return { payload: encrypted }
}

// ─── تحويل MB → GB ────────────────────────────────────────────────────────────
export function mbToGb(mb) {
  if (mb === null || mb === undefined || mb === '') return null
  const val = Number(mb)
  if (isNaN(val)) return null
  return (val / 1024).toFixed(2)
}

// ─── تنسيق عرض GB ────────────────────────────────────────────────────────────
export function formatGb(mb) {
  const gb = mbToGb(mb)
  if (gb === null) return null
  return `${gb} GB`
}

// ─── مساعد الطلبات الموحّد ────────────────────────────────────────────────────
async function sasRequest(endpoint, { method = 'GET', body = null, token = null } = {}) {
  const url = `${BASE_URL}${endpoint}`

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  try {
    const response = await fetch(url, options)
    const text = await response.text()
    console.log(`[SAS] ${method} ${endpoint} → ${response.status}`)
    try {
      const json = JSON.parse(text)
      json._httpStatus = response.status
      return json
    } catch {
      return { _httpStatus: response.status, message: text }
    }
  } catch (err) {
    console.error(`[SAS] خطأ ${endpoint}:`, err)
    throw new Error('تعذّر الاتصال بالخادم.')
  }
}

// ─── ترجمة رموز الخطأ ─────────────────────────────────────────────────────────
function translateError(result, fallback = 'حدث خطأ. حاول مجدداً.') {
  const codes = {
    rsp_invalid_username_or_password: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
    rsp_user_disabled:               'الحساب موقوف. تواصل مع الدعم الفني.',
    rsp_user_not_found:              'المستخدم غير موجود.',
    rsp_invalid_payload:             'خطأ في التشفير.',
    rsp_account_expired:             'انتهت صلاحية الحساب.',
    rsp_unauthenticated:             'انتهت صلاحية الجلسة.',
    rsp_service_change_success:      'تم تغيير الباقة بنجاح.',
    rsp_success:                     'تمت العملية بنجاح.',
    rsp_invalid_pin:                 'رمز البطاقة غير صحيح أو مستخدم مسبقاً.',
    // الرد الفعلي من السيرفر: {"status":-2,"message":"rsp_invalid_card"}
    rsp_invalid_card:                'رمز الكرت غير صحيح أو تم استخدامه مسبقاً.',
    rsp_card_already_used:           'هذا الكرت تم استخدامه مسبقاً.',
    rsp_card_expired:                'انتهت صلاحية هذا الكرت.',
    rsp_insufficient_balance:        'الرصيد غير كافٍ لإتمام العملية.',
    rsp_voucher_already_used:        'هذا الكرت تم استخدامه مسبقاً.',
  }
  const code = result?.error || result?.message || ''
  return codes[code] || result?.message || fallback
}

// ─── الدالة الرئيسية ──────────────────────────────────────────────────────────
export function useSas() {
  const config = useRuntimeConfig()
  const AES_KEY = config.public.sasAesKey || ''

  // ── 1. تسجيل الدخول ────────────────────────────────────────────────
  async function login(username, password) {
    const body = encryptPayload({ username, password, language: 'en' }, AES_KEY)
    try {
      const result = await sasRequest('/auth/login', { method: 'POST', body })
      if (result?.token) return { token: result.token }

      // تحديد رسالة خطأ واضحة للمستخدم
      const code = result?.error || result?.message || ''
      const loginErrors = {
        rsp_invalid_username_or_password: 'اسم المستخدم أو كلمة المرور غير صحيحة. تحقق من بياناتك وحاول مجدداً.',
        rsp_user_disabled:                'حسابك موقوف مؤقتاً. يرجى التواصل مع الدعم الفني.',
        rsp_user_not_found:               'لا يوجد حساب بهذا الاسم. تحقق من صحة اسم المستخدم.',
        rsp_invalid_payload:              'خطأ داخلي. يرجى إعادة المحاولة.',
        rsp_account_expired:              'انتهت صلاحية الحساب. تواصل مع الدعم لتجديد اشتراكك.',
        rsp_unauthenticated:              'حدثت مشكلة في المصادقة. يرجى إعادة المحاولة.',
        rsp_too_many_requests:            'تجاوزت عدد محاولات تسجيل الدخول. انتظر دقيقة ثم حاول مجدداً.',
      }

      // أحدد الرسالة من القاموس أولاً
      if (loginErrors[code]) {
        return { error: loginErrors[code] }
      }

      // إذا كان الرد HTTP 401 أو 403
      if (result?._httpStatus === 401) {
        return { error: 'اسم المستخدم أو كلمة المرور غير صحيحة.' }
      }

      // أي رسالة تبدأ بـ rsp_ يجب ترجمتها بدل عرضها كما هي
      if (typeof code === 'string' && code.startsWith('rsp_')) {
        return { error: 'فشل تسجيل الدخول. تحقق من بياناتك وحاول مجدداً.' }
      }

      return { error: 'فشل تسجيل الدخول. تحقق من بياناتك وحاول مجدداً.' }
    } catch (err) {
      if (err.message?.includes('تعذّر الاتصال')) return { error: 'تعذّر الاتصال بالخادم. تحقق من الإنترنت وحاول مجدداً.' }
      return { error: 'حدث خطأ غير متوقع. يرجى إعادة المحاولة.' }
    }
  }

  // ── 2. بيانات المستخدم ────────────────────────────────────────────────────────
  async function getUserData(token) {
    const result = await sasRequest('/user', { token })
    if (result?.data) return { data: result.data, permissions: result.permissions || [] }
    if (result?.error === 'rsp_unauthenticated' || result?._httpStatus === 401)
      return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'تعذّر جلب بيانات الحساب.') }
  }

  // ── 3. الرصيد والاشتراك (Dashboard) ──────────────────────────────────────────
  async function getBalance(token) {
    const result = await sasRequest('/dashboard', { token })
    if (result?.data) return { data: result.data }
    if (result?.error === 'rsp_unauthenticated' || result?._httpStatus === 401)
      return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'تعذّر جلب بيانات الرصيد.') }
  }

  // ── 4. بيانات الاستهلاك (Traffic) ────────────────────────────────────────────
  // يحاول أولاً endpoint مخصص، ويرجع إلى بيانات loan من Dashboard
  async function getUserTraffic(token) {
    try {
      const result = await sasRequest('/user/traffic', { token })
      if (result?.data) {
        return {
          data: {
            rx_mb: result.data.rx_mb ?? result.data.download ?? null,
            tx_mb: result.data.tx_mb ?? result.data.upload ?? null,
          }
        }
      }
    } catch {
      // endpoint غير موجود — سنستخدم بيانات الـ dashboard
    }
    return { data: null }
  }

  // ── 5. الباقات المتاحة ────────────────────────────────────────────────────────
  async function getPackages(token) {
    const result = await sasRequest('/packages', { token })
    if (Array.isArray(result)) return { packages: result }
    if (result?.data) return { packages: result.data }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'تعذّر جلب الباقات.') }
  }

  // ── 6. الفواتير ───────────────────────────────────────────────────────────────
  async function getInvoices(token, { page = 1, count = 10, sortBy = 'id', direction = 'desc' } = {}) {
    const body = encryptPayload({ page, count, sortBy, direction }, AES_KEY)
    const result = await sasRequest('/index/invoice', { method: 'POST', body, token })
    if (result?.data) return { invoices: result.data, meta: { currentPage: result.current_page, total: result.total, lastPage: result.last_page } }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'تعذّر جلب الفواتير.') }
  }

  // ── 7. الإضافات المتاحة للاشتراك الحالي ──────────────────────────────────────
  async function getExtensions(token, profileId) {
    const result = await sasRequest(`/extensions/${profileId}`, { token })
    if (result?.data) return { extensions: result.data }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'تعذّر جلب الإضافات.') }
  }

  // ── 8. تغيير الباقة ──────────────────────────────────────────────────────────
  async function changeSubscription(token, newServiceId) {
    const body = encryptPayload({ new_service: String(newServiceId), current_password: true }, AES_KEY)
    const result = await sasRequest('/service', { method: 'POST', body, token })
    if (result?._httpStatus === 200) return { success: true, message: 'تم تغيير الباقة بنجاح.' }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'فشل تغيير الباقة.') }
  }

  // ── 9. التجديد التلقائي (Auto-Renew Toggle) ───────────────────────────────────
  // ملاحظة: السيرفر قد يرد بـ 403 + HTML عند عدم الصلاحية.
  // نتحقق من ذلك ونُظهر رسالة عربية نظيفة دون عرض HTML.
  async function toggleAutoRenew(token, enable) {
    const body = encryptPayload({
      key: 'auto_renew',
      value: enable ? '1' : '0',
      current_password: true,
    }, AES_KEY)
    let result
    try {
      result = await sasRequest('/user', { method: 'POST', body, token })
    } catch {
      return { error: 'عذراً، حدث خطأ أثناء تغيير حالة التجديد التلقائي أو لا تملك صلاحية لذلك.' }
    }
    // معالجة رد HTML أو 403
    const rawMsg = result?.message || result?.error || ''
    if (
      result?._httpStatus === 403 ||
      result?._httpStatus === 503 ||
      (typeof rawMsg === 'string' && rawMsg.trim().startsWith('<'))
    ) {
      return { error: 'عذراً، حدث خطأ أثناء تغيير حالة التجديد التلقائي أو لا تملك صلاحية لذلك.' }
    }
    if (result?.status === 200 || result?._httpStatus === 200 || result?.message === 'rsp_success')
      return { success: true, message: enable ? 'تم تفعيل التجديد التلقائي.' : 'تم إيقاف التجديد التلقائي.' }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: 'عذراً، حدث خطأ أثناء تغيير حالة التجديد التلقائي أو لا تملك صلاحية لذلك.' }
  }


  // ── 10. استرداد بطاقة شحن ──────────────────────────────────────────────────────
  //
  // الرد الفعلي من سيرفر SAS (من تحليل الشبكة):
  //   الفشل:  HTTP 200, JSON: {"status": -2, "message": "rsp_invalid_card"}
  //   النجاح: HTTP 200, JSON: {"status": 0|1, "message": "rsp_success"} (متوقع)
  //
  // القاعدة: result.status < 0 → فشل تجاري (كرت خاطئ/مستخدم/منتهي)
  //           result.status >= 0 أو rsp_success → نجاح
  //
  async function redeemCode(token, pin) {
    let result
    try {
      const body = encryptPayload({ pin: String(pin).trim() }, AES_KEY)
      result = await sasRequest('/redeem', { method: 'POST', body, token })
    } catch (networkErr) {
      return { error: 'تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.' }
    }

    console.log('[SAS Redeem] رد الخادم:', JSON.stringify(result))

    // ── انتهاء الجلسة ──
    if (result?._httpStatus === 401 || result?.message === 'rsp_unauthenticated')
      return { error: 'انتهت صلاحية الجلسة.', expired: true }

    // ── الفشل: status سالب (e.g. status: -2) ──
    const statusCode = result?.status
    if (typeof statusCode === 'number' && statusCode < 0) {
      const msgKey = result?.message || ''
      const errorMap = {
        rsp_invalid_card:      'رمز الكرت غير صحيح أو تم استخدامه مسبقاً.',
        rsp_card_already_used: 'هذا الكرت تم استخدامه مسبقاً.',
        rsp_card_expired:      'انتهت صلاحية هذا الكرت.',
        rsp_invalid_pin:       'رمز الكرت غير صحيح.',
        rsp_voucher_already_used: 'هذا الكرت تم استخدامه مسبقاً.',
      }
      return { error: errorMap[msgKey] || `الكرت غير صالح (${msgKey || 'خطأ غير معروف'}).` }
    }

    // ── النجاح: status >= 0 أو rsp_success في الرسالة ──
    const isSuccess =
      result?.message === 'rsp_success' ||
      (typeof statusCode === 'number' && statusCode >= 0) ||
      result?._httpStatus === 200

    if (isSuccess)
      return { success: true, message: 'تم شحن الرصيد بنجاح! 🎉' }

    // ── حالة غير متوقعة ──
    return { error: translateError(result, 'فشل استرداد الكرت. تحقق من صحة الرمز.') }
  }

  // ── 11. تفعيل الاشتراك (خصم من الرصيد) ───────────────────────────────────────
  // ملاحظة: current_password: true ثابتة — بدون إدخال من المستخدم (طلب الإدارة)
  async function activateSubscription(token) {
    const uuid = crypto.randomUUID() // منع التفعيل المزدوج
    const body = encryptPayload({ uuid, current_password: true }, AES_KEY)
    const result = await sasRequest('/user/activate', { method: 'POST', body, token })
    if (result?.message === 'rsp_success' || result?._httpStatus === 200)
      return { success: true, message: 'تم تفعيل الاشتراك بنجاح! 🎉' }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'فشل تفعيل الاشتراك.') }
  }

  // ── 12. تفعيل إضافة للاشتراك ─────────────────────────────────────────────────
  async function activateExtension(token, profileId) {
    const body = encryptPayload({ profile_id: String(profileId), current_password: true }, AES_KEY)
    const result = await sasRequest('/user/extend', { method: 'POST', body, token })
    if (result?.message === 'rsp_success' || result?._httpStatus === 200)
      return { success: true, message: 'تم تفعيل الإضافة بنجاح! 🎉' }
    if (result?._httpStatus === 401) return { error: 'انتهت صلاحية الجلسة.', expired: true }
    return { error: translateError(result, 'فشل تفعيل الإضافة.') }
  }

  // ── 13. تغيير كلمة المرور ────────────────────────────────────────────────────
  async function changePassword(token, newPassword, currentPassword) {
    const body = encryptPayload({ key: 'password', value: newPassword, current_password: currentPassword }, AES_KEY)
    const result = await sasRequest('/user', { method: 'POST', body, token })
    if (result?.status === 200 || result?._httpStatus === 200)
      return { success: true, message: 'تم تغيير كلمة المرور بنجاح.' }
    if (result?._httpStatus === 401) return { error: 'كلمة المرور الحالية غير صحيحة.', expired: false }
    return { error: translateError(result, 'فشل تغيير كلمة المرور.') }
  }

  return {
    login,
    getUserData,
    getBalance,
    getUserTraffic,
    getPackages,
    getInvoices,
    getExtensions,
    changeSubscription,
    toggleAutoRenew,
    redeemCode,
    activateSubscription,
    activateExtension,
    changePassword,
  }
}
