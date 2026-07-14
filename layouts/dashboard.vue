<template>
  <div class="font-cairo min-h-screen text-slate-800 flex relative" dir="rtl" style="background: #f1f5f9;">

    <!-- ===== الشريط الجانبي (Tablet+) ===== -->
    <aside class="hidden md:flex flex-col w-64 lg:w-72 fixed inset-y-0 right-0 z-40 overflow-y-auto sidebar-bg" style="border-left: 1px solid rgba(255,255,255,0.06);">
      <!-- زخارف -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-full h-48 opacity-30" style="background: radial-gradient(ellipse at 80% 0%, #6366f1 0%, transparent 70%);"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 opacity-20" style="background: radial-gradient(ellipse at 20% 100%, #06b6d4 0%, transparent 70%);"></div>
        <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 28px 28px;"></div>
      </div>

      <!-- الشعار -->
      <div class="relative z-10 flex-shrink-0 px-5 pt-6 pb-4">
        <NuxtLink href="/" class="flex items-center gap-3 group">
          <div class="relative flex-shrink-0">
            <div class="absolute inset-0 rounded-2xl bg-indigo-500/30 blur-md group-hover:blur-lg transition-all duration-500"></div>
            <div class="relative w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <img src="/images/logo/logo.png" alt="التكامل نت" class="h-8 w-8 object-contain group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-white font-black text-sm tracking-tight">التكامل نت</span>
            <span class="text-indigo-400/80 text-[10px] font-bold tracking-wide">بوابة المشتركين</span>
          </div>
        </NuxtLink>
        <div class="mt-4 h-px w-full" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);"></div>
      </div>

      <!-- القائمة -->
      <nav class="flex-1 px-3 pb-3 space-y-0.5 relative z-10 overflow-y-auto">
        <p class="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] px-3 mb-2 mt-1">لوحة التحكم</p>

        <NuxtLink href="/portal/dashboard"
          class="nav-item group flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
          :class="$route.path === '/portal/dashboard' ? 'nav-item-active text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
            :class="$route.path === '/portal/dashboard' ? 'bg-indigo-500 shadow-md shadow-indigo-500/40' : 'bg-white/5 group-hover:bg-white/10'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <span class="flex-1 text-sm">معلومات عامة</span>
          <span v-if="$route.path === '/portal/dashboard'" class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
        </NuxtLink>

        <NuxtLink href="/portal/packages"
          class="nav-item group flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all duration-200"
          :class="$route.path === '/portal/packages' ? 'nav-item-active text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'"
        >
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
            :class="$route.path === '/portal/packages' ? 'bg-violet-500 shadow-md shadow-violet-500/40' : 'bg-white/5 group-hover:bg-white/10'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
          </div>
          <span class="flex-1 text-sm">الباقات المتاحة</span>
          <span v-if="$route.path === '/portal/packages'" class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse"></span>
        </NuxtLink>

        <div class="pt-3">
          <p class="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] px-3 mb-2">التواصل</p>
          <a href="https://wa.me/218923339798" target="_blank"
            class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-bold text-sm transition-all">
            <div class="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 flex items-center justify-center flex-shrink-0 transition-all">
              <svg class="w-4 h-4 group-hover:text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            الدعم الفني
          </a>
        </div>
      </nav>

      <!-- المستخدم + خروج -->
      <div class="p-3 flex-shrink-0 relative z-10 space-y-2">
        <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-md">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-white text-xs font-black truncate">{{ sessionUser?.username || 'المستخدم' }}</div>
            <div class="text-indigo-400 text-[10px] font-bold">مشترك نشط</div>
          </div>
          <div class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse"></div>
        </div>
        <button @click="logout"
          class="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/8 text-red-400 hover:bg-red-500/15 hover:text-red-300 font-bold text-xs transition-all group">
          <svg class="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
          تسجيل الخروج
        </button>
      </div>
    </aside>

    <!-- ===== المحتوى الرئيسي ===== -->
    <div class="flex-1 flex flex-col md:mr-64 lg:mr-72 min-h-screen relative z-10">

      <!-- ===== الهيدر (mobile + tablet) ===== -->
      <header class="h-14 md:h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sticky top-0 z-30 flex-shrink-0 shadow-sm">

        <!-- اليمين: شعار + اسم في الموبايل -->
        <div class="flex items-center gap-2.5 md:gap-3">
          <!-- شعار الموبايل -->
          <div class="flex md:hidden items-center gap-2">
            <!-- الصورة مباشرة بدون خلفية -->
            <img src="/images/logo/logo.png" alt="التكامل نت" class="h-9 w-auto object-contain" />
            <div>
              <div class="text-slate-900 font-black text-sm leading-none">التكامل نت</div>
              <div class="text-indigo-500 text-[10px] font-bold leading-none mt-0.5">{{ pageTitle }}</div>
            </div>
          </div>

          <!-- بريدكرامب التابلت/ديسكتوب -->
          <div class="hidden md:flex items-center gap-2 text-sm">
            <NuxtLink href="/" class="text-slate-400 hover:text-indigo-600 font-bold transition-colors flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              الرئيسية
            </NuxtLink>
            <svg class="w-3 h-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            <span class="text-slate-800 font-black text-sm">{{ pageTitle }}</span>
          </div>
        </div>

        <!-- اليسار: اتصال + مستخدم -->
        <div class="flex items-center gap-2">
          <!-- شارة اتصال -->
          <div class="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1.5 rounded-full">
            <span class="relative flex w-1.5 h-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span class="hidden sm:inline">متصل</span>
          </div>

          <!-- المستخدم -->
          <div class="hidden sm:flex items-center gap-2">
            <div class="text-right hidden lg:block">
              <div class="text-xs font-black text-slate-800">{{ sessionUser?.username || 'المستخدم' }}</div>
            </div>
            <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
          </div>

          <!-- خروج سريع (tablet+) -->
          <button @click="logout" class="hidden md:flex p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl border border-slate-200 transition-all" title="تسجيل الخروج">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </header>

      <!-- مساحة الصفحة — مع padding سفلي للـ Bottom Nav -->
      <main class="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 overflow-x-hidden pb-24 md:pb-6">
        <slot />
      </main>

      <!-- الفوتر (tablet+ فقط) -->
      <footer class="hidden md:block border-t border-slate-200/60 bg-white/70 backdrop-blur-sm px-6 py-3 flex-shrink-0">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <img src="/images/logo/logo.png" alt="التكامل نت" class="h-5 w-auto opacity-40" />
            <span class="text-xs text-slate-400 font-bold">© 2026 · التكامل نت</span>
          </div>
          <div class="flex items-center gap-4">
            <a href="https://wa.me/218923339798" target="_blank" class="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors">واتساب</a>
            <span class="w-px h-3 bg-slate-200"></span>
            <NuxtLink href="/" class="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">الرئيسية</NuxtLink>
            <span class="w-px h-3 bg-slate-200"></span>
            <button @click="logout" class="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">خروج</button>
          </div>
        </div>
      </footer>
    </div>

    <!-- ================================================================= -->
    <!-- ===== Bottom Navigation Bar (موبايل فقط) ===== -->
    <!-- ================================================================= -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 z-50 bottom-nav-bg" dir="rtl">
      <!-- خط علوي شفاف -->
      <div class="h-px w-full" style="background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);"></div>

      <div class="flex items-center justify-around px-2 py-2 pb-safe">

        <!-- معلومات عامة -->
        <NuxtLink href="/portal/dashboard"
          class="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200"
          :class="$route.path === '/portal/dashboard' ? 'bottom-nav-active' : 'text-slate-500'"
        >
          <div class="relative">
            <svg class="w-5 h-5 transition-transform duration-200" :class="$route.path === '/portal/dashboard' ? 'text-indigo-400 scale-110' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span v-if="$route.path === '/portal/dashboard'" class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-400 border-2 border-[#0c1220]"></span>
          </div>
          <span class="text-[10px] font-black leading-none" :class="$route.path === '/portal/dashboard' ? 'text-indigo-300' : ''">حسابي</span>
        </NuxtLink>

        <!-- الباقات -->
        <NuxtLink href="/portal/packages"
          class="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl transition-all duration-200"
          :class="$route.path === '/portal/packages' ? 'bottom-nav-active' : 'text-slate-500'"
        >
          <div class="relative">
            <svg class="w-5 h-5 transition-transform duration-200" :class="$route.path === '/portal/packages' ? 'text-violet-400 scale-110' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
            <span v-if="$route.path === '/portal/packages'" class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-violet-400 border-2 border-[#0c1220]"></span>
          </div>
          <span class="text-[10px] font-black leading-none" :class="$route.path === '/portal/packages' ? 'text-violet-300' : ''">الباقات</span>
        </NuxtLink>

        <!-- دعم فني -->
        <a href="https://wa.me/218923339798" target="_blank"
          class="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl text-slate-500 transition-all duration-200">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span class="text-[10px] font-black leading-none">الدعم</span>
        </a>

        <!-- خروج -->
        <button @click="logout"
          class="flex flex-col items-center gap-1 px-5 py-2 rounded-2xl text-slate-500 hover:text-red-400 transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          <span class="text-[10px] font-black leading-none">خروج</span>
        </button>

      </div>
    </nav>

  </div>
</template>

<script setup>
const router      = useRouter()
const route       = useRoute()
const { getUser, clearSession } = useAuth()

const sessionUser = computed(() => getUser())

const pageTitle = computed(() => {
  if (route.path === '/portal/dashboard') return 'صفحة العميل'
  if (route.path === '/portal/packages')  return 'الباقات المتاحة'
  return 'البوابة'
})

const logout = () => {
  clearSession()
  router.push('/portal/login')
}
</script>

<style scoped>
/* ─── ألوان الـ Sidebar ─── */
.sidebar-bg      { background: #0c1220; }

/* ─── Active item في الـ Sidebar ─── */
.nav-item-active {
  background: linear-gradient(135deg, rgba(99,102,241,0.18), rgba(6,182,212,0.08));
  border: 1px solid rgba(99,102,241,0.25);
}

/* ─── Bottom Navigation Bar ─── */
.bottom-nav-bg {
  background: rgba(12, 18, 32, 0.97);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.06);
}

.bottom-nav-active {
  background: rgba(99,102,241,0.12);
  border-radius: 16px;
}

/* Safe area للأجهزة بشريط الـ home indicator */
.pb-safe { padding-bottom: max(8px, env(safe-area-inset-bottom)); }
</style>
