<template>
  <div class="min-h-screen w-full flex font-cairo" dir="rtl">

    <!-- الجانب الأيمن: لوحة تعريفية -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16" style="background: linear-gradient(135deg, #0B0F24 0%, #1A235A 55%, #2B32B2 100%);">
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 rounded-full blur-[80px]"></div>
      </div>
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 32px 32px;"></div>

      <div class="relative z-10 text-center text-white max-w-md">
        <div class="mb-10 flex justify-center">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-20 w-auto drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]" />
        </div>
        <h1 class="text-5xl font-black mb-6 leading-tight bg-gradient-to-l from-indigo-400 via-cyan-300 to-indigo-400 text-transparent bg-clip-text">
          بوابة المشتركين
        </h1>
        <p class="text-slate-400 text-lg leading-relaxed font-medium mb-12">
          إدارة متكاملة لحسابك وباقات الإنترنت في مكان واحد بأمان تام.
        </p>
        <div class="space-y-4 text-right">
          <div class="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <div class="font-bold text-white text-sm">إدارة شاملة للحساب</div>
              <div class="text-slate-500 text-xs mt-0.5">عرض رصيدك وتفاصيل اشتراكك</div>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div>
              <div class="font-bold text-white text-sm">تعبئة رصيد فورية</div>
              <div class="text-slate-500 text-xs mt-0.5">شحن حسابك في ثوانٍ معدودة</div>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div class="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-400 flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
            </div>
            <div>
              <div class="font-bold text-white text-sm">الباقات المتاحة</div>
              <div class="text-slate-500 text-xs mt-0.5">تصفّح وجدّد باقتك بسهولة</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- الجانب الأيسر: نموذج تسجيل الدخول -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 bg-slate-50 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-72 h-72 bg-indigo-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-72 h-72 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-md relative z-10">

        <!-- الشعار للجوال -->
        <div class="flex justify-center mb-8 lg:hidden">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-14 w-auto" />
        </div>

        <!-- العنوان -->
        <div class="mb-10">
          <div class="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-black px-4 py-2 rounded-full mb-6 border border-indigo-200/50 shadow-sm shadow-indigo-100">
            <div class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            بوابة مشتركي التكامل نت
          </div>
          <h2 class="text-4xl font-black text-slate-900 leading-tight mb-3">أهلاً بعودتك 👋</h2>
          <p class="text-slate-500 font-medium leading-relaxed text-base">
            أدخل بيانات حسابك للوصول إلى لوحة التحكم
          </p>
        </div>

        <!-- بطاقة النموذج -->
        <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8">

          <!-- رسالة الخطأ -->
          <Transition name="error-fade">
            <div v-if="errorMsg" class="mb-5 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span class="text-sm font-bold leading-relaxed">{{ errorMsg }}</span>
            </div>
          </Transition>

          <form @submit.prevent="handleLogin" class="space-y-6">

            <!-- حقل اسم المستخدم -->
            <div>
              <label for="username" class="block text-sm font-black text-slate-700 mb-2.5">اسم المستخدم</label>
              <div class="relative group">
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  required
                  autocomplete="username"
                  placeholder="مثال: ATK-mohammedmustafa"
                  class="block w-full pr-12 pl-4 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white hover:bg-white hover:border-slate-200 transition-all duration-200"
                />
              </div>
            </div>

            <!-- حقل كلمة المرور -->
            <div>
              <label for="password" class="block text-sm font-black text-slate-700 mb-2.5">كلمة المرور</label>
              <div class="relative group">
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  placeholder="••••••••••••"
                  class="block w-full pr-12 pl-12 py-4 border-2 border-slate-100 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white hover:bg-white hover:border-slate-200 transition-all duration-200"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                  <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                </button>
              </div>
            </div>

            <!-- تذكرني -->
            <label class="flex items-center gap-2.5 cursor-pointer group w-fit">
              <div class="relative">
                <input type="checkbox" v-model="rememberMe" class="sr-only peer" />
                <div class="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:shadow-sm after:transition-all peer-checked:after:-translate-x-5"></div>
              </div>
              <span class="text-sm font-bold text-slate-600 group-hover:text-slate-800 transition-colors">تذكر بيانات الدخول</span>
            </label>

            <!-- زر الدخول -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full relative py-4 px-6 rounded-2xl font-black text-white text-base overflow-hidden shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              style="background: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)"
            >
              <div v-if="!isLoading" class="flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                الدخول إلى حسابي
              </div>
              <div v-else class="flex items-center justify-center gap-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                جاري التحقق من البيانات...
              </div>
            </button>
          </form>
        </div>

        <div class="mt-8 text-center">
          <p class="text-slate-500 text-sm font-medium">
            تحتاج مساعدة؟
            <a href="https://wa.me/218923339798" target="_blank" class="font-black text-indigo-600 hover:text-indigo-700 transition-colors hover:underline underline-offset-4 mr-1">
              تواصل مع الدعم الفني
            </a>
          </p>
          <NuxtLink v-if="!isNativeApp" href="/" class="inline-flex items-center gap-2 mt-4 text-sm text-slate-400 font-bold hover:text-slate-600 transition-colors group">
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
            العودة للصفحة الرئيسية
          </NuxtLink>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { Capacitor } from '@capacitor/core'

definePageMeta({ layout: false })
useHead({ title: 'تسجيل الدخول | بوابة مشتركي التكامل نت' })

const router = useRouter()
const { login }       = useSas()
const { saveSession, isAuthenticated } = useAuth()

const isNativeApp = ref(false)

// إذا كان مسجّلاً مسبقاً أرسله مباشرة للداشبورد
onMounted(() => {
  isNativeApp.value = Capacitor.isNativePlatform() || /android/i.test(navigator.userAgent)

  if (isAuthenticated()) {
    router.replace('/portal/dashboard')
  }
})

const username     = ref('')
const password     = ref('')
const isLoading    = ref(false)
const showPassword = ref(false)
const rememberMe   = ref(false)
const errorMsg     = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value  = ''

  const result = await login(username.value.trim(), password.value)

  if (result.error) {
    errorMsg.value  = result.error
    isLoading.value = false
    return
  }

  // نجح الدخول — احفظ الـ token وانتقل للداشبورد
  saveSession(result.token, { username: username.value.trim() })
  router.replace('/portal/dashboard')
}
</script>

<style scoped>
.error-fade-enter-active, .error-fade-leave-active { transition: all 0.3s ease; }
.error-fade-enter-from, .error-fade-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
