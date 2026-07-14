<template>
  <div class="space-y-4 sm:space-y-6 pb-4" dir="rtl">

    <!-- ===== Toast Notifications ===== -->
    <Teleport to="body">
      <div class="fixed top-5 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center pointer-events-none w-full px-4 max-w-sm">
        <TransitionGroup name="toast">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="pointer-events-auto w-full flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-xl border text-sm font-bold backdrop-blur-md"
            :class="{
              'bg-emerald-50/95 border-emerald-200 text-emerald-800': toast.type === 'success',
              'bg-rose-50/95 border-rose-200 text-rose-800': toast.type === 'error',
              'bg-amber-50/95 border-amber-200 text-amber-800': toast.type === 'warning',
            }"
          >
            <svg v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <svg v-else class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="flex-1 leading-snug">{{ toast.message }}</span>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>

    <!-- ===== Skeleton Loading ===== -->
    <template v-if="isLoading">
      <div class="space-y-6">
        <div class="flex justify-between items-start">
          <div class="space-y-2">
            <div class="h-3 w-20 bg-slate-200 rounded-full animate-pulse"></div>
            <div class="h-8 w-52 bg-slate-200 rounded-xl animate-pulse"></div>
            <div class="h-3 w-64 bg-slate-100 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="h-32 bg-slate-200 rounded-3xl animate-pulse"></div>
          <div class="h-32 bg-slate-200 rounded-3xl animate-pulse"></div>
        </div>
        <div class="h-48 bg-slate-200 rounded-3xl animate-pulse"></div>
        <div class="h-64 bg-slate-200 rounded-3xl animate-pulse"></div>
      </div>
    </template>

    <!-- ===== خطأ ===== -->
    <template v-else-if="loadError">
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <div class="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        </div>
        <h2 class="text-xl font-black text-slate-800 mb-2">تعذّر تحميل البيانات</h2>
        <p class="text-slate-400 text-sm mb-6 max-w-xs">{{ loadError }}</p>
        <button @click="loadData" class="px-6 py-3 rounded-2xl font-black text-white text-sm shadow-md" style="background: linear-gradient(135deg, #6366f1, #06b6d4);">
          إعادة المحاولة
        </button>
      </div>
    </template>

    <!-- ===== المحتوى الرئيسي ===== -->
    <template v-else-if="userData">

      <!-- رأس الصفحة -->
      <div class="flex items-center justify-between pt-0.5">
        <div>
          <h1 class="text-lg sm:text-2xl lg:text-3xl font-black text-slate-900 leading-tight">مرحباً، {{ displayName }} 👋</h1>
          <p class="text-slate-400 font-medium text-xs sm:text-sm mt-0.5 hidden sm:block">إليك نظرة شاملة على حسابك وخدمتك</p>
        </div>
        <div
          class="flex-shrink-0 flex items-center gap-1.5 text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border"
          :class="isAccountActive
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-rose-50 border-rose-200 text-rose-700'"
        >
          <span class="relative flex w-1.5 h-1.5">
            <span :class="isAccountActive ? 'bg-emerald-400' : 'bg-rose-400'" class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"></span>
            <span :class="isAccountActive ? 'bg-emerald-500' : 'bg-rose-500'" class="relative inline-flex rounded-full h-1.5 w-1.5"></span>
          </span>
          {{ isAccountActive ? 'فعّال' : 'منتهي' }}
        </div>
      </div>

      <!-- ===== Tabs ===== -->
      <div class="flex gap-2 bg-slate-100/80 rounded-2xl p-1.5">
        <button
          @click="activeTab = 'home'"
          class="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-200"
          :class="activeTab === 'home' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          <span class="hidden sm:inline">معلومات عامة</span>
          <span class="sm:hidden">حسابي</span>
        </button>
        <button
          @click="activeTab = 'packages'"
          class="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm transition-all duration-200"
          :class="activeTab === 'packages' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
          <span class="hidden sm:inline">الباقات المتاحة</span>
          <span class="sm:hidden">الباقات</span>
        </button>
      </div>

      <!-- ══════════════════════════════════════════════════════ -->
      <!-- ===== Tab: معلومات عامة ============================= -->
      <!-- ══════════════════════════════════════════════════════ -->
      <template v-if="activeTab === 'home'">

        <!-- بطاقتان: الأيام + الرصيد -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4">

          <!-- الأيام المتبقية -->
          <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-5 border" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); border-color: rgba(99,102,241,0.3);">
            <div class="absolute top-0 left-0 w-32 h-32 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2" style="background: white;"></div>
            <p class="text-indigo-200 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1.5">الأيام المتبقية</p>
            <div class="text-3xl sm:text-4xl font-black text-white leading-none mb-1">{{ balanceData.remaining_days }}</div>
            <p class="text-indigo-200 text-[10px] sm:text-xs font-bold">من 30 يوم</p>
            <div class="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-white/80 rounded-full transition-all duration-700" :style="`width: ${daysPercent}%`"></div>
            </div>
          </div>

          <!-- الرصيد -->
          <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white border border-slate-100 shadow-sm">
            <div class="absolute top-0 left-0 w-24 h-24 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2" style="background: #6366f1;"></div>
            <p class="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1.5">الرصيد</p>
            <div class="flex items-baseline gap-1">
              <span class="text-3xl sm:text-4xl font-black text-slate-900 leading-none">{{ Number(balanceData.balance).toFixed(0) }}</span>
              <span class="text-xs sm:text-sm font-black text-slate-400">د.ل</span>
            </div>
            <p class="text-slate-400 text-[10px] sm:text-xs font-bold mt-1">{{ balanceData.unpaid_invoices > 0 ? `${balanceData.unpaid_invoices} فاتورة غير مدفوعة` : 'لا توجد فواتير معلقة' }}</p>
          </div>
        </div>

        <!-- بطاقة الباقة الحالية -->
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          <div class="h-1 w-full" style="background: linear-gradient(90deg, #6366f1, #06b6d4);"></div>
          <div class="p-4 sm:p-5">
            <div class="flex items-start justify-between gap-3 mb-4">
              <div>
                <p class="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">الباقة الحالية</p>
                <h2 class="text-base sm:text-xl font-black text-slate-900">{{ currentPackageName }}</h2>
                <p v-if="currentPackage?.price" class="text-slate-500 text-xs sm:text-sm font-bold mt-0.5">LD {{ currentPackage.price }} / شهر</p>
              </div>
              <!-- تغيير الباقة dropdown -->
              <div class="relative flex-shrink-0">
                <button
                  @click="pkgDropOpen = !pkgDropOpen"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-all active:scale-95"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                  تغيير
                </button>
                <Transition name="drop-fade">
                  <div v-if="pkgDropOpen"
                    class="absolute left-0 top-full mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl z-20 overflow-hidden py-1.5">
                    <p class="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">اختر باقة جديدة</p>
                    <template v-if="packagesList.length">
                      <button
                        v-for="pkg in packagesList"
                        :key="pkg.id"
                        @click="confirmPkgChange(pkg)"
                        class="w-full flex items-center justify-between px-3 py-2.5 text-right hover:bg-slate-50 transition-colors"
                        :class="String(pkg.id) === String(userData.profile_id) ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'"
                      >
                        <span class="text-xs font-black">{{ pkg.name }}</span>
                        <div class="flex items-center gap-2">
                          <span class="text-[10px] font-bold text-slate-400">LD {{ pkg.price }}</span>
                          <svg v-if="String(pkg.id) === String(userData.profile_id)" class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                        </div>
                      </button>
                    </template>
                    <p v-else class="px-3 py-3 text-xs text-slate-400 text-center">جارٍ التحميل...</p>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- تاريخ الانتهاء -->
            <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p class="text-[9px] font-black text-slate-400 uppercase tracking-wide">تاريخ الانتهاء</p>
                  <p class="text-xs font-black text-slate-700">{{ expirationDate }}</p>
                </div>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black" :class="daysUrgency.badge">
                {{ daysUrgency.text }}
              </div>
            </div>

            <!-- التجديد التلقائي -->
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-black text-slate-700">التجديد التلقائي</p>
                <p class="text-[10px] text-slate-400 font-medium mt-0.5">تجديد تلقائي عند انتهاء الاشتراك</p>
              </div>
              <button
                @click="handleAutoRenewToggle"
                :disabled="autoRenewLoading"
                class="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none disabled:opacity-60"
                :class="userData.auto_renew ? 'bg-indigo-500' : 'bg-slate-200'"
              >
                <span v-if="autoRenewLoading" class="absolute inset-0 flex items-center justify-center">
                  <svg class="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                </span>
                <span v-else class="absolute top-0.5 transition-all duration-300 w-5 h-5 bg-white rounded-full shadow-sm"
                  :class="userData.auto_renew ? 'right-0.5' : 'left-0.5'"></span>
              </button>
            </div>
          </div>
        </div>

        <!-- بطاقة الاستهلاك -->
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm p-4 sm:p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-slate-900">استهلاك الشبكة</h3>
            <span class="text-[10px] font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">الشهر الحالي</span>
          </div>
          <div class="grid grid-cols-3 gap-3">
            <div class="text-center p-3 rounded-xl bg-sky-50 border border-sky-100">
              <svg class="w-5 h-5 text-sky-500 mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <p class="text-[10px] font-black text-sky-600">تنزيل</p>
              <p class="text-sm font-black text-slate-900 mt-0.5">{{ trafficStats.download }}</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-violet-50 border border-violet-100">
              <svg class="w-5 h-5 text-violet-500 mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V7a3 3 0 013-3h10a3 3 0 013 3v1m-4 4l-4-4m0 0L8 12m4-4v12"/></svg>
              <p class="text-[10px] font-black text-violet-600">رفع</p>
              <p class="text-sm font-black text-slate-900 mt-0.5">{{ trafficStats.upload }}</p>
            </div>
            <div class="text-center p-3 rounded-xl bg-teal-50 border border-teal-100">
              <svg class="w-5 h-5 text-teal-500 mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
              <p class="text-[10px] font-black text-teal-600">الإجمالي</p>
              <p class="text-sm font-black text-slate-900 mt-0.5">{{ trafficStats.total }}</p>
            </div>
          </div>
          <p v-if="trafficLoading" class="text-center text-xs text-slate-400 mt-3 font-bold animate-pulse">جارٍ تحميل بيانات الاستهلاك...</p>
        </div>

        <!-- بطاقة بيانات الحساب -->
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          <div class="p-4 sm:p-5 border-b border-slate-100">
            <h3 class="text-sm font-black text-slate-900">بيانات الحساب</h3>
          </div>
          <div class="divide-y divide-slate-50">
            <div class="flex items-center justify-between px-4 sm:px-5 py-3">
              <span class="text-[11px] font-black text-slate-400">اسم المستخدم</span>
              <span class="text-xs font-black text-slate-800 font-mono">{{ userData.username }}</span>
            </div>
            <div class="flex items-center justify-between px-4 sm:px-5 py-3">
              <span class="text-[11px] font-black text-slate-400">البريد الإلكتروني</span>
              <span class="text-xs font-bold text-slate-700 truncate max-w-[160px]">{{ userData.email || '—' }}</span>
            </div>
            <div class="flex items-center justify-between px-4 sm:px-5 py-3">
              <span class="text-[11px] font-black text-slate-400">رقم الهاتف</span>
              <span class="text-xs font-bold text-slate-700">{{ userData.phone || '—' }}</span>
            </div>
            <div class="flex items-center justify-between px-4 sm:px-5 py-3">
              <span class="text-[11px] font-black text-slate-400">تاريخ التسجيل</span>
              <span class="text-xs font-bold text-slate-700">{{ registeredDate }}</span>
            </div>
            <div class="flex items-center justify-between px-4 sm:px-5 py-3">
              <span class="text-[11px] font-black text-slate-400">IP الثابت</span>
              <span class="text-xs font-mono font-bold text-slate-700">{{ userData.static_ip || 'ديناميكي' }}</span>
            </div>
          </div>
        </div>

        <!-- أزرار العمليات -->
        <div class="grid grid-cols-2 gap-3">
          <button @click="openModal('redeem')"
            class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-amber-200 hover:bg-amber-50/50 transition-all active:scale-95">
            <div class="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700">شحن رصيد</span>
          </button>
          <button @click="openModal('activate')"
            class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/50 transition-all active:scale-95">
            <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700">تفعيل الاشتراك</span>
          </button>
          <button @click="openModal('contract')"
            class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-teal-200 hover:bg-teal-50/50 transition-all active:scale-95">
            <div class="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700">عقد الاشتراك</span>
          </button>
          <button @click="loadData"
            class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-slate-300 transition-all active:scale-95">
            <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700">تحديث البيانات</span>
          </button>
        </div>

        <!-- الفواتير -->
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-sm overflow-hidden">
          <div class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 class="text-sm font-black text-slate-900">الفواتير الأخيرة</h3>
            <span v-if="invoicesLoading" class="text-[10px] font-bold text-slate-400 animate-pulse">جارٍ التحميل...</span>
          </div>
          <div v-if="!invoicesLoading && invoices.length === 0" class="p-6 text-center">
            <p class="text-xs font-bold text-slate-400">لا توجد فواتير</p>
          </div>
          <div v-else class="divide-y divide-slate-50">
            <div v-for="inv in invoices.slice(0, 5)" :key="inv.id"
              class="flex items-center justify-between px-4 sm:px-5 py-3">
              <div>
                <p class="text-xs font-black text-slate-800">#{{ inv.id }}</p>
                <p class="text-[10px] font-bold text-slate-400 mt-0.5">{{ formatDate(inv.created_at || inv.date) }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-black text-slate-700">{{ inv.total || inv.amount }} د.ل</span>
                <span
                  class="text-[9px] font-black px-2 py-0.5 rounded-full"
                  :class="(inv.status === 'paid' || inv.paid) ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                >{{ (inv.status === 'paid' || inv.paid) ? 'مدفوعة' : 'معلقة' }}</span>
              </div>
            </div>
            <div v-if="invoices.length > 5" class="px-4 py-3 text-center">
              <p class="text-[10px] font-bold text-slate-400">+{{ invoices.length - 5 }} فاتورة أخرى</p>
            </div>
          </div>
        </div>

      </template>

      <!-- ══════════════════════════════════════════════════════ -->
      <!-- ===== Tab: الباقات المتاحة ========================== -->
      <!-- ══════════════════════════════════════════════════════ -->
      <template v-else-if="activeTab === 'packages'">

        <!-- شارة الباقة الحالية -->
        <div v-if="currentPackage" class="flex items-center gap-3 bg-white border border-indigo-200 rounded-2xl px-4 py-3 shadow-sm">
          <div class="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/></svg>
          </div>
          <div>
            <div class="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">باقتك الحالية</div>
            <div class="font-black text-indigo-700 text-sm">{{ currentPackage.name }}</div>
            <div class="text-[9px] text-slate-400 font-bold mt-0.5">{{ currentPackage.speed_download }} Mbps · LD {{ currentPackage.price }}</div>
          </div>
        </div>

        <!-- بدون باقات من API — نعرض الثابتة -->
        <div v-if="packagesList.length === 0" class="text-center py-6">
          <p class="text-xs font-bold text-slate-400">جارٍ تحميل الباقات...</p>
        </div>

        <!-- قائمة الباقات الديناميكية من API -->
        <div v-else class="space-y-3">
          <div
            v-for="pkg in packagesList"
            :key="pkg.id"
            class="relative bg-white rounded-2xl border overflow-hidden transition-all duration-200"
            :class="String(pkg.id) === String(userData.profile_id)
              ? 'border-indigo-300 shadow-lg shadow-indigo-100/60 ring-2 ring-indigo-500/20'
              : 'border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md active:scale-[0.99]'"
          >
            <div class="h-1 w-full" :style="String(pkg.id) === String(userData.profile_id) ? 'background:linear-gradient(90deg,#6366f1,#06b6d4)' : 'background:linear-gradient(90deg,#e2e8f0,#cbd5e1)'"></div>

            <!-- شارة الحالية -->
            <div v-if="String(pkg.id) === String(userData.profile_id)" class="absolute top-3 left-3">
              <span class="inline-flex items-center gap-1 text-[9px] font-black text-white px-2 py-1 rounded-full shadow" style="background:linear-gradient(135deg,#6366f1,#06b6d4);">
                <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                باقتك الحالية
              </span>
            </div>

            <div class="p-4 sm:p-5 flex items-center justify-between gap-3" :class="String(pkg.id) === String(userData.profile_id) ? 'pt-8' : ''">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-black text-slate-900 leading-tight truncate">{{ pkg.name }}</h3>
                <p v-if="pkg.down_limit" class="text-[10px] text-slate-400 font-medium mt-0.5">{{ pkg.down_limit }} MB حد شهري</p>
              </div>

              <!-- السعر + السرعة -->
              <div class="flex items-center gap-4 flex-shrink-0">
                <div class="text-center">
                  <div class="flex items-baseline gap-0.5 justify-center">
                    <span class="text-xl font-black text-slate-900">{{ pkg.speed_download || pkg.speed || '—' }}</span>
                    <span class="text-[9px] font-black text-slate-400">M</span>
                  </div>
                  <p class="text-[8px] text-slate-400 font-bold">Mbps</p>
                </div>
                <div class="w-px h-8 bg-slate-100"></div>
                <div class="text-center">
                  <div class="flex items-baseline gap-0.5 justify-center">
                    <span class="text-xl font-black" :class="String(pkg.id) === String(userData.profile_id) ? 'text-indigo-600' : 'text-slate-900'">{{ pkg.price }}</span>
                    <span class="text-[9px] font-black text-slate-400">د.ل</span>
                  </div>
                  <p class="text-[8px] text-slate-400 font-bold">شهرياً</p>
                </div>

                <!-- زر التغيير -->
                <button
                  v-if="String(pkg.id) !== String(userData.profile_id)"
                  @click="confirmPkgChange(pkg)"
                  class="px-3 py-2 rounded-xl text-[10px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 transition-all active:scale-95"
                >
                  اختر
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- بانر التواصل -->
        <div class="relative overflow-hidden rounded-2xl p-5" style="background:linear-gradient(135deg,#1e1b4b 0%,#1e3a5f 100%);">
          <div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle,white 1px,transparent 1px);background-size:24px 24px;"></div>
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="text-right">
              <p class="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">تريد مساعدة في اختيار الباقة؟</p>
              <h3 class="text-base font-black text-white">تواصل مع فريق الدعم</h3>
            </div>
            <a href="https://wa.me/218923339798" target="_blank"
              class="flex-shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 text-xs font-black px-5 py-2.5 rounded-xl hover:bg-slate-50 transition-all hover:scale-105 shadow-xl shadow-black/20 active:scale-95">
              <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              واتساب
            </a>
          </div>
        </div>

      </template>

    </template>

    <!-- ===== Modal: تأكيد تغيير الباقة ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'pkg-confirm'" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" @click.self="activeModal = ''; selectedPkg = null">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden" @click.stop>
          <div class="h-1.5 w-full" style="background: linear-gradient(90deg, #6366f1, #8b5cf6);"></div>
          <div class="p-5 sm:p-6">
            <h3 class="text-base font-black text-slate-900 mb-1">تأكيد تغيير الباقة</h3>
            <p class="text-slate-400 text-xs font-medium mb-4">من <span class="font-black text-slate-600">{{ currentPackageName }}</span> إلى <span class="font-black text-indigo-600">{{ selectedPkg?.name }}</span></p>
            <div class="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 mb-5">
              <svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <p class="text-[10px] font-bold text-amber-700">سيتم حذف الباقة الحالية فوراً وتفعيل الباقة الجديدة. هذا الإجراء لا يمكن التراجع عنه.</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button @click="activeModal = ''; selectedPkg = null" class="py-3 rounded-2xl font-black text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95">إلغاء</button>
              <button @click="handlePkgChange" :disabled="pkgChangeLoading"
                class="py-3 rounded-2xl font-black text-sm text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-1.5"
                style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">
                <svg v-if="pkgChangeLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ pkgChangeLoading ? 'جارٍ...' : 'تأكيد التغيير ✓' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== Modal: شحن رصيد ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'redeem'" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" @click.self="closeModal">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden" @click.stop>
          <div class="h-1.5 w-full" style="background: linear-gradient(135deg, #f59e0b, #d97706);"></div>
          <form @submit.prevent="handleRedeem" class="p-5 sm:p-6">
            <h3 class="text-base font-black text-slate-900 mb-1">شحن رصيد</h3>
            <p class="text-slate-400 text-xs font-medium mb-4">أدخل رمز البطاقة المكوّن من 12 رقمًا</p>
            <div class="mb-4">
              <input
                type="text"
                inputmode="numeric"
                :value="redeemPin"
                @keydown="blockNonDigit"
                @input="onPinInput"
                @paste.prevent="onPinPaste"
                placeholder="xxxx xxxx xxxx"
                class="w-full px-4 py-3 rounded-2xl border text-center font-black text-lg tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all"
                :class="redeemPinError ? 'border-rose-300 bg-rose-50' : 'border-slate-200 bg-slate-50'"
              />
              <p v-if="redeemPinError" class="text-rose-500 text-xs font-bold mt-2 text-center">{{ redeemPinError }}</p>
            </div>
            <div v-if="modalMsg" class="mb-4 flex items-start gap-2 border rounded-2xl p-3 text-sm font-bold" :class="modalSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'">
              {{ modalMsg }}
            </div>
            <button type="submit" :disabled="modalLoading"
              class="w-full py-4 text-white font-black rounded-2xl shadow-lg hover:scale-[1.01] transition-all disabled:opacity-70"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <span v-if="!modalLoading">شحن الرصيد</span>
              <span v-else class="flex items-center justify-center gap-2"><svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>جارٍ التنفيذ...</span>
            </button>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ===== Modal: تفعيل الاشتراك ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'activate'" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" @click.self="closeModal">
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden" @click.stop>
          <div class="h-1.5 w-full" style="background: linear-gradient(135deg, #6366f1, #06b6d4);"></div>
          <div class="p-5 sm:p-6">
            <h3 class="text-base font-black text-slate-900 mb-1">تفعيل الاشتراك</h3>
            <p class="text-slate-400 text-xs font-medium mb-4">سيتم خصم قيمة الباقة من رصيدك الحالي.</p>
            <div class="bg-slate-50 rounded-2xl p-4 mb-4 space-y-2 border border-slate-100">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-slate-500">الباقة</span>
                <span class="text-xs font-black text-slate-800">{{ currentPackageName }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-slate-500">التكلفة</span>
                <span class="text-xs font-black text-indigo-600">LD {{ currentPackagePrice }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-slate-500">رصيدك</span>
                <span class="text-xs font-black" :class="Number(balanceData.balance) >= currentPackagePrice ? 'text-emerald-600' : 'text-rose-600'">LD {{ Number(balanceData.balance).toFixed(2) }}</span>
              </div>
            </div>
            <div v-if="modalMsg" class="mb-4 flex items-start gap-2 border rounded-2xl p-3 text-sm font-bold" :class="modalSuccess ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'">
              {{ modalMsg }}
            </div>
            <div class="grid grid-cols-2 gap-3">
              <button @click="closeModal" class="py-3 rounded-2xl font-black text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95">إلغاء</button>
              <button @click="handleActivate" :disabled="modalLoading"
                class="py-3 rounded-2xl font-black text-sm text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-1.5"
                style="background: linear-gradient(135deg, #6366f1, #06b6d4);">
                <svg v-if="modalLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ modalLoading ? 'جارٍ...' : 'تفعيل الاشتراك' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== Modal: عقد الاشتراك ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'contract'" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeModal">
        <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
        <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl" @click.stop>
          <div class="sticky top-0 bg-white z-10 flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 class="text-sm font-black text-slate-900">عقد الاشتراك</h3>
            <div class="flex items-center gap-2">
              <button @click="downloadContract" :disabled="modalLoading"
                class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all disabled:opacity-60">
                <svg v-if="!modalLoading" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                <svg v-else class="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                تحميل PDF
              </button>
              <button @click="closeModal" class="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
          </div>
          <!-- محتوى العقد -->
          <div id="contract-root" class="p-6 sm:p-8 text-right" dir="rtl" style="font-family: 'Cairo', sans-serif; min-width: 600px;">
            <div style="border-bottom: 3px solid #6366f1; padding-bottom: 24px; margin-bottom: 32px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                <img src="/images/logo/logo.png" alt="التكامل نت" style="height: 56px; width: 56px; object-fit: contain;" />
                <div>
                  <h1 style="font-size: 22px; font-weight: 900; color: #1e293b; margin: 0;">شركة التكامل نت</h1>
                  <p style="font-size: 12px; color: #64748b; font-weight: 700; margin: 4px 0 0;">Altkamel Net — للاتصالات وتقنية المعلومات</p>
                </div>
              </div>
              <h2 style="font-size: 18px; font-weight: 900; color: #6366f1; text-align: center; background: #f0f0ff; padding: 10px; border-radius: 10px; margin: 0;">
                عقد تقديم خدمة الإنترنت
              </h2>
            </div>
            <div style="margin-bottom: 24px; background: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
              <h3 style="font-size: 14px; font-weight: 900; color: #1e293b; margin: 0 0 16px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">بيانات المشترك</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div><p style="font-size: 10px; color: #94a3b8; font-weight: 700; margin: 0 0 2px;">اسم المشترك</p><p style="font-size: 13px; font-weight: 900; color: #1e293b; margin: 0;">{{ displayName || userData?.username }}</p></div>
                <div><p style="font-size: 10px; color: #94a3b8; font-weight: 700; margin: 0 0 2px;">اسم المستخدم</p><p style="font-size: 13px; font-weight: 900; color: #1e293b; margin: 0; font-family: monospace;">{{ userData?.username }}</p></div>
                <div><p style="font-size: 10px; color: #94a3b8; font-weight: 700; margin: 0 0 2px;">البريد الإلكتروني</p><p style="font-size: 13px; font-weight: 700; color: #1e293b; margin: 0;">{{ userData?.email || '—' }}</p></div>
                <div><p style="font-size: 10px; color: #94a3b8; font-weight: 700; margin: 0 0 2px;">رقم الهاتف</p><p style="font-size: 13px; font-weight: 700; color: #1e293b; margin: 0;">{{ userData?.phone || '—' }}</p></div>
                <div><p style="font-size: 10px; color: #94a3b8; font-weight: 700; margin: 0 0 2px;">تاريخ الاشتراك</p><p style="font-size: 13px; font-weight: 700; color: #1e293b; margin: 0;">{{ registeredDate }}</p></div>
                <div><p style="font-size: 10px; color: #94a3b8; font-weight: 700; margin: 0 0 2px;">رقم الحساب</p><p style="font-size: 13px; font-weight: 900; color: #6366f1; margin: 0; font-family: monospace;">#{{ userData?.id }}</p></div>
              </div>
            </div>
            <div style="margin-bottom: 24px; background: #f0f0ff; border-radius: 12px; padding: 20px; border: 1px solid #c7d2fe;">
              <h3 style="font-size: 14px; font-weight: 900; color: #4f46e5; margin: 0 0 12px;">تفاصيل الباقة</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div><p style="font-size: 10px; color: #818cf8; font-weight: 700; margin: 0 0 2px;">اسم الباقة</p><p style="font-size: 14px; font-weight: 900; color: #4f46e5; margin: 0;">{{ currentPackageName }}</p></div>
                <div><p style="font-size: 10px; color: #818cf8; font-weight: 700; margin: 0 0 2px;">الرسوم الشهرية</p><p style="font-size: 14px; font-weight: 900; color: #4f46e5; margin: 0;">LD {{ currentPackagePrice }}</p></div>
                <div><p style="font-size: 10px; color: #818cf8; font-weight: 700; margin: 0 0 2px;">الأيام المتبقية</p><p style="font-size: 14px; font-weight: 900; color: #4f46e5; margin: 0;">{{ balanceData.remaining_days }} يوم</p></div>
                <div><p style="font-size: 10px; color: #818cf8; font-weight: 700; margin: 0 0 2px;">تاريخ انتهاء الباقة</p><p style="font-size: 14px; font-weight: 900; color: #4f46e5; margin: 0;">{{ expirationDate }}</p></div>
              </div>
            </div>
            <div style="background: #fff7ed; border-radius: 12px; padding: 16px; border: 1px solid #fed7aa; margin-bottom: 24px;">
              <h3 style="font-size: 13px; font-weight: 900; color: #c2410c; margin: 0 0 8px;">شروط الخدمة</h3>
              <ul style="font-size: 11px; color: #9a3412; font-weight: 600; margin: 0; padding-right: 16px; line-height: 1.8;">
                <li>يلتزم المشترك بسداد الرسوم الشهرية في موعدها المحدد.</li>
                <li>تحتفظ الشركة بالحق في تعليق الخدمة عند التأخر في السداد.</li>
                <li>يُمنع استخدام الخدمة في أي أغراض غير مشروعة.</li>
                <li>تسري الخدمة من تاريخ التفعيل وتُجدَّد شهرياً.</li>
              </ul>
            </div>
            <div style="text-align: center; font-size: 10px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              <p style="margin: 0; font-weight: 700;">شركة التكامل نت — Altkamel Net | واتساب: 218923339798+</p>
              <p style="margin: 4px 0 0; font-weight: 600;">تاريخ إنشاء الوثيقة: {{ new Date().toLocaleDateString('ar-LY') }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { Capacitor } from '@capacitor/core'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'

definePageMeta({ layout: 'dashboard' })
useHead({ title: 'صفحة العميل | التكامل نت' })

const router = useRouter()
const { getUserData, getBalance, getUserTraffic, getPackages, getInvoices, redeemCode, activateSubscription, toggleAutoRenew, changeSubscription } = useSas()
const { getToken, clearSession, updateUser } = useAuth()

// دالة تحويل MB → GB (محلية)
function mbToGb(mb) {
  if (mb === null || mb === undefined || mb === '') return null
  const val = Number(mb)
  if (isNaN(val) || val < 0) return null
  return (val / 1024).toFixed(2)
}

// ─── الحالة الأساسية ───────────────────────────────────────────────────────────
const isLoading    = ref(true)
const loadError    = ref('')
const userData     = ref(null)
const balanceData  = ref({
  balance: '0.00',
  remaining_days: 0,
  unpaid_invoices: 0,
  remaining_traffic: '_',
  remaining_uptime: '_',
  loan: { rx_mb: null, tx_mb: null, rxtx_mb: null },
})
const packagesList     = ref([])
const invoices         = ref([])
const invoicesLoading  = ref(false)
const autoRenewLoading = ref(false)
const pkgDropOpen      = ref(false)
const pkgChangeLoading = ref(false)
const selectedPkg      = ref(null)
const trafficLoading   = ref(false)

// Tab state — الـ tab الافتراضي هو 'home'
const activeTab = ref('home')

// Modals
const activeModal  = ref('')
const modalLoading = ref(false)
const modalMsg     = ref('')
const modalSuccess = ref(false)
const redeemPin    = ref('')
const redeemPinError = ref('')

// Traffic data منفصلة عن الـ loan
const trafficData = ref({ rx_mb: null, tx_mb: null })

// Toast
const toasts = ref([])
let toastIdCounter = 0

function showToast(message, type = 'success', duration = 4000) {
  const id = ++toastIdCounter
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

// ─── Computed: اسم وسعر الباقة الحالية ───────────────────────────────────────
const currentPackage = computed(() => {
  if (!userData.value || !packagesList.value.length) return null
  return packagesList.value.find(p => String(p.id) === String(userData.value.profile_id)) || null
})

const currentPackageName = computed(() => {
  if (currentPackage.value?.name) return currentPackage.value.name
  if (userData.value?.profile_id)  return `باقة #${userData.value.profile_id}`
  return 'غير متوفر'
})

const currentPackagePrice = computed(() => {
  return Number(currentPackage.value?.price) || 0
})

// ─── Computed: حالة الحساب ────────────────────────────────────────────────────
const isAccountActive = computed(() => Number(balanceData.value.remaining_days) > 0)

// ─── Computed: الاسم الكامل ───────────────────────────────────────────────────
const displayName = computed(() => {
  if (!userData.value) return ''
  const { name, firstname, lastname, username } = userData.value
  if (name) return name
  if (firstname || lastname) return `${firstname || ''} ${lastname || ''}`.trim()
  return username
})

// ─── Computed: تاريخ التسجيل ──────────────────────────────────────────────────
const registeredDate = computed(() => {
  if (!userData.value?.registered_on?.date) return 'غير محدد'
  return new Date(userData.value.registered_on.date).toLocaleDateString('ar-LY', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
})

// ─── Computed: تاريخ الانتهاء ─────────────────────────────────────────────────
const expirationDate = computed(() => {
  const days = Number(balanceData.value.remaining_days)
  if (!days && days !== 0) return 'غير محدد'
  const expDate = new Date()
  expDate.setDate(expDate.getDate() + days)
  return expDate.toLocaleDateString('ar-LY', { year: 'numeric', month: 'long', day: 'numeric' })
})

// ─── Computed: نسبة الأيام المتبقية ──────────────────────────────────────────
const daysPercent = computed(() => Math.min(Math.round((Number(balanceData.value.remaining_days) / 30) * 100), 100))

const daysUrgency = computed(() => {
  const d = Number(balanceData.value.remaining_days)
  if (d <= 3)  return { badge: 'bg-rose-100 text-rose-600',   bar: 'bg-rose-400',   text: 'حرج' }
  if (d <= 7)  return { badge: 'bg-amber-100 text-amber-600', bar: 'bg-amber-400',  text: 'قريب' }
  return           { badge: 'bg-teal-100 text-teal-600',   bar: 'bg-gradient-to-l from-teal-400 to-teal-500', text: 'جيد' }
})

// ─── Computed: بيانات الاستهلاك بالـ GB ──────────────────────────────────────
const trafficStats = computed(() => {
  const loan = balanceData.value.loan || {}
  // نفضّل بيانات Traffic API على بيانات loan
  const rxMb  = trafficData.value.rx_mb  ?? loan.rx_mb  ?? null
  const txMb  = trafficData.value.tx_mb  ?? loan.tx_mb  ?? null
  const totMb = (rxMb !== null && txMb !== null) ? rxMb + txMb : (loan.rxtx_mb ?? null)

  const fmt = (mb) => {
    const gb = mbToGb(mb)
    return gb !== null ? `${gb} GB` : '0.00 GB'
  }

  return {
    download: fmt(rxMb),
    upload:   fmt(txMb),
    total:    fmt(totMb),
  }
})

// ─── جلب البيانات ─────────────────────────────────────────────────────────────
async function loadData() {
  isLoading.value = true
  loadError.value = ''
  const token = getToken()
  if (!token) { router.replace('/portal/login'); return }

  const [userRes, balRes, pkgRes] = await Promise.all([
    getUserData(token),
    getBalance(token),
    getPackages(token),
  ])

  if (userRes?.expired || balRes?.expired) {
    clearSession()
    router.replace('/portal/login')
    return
  }

  if (userRes?.error) {
    loadError.value = userRes.error
    isLoading.value = false
    return
  }

  userData.value    = userRes.data
  balanceData.value = { ...balanceData.value, ...(balRes.data || {}) }

  if (pkgRes?.packages) packagesList.value = pkgRes.packages

  isLoading.value = false

  // جلب الفواتير والترافيك بعد رسم الصفحة
  loadInvoices()
  loadTraffic()
}

async function loadInvoices() {
  invoicesLoading.value = true
  const token = getToken()
  if (!token) return
  const res = await getInvoices(token)
  if (res?.invoices) invoices.value = res.invoices
  invoicesLoading.value = false
}

async function loadTraffic() {
  trafficLoading.value = true
  const token = getToken()
  if (!token) return
  try {
    const now = new Date()
    const res = await getUserTraffic(token, now.getMonth() + 1, now.getFullYear())
    if (res?.data) {
      trafficData.value = {
        rx_mb: res.data.rx_mb,
        tx_mb: res.data.tx_mb,
      }
    }
  } catch {
    // Traffic not available — keep zeros
  }
  trafficLoading.value = false
}

// ─── modal helpers ────────────────────────────────────────────────────────────
function openModal(name) {
  activeModal.value    = name
  modalMsg.value       = ''
  modalSuccess.value   = false
  modalLoading.value   = false
  redeemPin.value      = ''
  redeemPinError.value = ''
  pkgDropOpen.value    = false
}
function closeModal() { activeModal.value = '' }

// ─── فتح modal تأكيد تغيير الباقة ──────────────────────────────────────────────
function confirmPkgChange(pkg) {
  if (String(pkg.id) === String(userData.value?.profile_id)) {
    pkgDropOpen.value = false
    showToast('أنت تستخدم هذه الباقة حالياً.', 'warning')
    return
  }
  selectedPkg.value = pkg
  pkgDropOpen.value = false
  activeModal.value = 'pkg-confirm'
}

// ─── تنفيذ تغيير الباقة عبر API ──────────────────────────────────────────────
async function handlePkgChange() {
  if (!selectedPkg.value) return
  pkgChangeLoading.value = true
  const token = getToken()
  const res = await changeSubscription(token, selectedPkg.value.id)
  pkgChangeLoading.value = false

  if (res?.success) {
    const newPkgId = String(selectedPkg.value.id)
    const newPkgName = selectedPkg.value.name
    userData.value = { ...userData.value, profile_id: newPkgId }
    activeModal.value = ''
    selectedPkg.value = null
    showToast(`تم التغيير إلى ${newPkgName} بنجاح ✓`, 'success', 5000)
    setTimeout(() => loadData(), 1500)
  } else if (res?.expired) {
    clearSession()
    router.replace('/portal/login')
  } else {
    showToast(res?.error || 'فشل تغيير الباقة. حاول مجدداً.', 'error', 5000)
    activeModal.value = ''
  }
}

// ─── التجديد التلقائي ─────────────────────────────────────────────────────────
async function handleAutoRenewToggle() {
  if (!userData.value) return
  const enabling = !userData.value.auto_renew

  if (enabling && currentPackagePrice.value > 0) {
    const balance = Number(balanceData.value.balance)
    if (balance < currentPackagePrice.value) {
      showToast(
        `الرصيد غير كافٍ للتجديد التلقائي. رصيدك: LD ${balance}، تكلفة الباقة: LD ${currentPackagePrice.value}. يرجى تعبئة الرصيد أولاً.`,
        'warning',
        6000
      )
      return
    }
  }

  autoRenewLoading.value = true
  const previousValue = userData.value.auto_renew
  const token = getToken()
  userData.value = { ...userData.value, auto_renew: enabling ? 1 : 0 }

  const res = await toggleAutoRenew(token, enabling)
  autoRenewLoading.value = false

  if (res.success) {
    updateUser({ auto_renew: enabling ? 1 : 0 })
    showToast(res.message, 'success')
  } else if (res.expired) {
    userData.value = { ...userData.value, auto_renew: previousValue }
    clearSession()
    router.replace('/portal/login')
  } else {
    userData.value = { ...userData.value, auto_renew: previousValue }
    showToast(res.error || 'عذراً، حدث خطأ أثناء تغيير حالة التجديد التلقائي أو لا تملك صلاحية لذلك.', 'error')
  }
}

// ─── شحن رصيد ────────────────────────────────────────────────────────────────
function blockNonDigit(e) {
  if (!/[0-9]/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter'].includes(e.key)) {
    e.preventDefault()
  }
}
function onPinInput(e) {
  redeemPin.value = e.target.value.replace(/\D/g, '').slice(0, 12)
  e.target.value  = redeemPin.value
  redeemPinError.value = ''
}
function onPinPaste(e) {
  const text   = (e.clipboardData || window.clipboardData).getData('text')
  const digits = text.replace(/\D/g, '').slice(0, 12)
  redeemPin.value = digits
}

function validatePin(pin) {
  const clean = (pin || '').replace(/\D/g, '')
  if (!clean)            return 'يرجى إدخال رمز البطاقة.'
  if (clean.length < 12) return `الرمز يجب أن يكون 12 رقماً بالضبط (أدخلت ${clean.length}).`
  if (clean.length > 12) return 'الرمز لا يتجاوز 12 رقماً.'
  return ''
}

async function handleRedeem() {
  redeemPinError.value = ''
  modalMsg.value       = ''

  const clean = (redeemPin.value || '').replace(/\D/g, '')
  const validationError = validatePin(clean)
  if (validationError) {
    redeemPinError.value = validationError
    return
  }

  modalLoading.value = true
  const token = getToken()
  const res = await redeemCode(token, clean)
  modalLoading.value = false

  modalSuccess.value = !!res.success
  modalMsg.value     = res.success ? res.message : (res.error || 'فشل استرداد البطاقة.')

  if (res.success) {
    redeemPin.value = ''
    showToast(res.message, 'success', 5000)
    const balRes = await getBalance(token)
    if (balRes?.data) balanceData.value = { ...balanceData.value, ...balRes.data }
  } else if (res.expired) {
    clearSession()
    router.replace('/portal/login')
  } else {
    showToast(res.error || 'فشل استرداد البطاقة.', 'error', 5000)
  }
}

// ─── تفعيل الاشتراك ───────────────────────────────────────────────────────────
async function handleActivate() {
  if (currentPackagePrice.value > 0 && Number(balanceData.value.balance) < currentPackagePrice.value) {
    modalMsg.value    = 'الرصيد غير كافٍ. يرجى تعبئة الرصيد أولاً.'
    modalSuccess.value = false
    return
  }

  modalLoading.value = true
  modalMsg.value     = ''
  const token = getToken()
  const res = await activateSubscription(token)
  modalSuccess.value = !!res.success
  modalMsg.value     = res.success ? res.message : res.error
  modalLoading.value = false

  if (res.success) {
    showToast(res.message, 'success')
    await loadData()
    closeModal()
  } else if (res.expired) {
    clearSession()
    router.replace('/portal/login')
  }
}

// ─── تحميل العقد PDF ─────────────────────────────────────────────────────────
async function downloadContract() {
  if (modalLoading.value) return
  modalLoading.value = true

  try {
    const html2pdf = (await import('html2pdf.js')).default
    const element = document.getElementById('contract-root')
    if (!element) throw new Error('عنصر العقد غير موجود')

    const filename = `Contract_${userData.value?.id || userData.value?.username || 'Doc'}.pdf`

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.90 },
      html2canvas: {
        scale: 1.5,
        useCORS: true,
        logging: false,
        letterRendering: true,
        scrollY: 0,
        windowWidth: 794,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }

    const isAndroid = Capacitor.isNativePlatform() || /android/i.test(navigator.userAgent)

    if (isAndroid) {
      showToast('جاري تجهيز العقد...', 'warning', 10000)
      let pdfBlob
      try {
        pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob')
      } catch (genErr) {
        throw new Error('تعذّر توليد ملف PDF. يرجى المحاولة لاحقاً.')
      }
      if (!pdfBlob || pdfBlob.size === 0) throw new Error('ملف PDF فارغ. يرجى المحاولة مجدداً.')
      const base64DataOnly = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => { if (reader.result) resolve(reader.result.split(',')[1]); else reject(new Error('فشل قراءة الملف.')) }
        reader.onerror = () => reject(new Error('خطأ أثناء قراءة الملف.'))
        reader.readAsDataURL(pdfBlob)
      })
      let savedFile
      try {
        savedFile = await Filesystem.writeFile({ path: filename, data: base64DataOnly, directory: Directory.Cache })
      } catch (fsErr) {
        throw new Error('تعذّر حفظ الملف على الجهاز. تحقق من أذونات التخزين.')
      }
      try {
        await Share.share({ title: 'عقد الاشتراك — التكامل نت', url: savedFile.uri, dialogTitle: 'حفظ أو فتح عقد الاشتراك' })
        showToast('تم تجهيز العقد! اختر تطبيقاً لحفظه.', 'success', 4000)
      } catch (shareErr) {
        showToast('تم حفظ الملف في ذاكرة الجهاز.', 'success', 3000)
      }
    } else {
      await html2pdf().set(opt).from(element).save()
      showToast('تم تحميل العقد بنجاح! ✓', 'success', 4000)
    }
  } catch (error) {
    showToast(error?.message || 'حدث خطأ أثناء معالجة العقد. يرجى المحاولة لاحقاً.', 'error', 6000)
  } finally {
    modalLoading.value = false
  }
}

// ─── تنسيق التاريخ ───────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ar-LY', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(loadData)
</script>

<!-- ─── مكوّنات محلية مدمجة ─── -->
<script>
export default {}
</script>

<style scoped>
/* Modal transitions */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.25s ease, transform 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to       { opacity: 0; transform: translateY(20px); }

/* Feedback transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* Toast transitions */
.toast-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from   { opacity: 0; transform: translateY(-16px) scale(0.95); }
.toast-leave-to     { opacity: 0; transform: translateY(-8px) scale(0.97); }

/* Package dropdown transition */
.drop-fade-enter-active { transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.drop-fade-leave-active { transition: all 0.15s ease; }
.drop-fade-enter-from, .drop-fade-leave-to { opacity: 0; transform: translateY(-8px) scaleY(0.95); transform-origin: top; }
</style>
