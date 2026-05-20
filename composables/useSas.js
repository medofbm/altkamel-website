/**
 * useSas.js - SASv4 User Portal API Composable
 */

import CryptoJS from 'crypto-js'
import MSG from './sas-messages.json'

// ✅ Capacitor تعمل فقط في بيئة Client — process.client يمنع تنفيذها على السيرفر
import { Capacitor } from '@capacitor/core'
const BASE_URL = (process.client && Capacitor.isNativePlatform())
  ? 'https://altkamel.ly/sas-api'
  : '/sas-api'

function encryptPayload(data, secretKey) {
  const jsonStr = JSON.stringify(data)
  const encrypted = CryptoJS.AES.encrypt(jsonStr, secretKey).toString()
  return { payload: encrypted }
}

export function mbToGb(mb) {
  if (mb === null || mb === undefined || mb === '') return null
  const val = Number(mb)
  if (isNaN(val)) return null
  return (val / 1024).toFixed(2)
}

export function formatGb(mb) {
  const gb = mbToGb(mb)
  if (gb === null) return null
  return `${gb} GB`
}

async function sasRequest(endpoint, { method = 'GET', body = null, token = null } = {}) {
  const url = `${BASE_URL}${endpoint}`
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)
  try {
    const response = await fetch(url, options)
    const text = await response.text()
    console.log(`[SAS] ${method} ${endpoint} => ${response.status}`)
    try {
      const json = JSON.parse(text)
      json._httpStatus = response.status
      return json
    } catch {
      return { _httpStatus: response.status, message: text }
    }
  } catch (err) {
    console.error(`[SAS] Error ${endpoint}:`, err)
    throw new Error('network_error')
  }
}

function translateError(result, fallbackKey) {
  const code = result?.error || result?.message || ''
  return MSG.errors[code] || result?.message || MSG[fallbackKey] || MSG.generic_error
}

export function useSas() {
  const config = useRuntimeConfig()
  const AES_KEY = config.public.sasAesKey || ''

  async function login(username, password) {
    const body = encryptPayload({ username, password, language: 'en' }, AES_KEY)
    try {
      const result = await sasRequest('/auth/login', { method: 'POST', body })
      if (result?.token) return { token: result.token }

      // نجمع كل رموز الخطأ المحتملة من الرد
      const code = result?.error || result?.message || result?.code || ''

      // أولاً: نبحث في القاموس الكامل
      if (MSG.loginErrors[code]) return { error: MSG.loginErrors[code] }

      // ثانياً: أي رمز يحتوي "login" أو "password" أو "credential"
      if (/login|password|credential|invalid/i.test(code)) {
        return { error: MSG.loginErrors['rsp_invalid_username_or_password'] }
      }

      // ثالثاً: HTTP 401
      if (result?._httpStatus === 401) {
        return { error: MSG.loginErrors['rsp_invalid_username_or_password'] }
      }

      // رابعاً: أي رمز يبدأ بـ rsp_ أو err_
      if (typeof code === 'string' && (code.startsWith('rsp_') || code.startsWith('err_'))) {
        return { error: 'بيانات الدخول غير صحيحة أو الحساب غير مفعّل. تواصل مع الدعم.' }
      }

      // fallback عام
      return { error: 'فشل تسجيل الدخول. تحقق من بياناتك أو تواصل مع الدعم الفني.' }

    } catch (err) {
      if (err.message === 'network_error') return { error: MSG.network_error }
      return { error: MSG.unexpected_error }
    }
  }

  async function getUserData(token) {
    const result = await sasRequest('/user', { token })
    if (result?.data) return { data: result.data, permissions: result.permissions || [] }
    if (result?.error === 'rsp_unauthenticated' || result?._httpStatus === 401)
      return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'fetch_user_error') }
  }

  async function getBalance(token) {
    const result = await sasRequest('/dashboard', { token })
    if (result?.data) return { data: result.data }
    if (result?.error === 'rsp_unauthenticated' || result?._httpStatus === 401)
      return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'fetch_balance_error') }
  }

  async function getUserTraffic(token) {
    try {
      const result = await sasRequest('/user/traffic', { token })
      if (result?.data) {
        return { data: { rx_mb: result.data.rx_mb ?? result.data.download ?? null, tx_mb: result.data.tx_mb ?? result.data.upload ?? null } }
      }
    } catch { /* endpoint not available */ }
    return { data: null }
  }

  async function getPackages(token) {
    const result = await sasRequest('/packages', { token })
    if (Array.isArray(result)) return { packages: result }
    if (result?.data) return { packages: result.data }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'fetch_packages_error') }
  }

  async function getInvoices(token, { page = 1, count = 10, sortBy = 'id', direction = 'desc' } = {}) {
    const body = encryptPayload({ page, count, sortBy, direction }, AES_KEY)
    const result = await sasRequest('/index/invoice', { method: 'POST', body, token })
    if (result?.data) return { invoices: result.data, meta: { currentPage: result.current_page, total: result.total, lastPage: result.last_page } }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'fetch_invoices_error') }
  }

  async function getExtensions(token, profileId) {
    const result = await sasRequest(`/extensions/${profileId}`, { token })
    if (result?.data) return { extensions: result.data }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'fetch_extensions_error') }
  }

  async function changeSubscription(token, newServiceId) {
    const body = encryptPayload({ new_service: String(newServiceId), current_password: true }, AES_KEY)
    const result = await sasRequest('/service', { method: 'POST', body, token })
    if (result?._httpStatus === 200) return { success: true, message: MSG.change_sub_success }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'change_sub_error') }
  }

  async function toggleAutoRenew(token, enable) {
    const body = encryptPayload({ key: 'auto_renew', value: enable ? '1' : '0', current_password: true }, AES_KEY)
    let result
    try {
      result = await sasRequest('/user', { method: 'POST', body, token })
    } catch {
      return { error: MSG.auto_renew_error }
    }
    const rawMsg = result?.message || result?.error || ''
    if (result?._httpStatus === 403 || result?._httpStatus === 503 || (typeof rawMsg === 'string' && rawMsg.trim().startsWith('<')))
      return { error: MSG.auto_renew_error }
    if (result?.status === 200 || result?._httpStatus === 200 || result?.message === 'rsp_success')
      return { success: true, message: enable ? MSG.auto_renew_on : MSG.auto_renew_off }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: MSG.auto_renew_error }
  }

  async function redeemCode(token, pin) {
    let result
    try {
      const body = encryptPayload({ pin: String(pin).trim() }, AES_KEY)
      result = await sasRequest('/redeem', { method: 'POST', body, token })
    } catch {
      return { error: MSG.redeem_network_error }
    }
    console.log('[SAS Redeem] Response:', JSON.stringify(result))
    if (result?._httpStatus === 401 || result?.message === 'rsp_unauthenticated')
      return { error: MSG.session_expired, expired: true }
    const statusCode = result?.status
    if (typeof statusCode === 'number' && statusCode < 0) {
      const msgKey = result?.message || ''
      return { error: MSG.redeemErrors[msgKey] || `${MSG.redeem_invalid_error} (${msgKey})` }
    }
    const isSuccess = result?.message === 'rsp_success' || (typeof statusCode === 'number' && statusCode >= 0) || result?._httpStatus === 200
    if (isSuccess) return { success: true, message: MSG.redeem_success }
    return { error: translateError(result, 'redeem_invalid_error') }
  }

  async function activateSubscription(token) {
    const uuid = crypto.randomUUID()
    const body = encryptPayload({ uuid, current_password: true }, AES_KEY)
    const result = await sasRequest('/user/activate', { method: 'POST', body, token })
    if (result?.message === 'rsp_success' || result?._httpStatus === 200)
      return { success: true, message: MSG.activate_success }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'activate_error') }
  }

  async function activateExtension(token, profileId) {
    const body = encryptPayload({ profile_id: String(profileId), current_password: true }, AES_KEY)
    const result = await sasRequest('/user/extend', { method: 'POST', body, token })
    if (result?.message === 'rsp_success' || result?._httpStatus === 200)
      return { success: true, message: MSG.extension_success }
    if (result?._httpStatus === 401) return { error: MSG.session_expired, expired: true }
    return { error: translateError(result, 'extension_error') }
  }

  async function changePassword(token, newPassword, currentPassword) {
    const body = encryptPayload({ key: 'password', value: newPassword, current_password: currentPassword }, AES_KEY)
    const result = await sasRequest('/user', { method: 'POST', body, token })
    if (result?.status === 200 || result?._httpStatus === 200)
      return { success: true, message: MSG.password_success }
    if (result?._httpStatus === 401) return { error: MSG.password_wrong, expired: false }
    return { error: translateError(result, 'password_error') }
  }

  return {
    login, getUserData, getBalance, getUserTraffic, getPackages,
    getInvoices, getExtensions, changeSubscription, toggleAutoRenew,
    redeemCode, activateSubscription, activateExtension, changePassword,
  }
}
