<template>
  <div class="min-h-screen w-full flex font-cairo" dir="rtl">

    <!-- ===== الجانب الأيمن: لوحة تعريفية (Desktop only) ===== -->
    <div class="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col items-center justify-center p-16"
         style="background: linear-gradient(135deg, #0B1120 0%, #0F2044 50%, #0E3A6E 100%);">

      <!-- خلفية ضوئية -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-16 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px]"></div>
        <div class="absolute bottom-24 right-8 w-80 h-80 bg-blue-600/25 rounded-full blur-[120px]"></div>
        <div class="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-400/15 rounded-full blur-[80px]"></div>
      </div>
      <!-- شبكة نقاط -->
      <div class="absolute inset-0 opacity-[0.04]"
           style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 28px 28px;"></div>

      <div class="relative z-10 text-center text-white max-w-sm">
        <!-- شعار -->
        <div class="mb-10 flex justify-center">
          <div class="relative">
            <div class="absolute inset-0 bg-cyan-400/30 rounded-full blur-2xl scale-150"></div>
            <img src="/images/logo/logo.png" alt="التكامل نت"
                 class="relative h-20 w-auto drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]" />
          </div>
        </div>

        <h1 class="text-4xl font-black mb-4 leading-tight">
          <span class="bg-gradient-to-l from-cyan-300 via-blue-200 to-cyan-300 text-transparent bg-clip-text">
            بوابة الفنيين
          </span>
        </h1>
        <p class="text-slate-400 text-base leading-relaxed mb-10 font-medium">
          إعداد الأنتينات بسرعة واحترافية — توليد ملف الإعداد في ثوانٍ.
        </p>

        <!-- مزايا -->
        <div class="space-y-3 text-right">
          <div v-for="feat in features" :key="feat.title"
               class="flex items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <div :class="`w-10 h-10 rounded-xl ${feat.bg} border ${feat.border} flex items-center justify-center flex-shrink-0`">
              <component :is="'svg'" class="w-5 h-5" :class="feat.color"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feat.icon"/>
              </component>
            </div>
            <div>
              <div class="font-bold text-white text-sm">{{ feat.title }}</div>
              <div class="text-slate-500 text-xs mt-0.5">{{ feat.sub }}</div>
            </div>
          </div>
        </div>

        <!-- شارة الأمان -->
        <div class="mt-8 inline-flex items-center gap-2 text-slate-500 text-xs font-medium bg-white/5 border border-white/10 rounded-full px-4 py-2">
          <svg class="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd"/>
          </svg>
          يعمل بالكامل على جهازك — لا يُرسل بيانات للإنترنت
        </div>
      </div>
    </div>

    <!-- ===== الجانب الأيسر: النموذج ===== -->
    <div class="w-full lg:w-7/12 flex items-center justify-center p-5 sm:p-10 bg-slate-50 relative overflow-hidden min-h-screen">

      <!-- خلفية ضوئية ناعمة -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div class="w-full max-w-md relative z-10">

        <!-- شعار للموبايل -->
        <div class="flex flex-col items-center mb-8 lg:hidden">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-14 w-auto mb-3" />
          <span class="text-xs font-bold text-slate-500 tracking-wider uppercase">Altakamol Net</span>
        </div>

        <!-- عنوان النموذج -->
        <div class="mb-8">
          <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-black px-4 py-2 rounded-full mb-5 border border-blue-200/50 shadow-sm">
            <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            بوابة فنيي التكامل نت
          </div>
          <h2 class="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">
            إعداد الأنتينا 📡
          </h2>
          <p class="text-slate-500 font-medium text-sm sm:text-base leading-relaxed">
            أدخل بيانات الزبون وحمّل ملف الإعداد مباشرة.
          </p>
        </div>

        <!-- بطاقة النموذج -->
        <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_60px_rgba(0,0,0,0.07)] p-7 sm:p-8">

          <!-- رسالة نجاح -->
          <Transition name="fade-slide">
            <div v-if="successMsg"
                 class="mb-5 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-bold leading-relaxed">{{ successMsg }}</span>
            </div>
          </Transition>

          <!-- رسالة خطأ -->
          <Transition name="fade-slide">
            <div v-if="errorMsg"
                 class="mb-5 flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4">
              <svg class="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span class="text-sm font-bold leading-relaxed">{{ errorMsg }}</span>
            </div>
          </Transition>

          <form @submit.prevent="handleGenerate" class="space-y-5" novalidate>

            <!-- حقل اسم السكتور -->
            <div>
              <label for="sectorName" class="block text-sm font-black text-slate-700 mb-2">
                اسم السكتور
                <span class="text-rose-500 mr-0.5">*</span>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                  </svg>
                </div>
                <input
                  id="sectorName"
                  v-model="form.sectorName"
                  type="text"
                  required
                  autocomplete="off"
                  placeholder="مثال: ALTKAMEL-SARAYA1"
                  :class="fieldClass(errors.sectorName)"
                />
              </div>
              <p v-if="errors.sectorName" class="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.sectorName }}
              </p>

            </div>

            <!-- حقل اسم المستخدم -->
            <div>
              <label for="username" class="block text-sm font-black text-slate-700 mb-2">
                اسم المستخدم
                <span class="text-rose-500 mr-0.5">*</span>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  id="username"
                  v-model="form.username"
                  type="text"
                  required
                  autocomplete="off"
                  placeholder="مثال: ATK-mohammedali"
                  :class="fieldClass(errors.username)"
                />
              </div>
              <p v-if="errors.username" class="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.username }}
              </p>

            </div>

            <!-- حقل رقم الهاتف / كلمة المرور -->
            <div>
              <label for="phone" class="block text-sm font-black text-slate-700 mb-2">
                رقم الهاتف
                <span class="text-rose-500 mr-0.5">*</span>
                <span class="text-slate-400 font-medium text-xs mr-1">(يُستخدم كلمة مرور)</span>
              </label>
              <div class="relative group">
                <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  autocomplete="off"
                  placeholder="مثال: 0923456789"
                  :class="fieldClass(errors.phone)"
                />
              </div>
              <p v-if="errors.phone" class="mt-1.5 text-xs text-rose-500 font-bold flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                {{ errors.phone }}
              </p>

            </div>

            <!-- زر التنزيل -->
            <button
              type="submit"
              :disabled="isGenerating"
              class="w-full relative py-4 px-6 rounded-2xl font-black text-white text-base overflow-hidden shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              style="background: linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)"
            >
              <div v-if="!isGenerating" class="flex items-center justify-center gap-2.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                تنزيل ملف الإعداد (.cfg)
              </div>
              <div v-else class="flex items-center justify-center gap-3">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                جاري توليد الملف...
              </div>
            </button>

          </form>
        </div>

        <!-- روابط أسفل النموذج -->
        <div class="mt-7 text-center space-y-3">
          <p class="text-slate-400 text-sm font-medium">
            تحتاج دعماً فنياً؟
            <a href="https://wa.me/218923339798" target="_blank"
               class="font-black text-blue-600 hover:text-blue-700 transition-colors hover:underline underline-offset-4 mr-1">
              تواصل مع المشرف
            </a>
          </p>
          <NuxtLink to="/"
                    class="inline-flex items-center gap-2 text-sm text-slate-400 font-bold hover:text-slate-600 transition-colors group">
            <svg class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            العودة للصفحة الرئيسية
          </NuxtLink>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { generateAndDownloadCfg } from '~/assets/cfg-template.js'

definePageMeta({ layout: false })
useHead({
  title: 'بوابة الفنيين — إعداد الأنتينا | التكامل نت',
  meta: [{ name: 'description', content: 'توليد ملفات إعداد الأنتينات لفنيي شبكة التكامل نت' }]
})

// ── مزايا الشريط الجانبي ──
const features = [
  {
    title: 'توليد فوري بدون إنترنت',
    sub:   'يعمل بالكامل على جهازك',
    icon:  'M13 10V3L4 14h7v7l9-11h-7z',
    bg: 'bg-cyan-500/20', border: 'border-cyan-400/30', color: 'text-cyan-400'
  },
  {
    title: 'ملف جاهز للرفع مباشرة',
    sub:   'صيغة .cfg متوافقة مع أجهزة Ubiquiti',
    icon:  'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    bg: 'bg-blue-500/20', border: 'border-blue-400/30', color: 'text-blue-400'
  },
  {
    title: 'مصمّم للعمل الميداني',
    sub:   'واجهة سهلة على الهاتف والكمبيوتر',
    icon:  'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    bg: 'bg-teal-500/20', border: 'border-teal-400/30', color: 'text-teal-400'
  }
]

// ── حالة النموذج ──
const form = reactive({ sectorName: '', username: '', phone: '' })
const errors      = reactive({ sectorName: '', username: '', phone: '' })
const isGenerating = ref(false)
const successMsg   = ref('')
const errorMsg     = ref('')

// ── تحديد class الحقل ──
const fieldClass = (hasError) =>
  `block w-full pr-12 pl-4 py-4 border-2 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none transition-all duration-200 ${
    hasError
      ? 'border-rose-400 focus:border-rose-500 bg-rose-50/30'
      : 'border-slate-100 focus:border-blue-500 focus:bg-white hover:bg-white hover:border-slate-200'
  }`

// ── التحقق من المدخلات ──
function validate() {
  let valid = true
  errors.sectorName = ''
  errors.username   = ''
  errors.phone      = ''

  if (!form.sectorName.trim()) {
    errors.sectorName = 'اسم السكتور مطلوب'
    valid = false
  }
  if (!form.username.trim()) {
    errors.username = 'اسم المستخدم مطلوب'
    valid = false
  }
  if (!form.phone.trim()) {
    errors.phone = 'رقم الهاتف مطلوب'
    valid = false
  } else if (!/^\d{9,15}$/.test(form.phone.trim())) {
    errors.phone = 'أدخل رقم هاتف صحيح (أرقام فقط)'
    valid = false
  }
  return valid
}

// ── توليد وتنزيل الملف ──
async function handleGenerate() {
  successMsg.value = ''
  errorMsg.value   = ''

  if (!validate()) return

  isGenerating.value = true

  // تأخير بسيط لإظهار حالة التحميل
  await new Promise(r => setTimeout(r, 600))

  try {
    generateAndDownloadCfg(form.sectorName, form.username, form.phone)
    successMsg.value = `✅ تم توليد وتنزيل الملف ATK-${form.username.trim()}.cfg بنجاح!`
    // إعادة تعيين النموذج بعد النجاح
    setTimeout(() => {
      form.sectorName = ''
      form.username   = ''
      form.phone      = ''
      successMsg.value = ''
    }, 5000)
  } catch (e) {
    errorMsg.value = 'حدث خطأ أثناء توليد الملف. حاول مجدداً.'
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
