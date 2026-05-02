/**
 * useAuth.js — إدارة جلسة المستخدم
 *
 * يخزّن JWT token وبيانات المستخدم في localStorage
 * ويوفّر دوال: saveSession, logout, isAuthenticated, getToken, getUser, updateUser
 */

const TOKEN_KEY = 'sas_token'
const USER_KEY  = 'sas_user'

export function useAuth() {

  // ─── حفظ الجلسة بعد تسجيل الدخول ─────────────────────────────────────────
  function saveSession(token, userData) {
    if (import.meta.client) {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(USER_KEY,  JSON.stringify(userData))
    }
  }

  // ─── تحديث بيانات المستخدم (Merge جزئي) ──────────────────────────────────
  function updateUser(partialData) {
    if (import.meta.client) {
      const current = getUser() || {}
      const merged  = { ...current, ...partialData }
      localStorage.setItem(USER_KEY, JSON.stringify(merged))
    }
  }

  // ─── قراءة الـ Token ───────────────────────────────────────────────────────
  function getToken() {
    if (import.meta.client) {
      return localStorage.getItem(TOKEN_KEY) || null
    }
    return null
  }

  // ─── قراءة بيانات المستخدم ────────────────────────────────────────────────
  function getUser() {
    if (import.meta.client) {
      try {
        const raw = localStorage.getItem(USER_KEY)
        return raw ? JSON.parse(raw) : null
      } catch {
        return null
      }
    }
    return null
  }

  // ─── هل المستخدم مسجّل الدخول؟ ───────────────────────────────────────────
  function isAuthenticated() {
    return !!getToken()
  }

  // ─── تسجيل الخروج ─────────────────────────────────────────────────────────
  function clearSession() {
    if (import.meta.client) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }

  return { saveSession, updateUser, getToken, getUser, isAuthenticated, clearSession }
}
