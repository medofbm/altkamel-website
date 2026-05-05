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

      <!-- بطاقتا الرصيد والأيام المتبقية — صف على الموبايل -->
      <div class="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">

        <!-- بطاقة الرصيد — الهوية الرسمية للتكامل نت -->
        <div
          class="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden col-span-1 cursor-default"
          style="background: linear-gradient(135deg, #2B32B2 0%, #1488CC 100%);"
        >
          <!-- خلفية زخرفية -->
          <div class="absolute inset-0 pointer-events-none overflow-hidden">
            <div class="absolute -top-8 -right-8 w-36 h-36 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div class="absolute inset-0 opacity-[0.07]" style="background-image: radial-gradient(circle, white 1.5px, transparent 1.5px); background-size: 20px 20px;"></div>
          </div>
          <div class="relative z-10">
            <!-- الهيدر -->
            <div class="flex items-center justify-between mb-2 sm:mb-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
              </div>
              <span class="text-white/60 font-bold text-[9px] sm:text-xs bg-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">رصيد</span>
            </div>
            <!-- الرصيد -->
            <div class="text-2xl sm:text-4xl font-black text-white mb-0.5 sm:mb-1 tracking-tight leading-none">{{ balanceData.balance }}</div>
            <div class="text-white/50 text-[9px] sm:text-xs font-bold mb-3 sm:mb-4">د.ل · الآن</div>
            <!-- زر إضافة الرصيد — CTA -->
            <button
              @click="openModal('redeem')"
              class="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 text-white font-black text-[10px] sm:text-xs px-4 py-3 rounded-xl transition-all active:scale-95 backdrop-blur-sm"
            >
              <span class="text-base leading-none">+</span>
              إضافة رصيد
            </button>
            <!-- تحذير فواتير -->
            <div v-if="Number(balanceData.unpaid_invoices) > 0" class="mt-2.5 flex items-center gap-1.5 bg-red-500/20 border border-red-400/30 rounded-lg px-2 py-1.5">
              <svg class="w-3 h-3 text-red-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span class="text-red-200 text-[9px] sm:text-xs font-black">{{ balanceData.unpaid_invoices }} فاتورة غير مدفوعة</span>
            </div>
          </div>
        </div>

        <!-- بطاقة الأيام المتبقية -->
        <div class="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-md overflow-hidden">
          <div class="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-2 sm:mb-3">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center" style="background: linear-gradient(135deg,#168A7D,#10B982);">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <span :class="daysUrgency.badge" class="text-[9px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">{{ daysUrgency.text }}</span>
            </div>
            <div class="text-2xl sm:text-4xl font-black text-slate-900 mb-0.5 tracking-tight leading-none">
              {{ balanceData.remaining_days }} <span class="text-sm sm:text-lg font-bold text-slate-300">يوم</span>
            </div>
            <div class="text-slate-400 font-bold text-[9px] sm:text-xs mb-2 sm:mb-3">متبقية للانتهاء</div>
            <div class="h-1.5 sm:h-2 bg-slate-100 rounded-full overflow-hidden">
              <div :style="`width:${daysPercent}%`" :class="daysUrgency.bar" class="h-full rounded-full transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- إحصائيات وقت الاتصال والحركة المتبقية -->
      <div v-if="balanceData.remaining_traffic !== '_' || balanceData.remaining_uptime !== '_'" class="grid grid-cols-2 gap-3">
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-500 flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
          <div>
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">التحميل المتبقي</div>
            <div class="text-sm font-black text-slate-800">{{ balanceData.remaining_traffic !== '_' ? balanceData.remaining_traffic : 'غير محدود' }}</div>
          </div>
        </div>
        <div class="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 flex-shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">وقت الاتصال</div>
            <div class="text-sm font-black text-slate-800">{{ balanceData.remaining_uptime !== '_' ? balanceData.remaining_uptime : 'غير محدود' }}</div>
          </div>
        </div>
      </div>

      <!-- الإجراءات السريعة -->
      <div>
        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">الإجراءات السريعة</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button @click="openModal('redeem')" id="btn-redeem" class="group flex flex-col items-center gap-2 p-4 bg-white hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white" style="background:linear-gradient(135deg,#2B32B2,#1488CC);">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700 text-center leading-tight">تعبئة رصيد</span>
          </button>
          <button @click="openModal('activate')" id="btn-activate" class="group flex flex-col items-center gap-2 p-4 bg-white hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.97]">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-white" style="background:linear-gradient(135deg,#168A7D,#10B982);">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700 text-center leading-tight">تفعيل الاشتراك</span>
          </button>
          <a href="https://wa.me/218923339798" target="_blank" class="group flex flex-col items-center gap-2 p-4 bg-white hover:bg-green-50 border border-slate-100 hover:border-green-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
            <div class="w-10 h-10 rounded-xl bg-green-100 group-hover:bg-green-200 flex items-center justify-center text-green-600 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <span class="text-xs font-black text-slate-700 text-center leading-tight">الدعم الفني</span>
          </a>
        </div>
      </div>

      <!-- بيانات الحساب والاشتراك -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <!-- معلومات الاشتراك -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div class="p-4 sm:p-5 border-b border-slate-50 flex items-center justify-start gap-3 sm:gap-4" dir="rtl">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-indigo-900 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div class="text-right flex-1">
              <h2 class="font-black text-slate-900 text-sm sm:text-base">معلومات الاشتراك</h2>
              <p class="text-[10px] sm:text-[11px] text-slate-400 font-bold">تفاصيل وحالة الخدمة</p>
            </div>
          </div>
          <div class="p-4 sm:p-5 grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-5 flex-1 content-start">

            <!-- الخدمة الحالية -->
            <div class="col-span-2">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">الخدمة الحالية</div>
              <div class="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-right">
                {{ currentPackageName }}
              </div>
            </div>

            <!-- حالة الاشتراك -->
            <div class="col-span-1">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">الحالة</div>
              <div
                class="text-[11px] sm:text-xs font-black rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-right"
                :class="isAccountActive ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' : 'text-rose-700 bg-rose-50 border border-rose-100'"
              >
                {{ isAccountActive ? 'فعّال ✓' : 'منتهي' }}
              </div>
            </div>

            <!-- سعر الخدمة -->
            <div class="col-span-1">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">سعر الخدمة</div>
              <div class="text-[11px] sm:text-xs font-black text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-right">{{ currentPackagePrice > 0 ? `LD ${currentPackagePrice}` : 'غير محدد' }}</div>
            </div>

            <!-- تاريخ الانتهاء -->
            <div class="col-span-2 border-t border-slate-50 pt-3">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-1 text-right">تاريخ الانتهاء</div>
              <div class="font-bold text-slate-600 text-xs sm:text-sm text-right">{{ expirationDate }}</div>
            </div>

            <!-- التجديد التلقائي -->
            <div class="col-span-2">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-1.5 text-right">التجديد التلقائي</div>
              <div class="flex items-center justify-between bg-slate-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-100">
                <span class="text-[11px] sm:text-xs font-bold text-slate-600">
                  {{ userData.auto_renew ? 'مفعّل — تلقائي' : 'معطّل — يدوي' }}
                </span>
                <button
                  id="btn-auto-renew"
                  @click="handleAutoRenewToggle"
                  :disabled="autoRenewLoading"
                  class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out disabled:opacity-60"
                  :class="userData.auto_renew ? 'bg-indigo-600' : 'bg-slate-200'"
                  role="switch"
                >
                  <span class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200"
                    :class="userData.auto_renew ? '-translate-x-5' : 'translate-x-0'"
                  ></span>
                </button>
              </div>
            </div>

            <!-- IP الثابت -->
            <div class="col-span-2">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-1 text-right">IP الثابت</div>
              <div class="font-bold text-slate-700 text-xs sm:text-sm font-mono text-right" dir="ltr">{{ userData.static_ip || 'n/a' }}</div>
            </div>

            <!-- ─── زر تغيير الباقة ─── -->
            <div class="col-span-2 border-t border-slate-50 pt-3">
              <div class="text-[10px] sm:text-[11px] font-black text-slate-400 mb-2 text-right">تغيير الباقة</div>

              <!-- الحاوي relative لضمان وضع القائمة كـ absolute بدون تحريك الصفحة -->
              <div class="relative">
                <!-- الزر الرئيسي -->
                <button
                  @click="pkgDropOpen = !pkgDropOpen"
                  class="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-l from-violet-50 to-indigo-50 border border-indigo-200 hover:border-indigo-400 rounded-xl transition-all group"
                >
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                    </div>
                    <span class="text-[11px] sm:text-xs font-black text-indigo-700">اختر باقة جديدة</span>
                  </div>
                  <svg class="w-4 h-4 text-indigo-400 transition-transform duration-200" :class="pkgDropOpen ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>

              <!-- ─── القائمة المنسدلة — تطفو إلى الأعلى ─── -->
              <Transition name="drop-fade">
                <div
                  v-if="pkgDropOpen"
                  class="absolute right-0 left-0 bottom-full mb-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50"
                  style="box-shadow: 0 -20px 60px -10px rgba(99,102,241,.18), 0 -8px 24px rgba(0,0,0,.1);"
                >
                  <!-- عنوان -->
                  <div class="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                    <svg class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                    <span class="text-[10px] font-black text-slate-500 uppercase tracking-wider">الباقات المتاحة</span>
                    <div class="flex-1"></div>
                    <button @click="pkgDropOpen = false" class="w-5 h-5 rounded-md bg-slate-200 hover:bg-red-100 flex items-center justify-center text-slate-500 hover:text-red-600 transition-colors">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                  </div>
                  <div class="max-h-56 overflow-y-auto divide-y divide-slate-50">
                    <button
                      v-for="pkg in packagesList"
                      :key="pkg.id"
                      @click="confirmPkgChange(pkg)"
                      class="w-full flex items-center justify-between px-4 py-3 hover:bg-indigo-50 transition-colors group text-right"
                      :class="String(pkg.id) === String(userData.profile_id) ? 'bg-indigo-50/70' : ''"
                    >
                      <div class="flex items-center gap-2.5 flex-1 min-w-0">
                        <div
                          class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black leading-none"
                          :class="String(pkg.id) === String(userData.profile_id) ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100'"
                        >
                          <span v-if="pkg.speed_download && Number(pkg.speed_download) > 0">
                            {{ Number(pkg.speed_download) >= 1000 ? Math.round(pkg.speed_download/1000)+'G' : pkg.speed_download+'M' }}
                          </span>
                          <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        </div>
                        <div class="text-right min-w-0">
                          <div class="text-xs font-black text-slate-800 truncate">{{ pkg.name }}</div>
                          <div class="text-[10px] text-slate-400 font-bold">
                            {{ pkg.speed_download && Number(pkg.speed_download) > 0 ? pkg.speed_download + ' Mbps' : 'سرعة متغيرة' }}
                          </div>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 flex-shrink-0">
                        <span class="text-xs font-black" :class="String(pkg.id) === String(userData.profile_id) ? 'text-indigo-600' : 'text-slate-700'">{{ pkg.price ? `LD ${pkg.price}` : '—' }}</span>
                        <svg v-if="String(pkg.id) === String(userData.profile_id)" class="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                        <svg v-else class="w-3.5 h-3.5 text-slate-200 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                      </div>
                    </button>
                    <div v-if="!packagesList.length" class="px-4 py-6 text-center text-xs font-bold text-slate-400">
                      لا توجد باقات متاحة حالياً
                    </div>
                  </div>
                  <div class="px-3 py-2 bg-slate-50 border-t border-slate-100">
                    <p class="text-[9px] text-slate-400 font-bold text-center">سيتم تغيير الباقة مباشرةً عبر نظام الساس</p>
                  </div>
                </div>
              </Transition>
              </div><!-- end relative wrapper -->
            </div>

          </div>
        </div>

        <!-- معلومات العميل -->
        <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div class="p-5 border-b border-slate-50 flex items-center justify-start gap-4" dir="rtl">
            <div class="w-11 h-11 rounded-2xl bg-[#111827] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div class="text-right flex-1">
              <h2 class="font-black text-slate-900 text-base">معلومات العميل</h2>
              <p class="text-[11px] text-slate-400 font-bold">البيانات الشخصية والحساب</p>
            </div>
          </div>
          <div class="p-5 grid grid-cols-2 gap-x-4 gap-y-5 flex-1 content-start">

            <!-- رمز الدخول = رقم الهاتف -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">رمز الدخول</div>
              <div class="text-sm font-black text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 text-right font-mono truncate" :title="userData.phone || userData.username">{{ userData.phone || userData.username || '—' }}</div>
            </div>

            <!-- الاسم الكامل — بدون حذف -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">الاسم الكامل</div>
              <div class="text-sm font-black text-slate-800 bg-slate-50 rounded-xl px-4 py-3 text-right break-words whitespace-normal leading-snug">{{ displayName || '—' }}</div>
            </div>

            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">اسم المستخدم</div>
              <div class="text-sm font-black text-slate-800 bg-slate-50 rounded-xl px-4 py-3 text-right truncate" :title="userData.username || '—'">{{ userData.username || '—' }}</div>
            </div>



            <!-- تاريخ التسجيل -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">تاريخ التسجيل</div>
              <div class="text-sm font-black text-slate-600 bg-slate-50 rounded-xl px-4 py-3 text-right">{{ registeredDate }}</div>
            </div>

            <!-- رصيد الحساب -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1 text-right">رصيد الحساب</div>
              <div class="font-bold text-slate-700 text-sm text-right">LD {{ balanceData.balance || '0.00' }}</div>
            </div>

            <!-- الفواتير غير المدفوعة -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1 text-right">فواتير غير مدفوعة</div>
              <div class="font-bold text-sm text-right" :class="Number(balanceData.unpaid_invoices) > 0 ? 'text-rose-600' : 'text-slate-500'">
                {{ balanceData.unpaid_invoices || 0 }}
              </div>
            </div>

            <!-- الهاتف -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1 text-right">الهاتف</div>
              <div class="font-bold text-slate-800 text-sm text-right" dir="ltr">{{ userData.phone || 'غير متوفر' }}</div>
            </div>

            <!-- البريد الإلكتروني -->
            <div>
              <div class="text-[11px] font-black text-slate-400 mb-1 text-right">البريد الإلكتروني</div>
              <div class="font-bold text-slate-600 text-sm text-right truncate" :title="userData.email">{{ userData.email || 'N/A' }}</div>
            </div>

            <!-- رقم العقد -->
            <div class="col-span-2 mt-2">
              <div class="text-[11px] font-black text-slate-400 mb-1.5 text-right px-1">رقم العقد</div>
              <button @click="openModal('contract')" class="w-full group flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-300 rounded-xl transition-all duration-200">
                <span class="font-bold text-slate-600 group-hover:text-slate-900 transition-colors text-sm text-right flex-1 truncate">{{ userData.contract || userData.contract_number || 'عرض وتنزيل العقد' }}</span>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-black text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">تنزيل العقد</span>
                  <div class="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-indigo-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors border border-transparent group-hover:border-indigo-100">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                  </div>
                </div>
              </button>
            </div>

          </div>
        </div>

      </div>

      <!-- ===== بيانات الاستهلاك ===== -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-50 flex items-center justify-start gap-4" dir="rtl">
          <div class="w-11 h-11 rounded-2xl bg-cyan-900 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          </div>
          <div class="text-right flex-1">
            <h2 class="font-black text-slate-900 text-base">البيانات المستهلكة</h2>
            <p class="text-[11px] text-slate-400 font-bold">إحصائيات الاستهلاك للدورة الحالية</p>
          </div>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4" dir="rtl">

            <!-- التحميل (Download = rx_mb) -->
            <div class="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 transition-all hover:bg-slate-100">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <div class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                </div>
                التحميل
              </div>
              <div class="text-lg font-black text-slate-800" dir="ltr">{{ trafficStats.download }}</div>
            </div>

            <!-- الرفع (Upload = tx_mb) -->
            <div class="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 transition-all hover:bg-slate-100">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <div class="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
                </div>
                الرفع
              </div>
              <div class="text-lg font-black text-slate-800" dir="ltr">{{ trafficStats.upload }}</div>
            </div>

            <!-- الإجمالي -->
            <div class="bg-cyan-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-cyan-100 transition-all hover:bg-cyan-100">
              <div class="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                <div class="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                الإجمالي المستهلك
              </div>
              <div class="text-xl font-black text-cyan-700" dir="ltr">{{ trafficStats.total }}</div>
            </div>

          </div>
        </div>
      </div>

      <!-- ===== الفواتير ===== -->
      <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div>
              <h2 class="font-black text-slate-900 text-sm">الفواتير</h2>
              <p class="text-xs text-slate-400 font-bold">سجل المدفوعات والمستحقات</p>
            </div>
          </div>
          <button @click="loadInvoices" :disabled="invoicesLoading" class="text-xs font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all disabled:opacity-50">
            {{ invoicesLoading ? 'جارٍ...' : 'تحديث' }}
          </button>
        </div>

        <!-- Skeleton Invoices -->
        <div v-if="invoicesLoading" class="p-5 space-y-3">
          <div v-for="i in 3" :key="i" class="h-16 bg-slate-100 rounded-2xl animate-pulse"></div>
        </div>

        <!-- قائمة الفواتير -->
        <div v-else-if="invoices.length" class="divide-y divide-slate-50">
          <div v-for="inv in invoices" :key="inv.id" class="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
            <div class="flex items-center gap-3 min-w-0">
              <div :class="inv.paid ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'" class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="inv.paid ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'"/></svg>
              </div>
              <div class="min-w-0">
                <div class="text-sm font-black text-slate-800 truncate"># {{ inv.invoice_number }}</div>
                <div class="text-xs text-slate-400 font-bold">{{ formatDate(inv.created_at) }}</div>
              </div>
            </div>
            <div class="text-right flex-shrink-0">
              <div class="text-sm font-black text-slate-900">LD {{ inv.amount }}</div>
              <div :class="inv.paid ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'" class="text-[10px] font-black px-2 py-0.5 rounded-full mt-0.5">
                {{ inv.paid ? 'مدفوعة' : 'غير مدفوعة' }}
              </div>
            </div>
          </div>
        </div>

        <!-- لا فواتير -->
        <div v-else class="p-8 text-center">
          <div class="text-3xl mb-2">🧾</div>
          <p class="text-slate-400 text-sm font-bold">لا توجد فواتير بعد</p>
        </div>
      </div>

    </template>

    <!-- ===== Modal: تعبئة الرصيد ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'redeem'" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" dir="rtl" @click.self="closeModal">
        <div class="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">

          <!-- شريط علوي ملون -->
          <div class="h-1.5 w-full rounded-t-2xl" style="background: linear-gradient(90deg, #2B32B2, #1488CC);"></div>

          <!-- مقبض السحب -->
          <div class="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1"></div>

          <div class="px-5 pt-4 pb-5 sm:p-7">
            <!-- الهيدر -->
            <div class="flex items-start justify-between mb-5">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0" style="background: linear-gradient(135deg, #6366f1, #06b6d4);">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                </div>
                <div>
                  <h3 class="text-lg font-black text-slate-900 leading-tight">تعبئة الرصيد</h3>
                  <p class="text-slate-400 text-xs font-bold mt-0.5">أدخل رمز بطاقة الشحن</p>
                </div>
              </div>
              <button @click="closeModal" class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 bg-slate-100 hover:bg-red-50 rounded-xl transition-all flex-shrink-0">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <!-- رصيد حالي -->
            <div class="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 mb-5">
              <span class="text-xs font-black text-slate-500">رصيدك الحالي</span>
              <span class="text-sm font-black text-slate-800">LD {{ balanceData.balance }}</span>
            </div>

            <ModalFeedback :message="modalMsg" :success="modalSuccess" />

            <!-- بطاقة إدخال مرئية -->
            <form @submit.prevent="handleRedeem" class="space-y-4">
              <div class="relative">

                <input
                  v-model="redeemPin"
                  type="text"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="أدخل رمز البطاقة (12 رقم)"
                  maxlength="12"
                  autocomplete="off"
                  id="redeem-pin-input"
                  @input="onPinInput"
                  @keypress="blockNonDigit"
                  @paste.prevent="onPinPaste"
                  class="w-full text-center tracking-[0.3em] px-4 py-3.5 rounded-2xl border-2 transition-all font-black text-lg text-slate-800 bg-slate-50 focus:bg-white outline-none appearance-none"
                  style="-moz-appearance:textfield;"
                  :class="redeemPinError ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'"
                />
                <!-- عداد الأرقام -->
                <div class="flex items-center justify-between mt-1.5 px-1">
                  <p v-if="redeemPinError" class="text-rose-500 text-xs font-bold">{{ redeemPinError }}</p>
                  <p v-else class="text-slate-400 text-[10px] font-bold">البطاقة تتكون من 12 رقماً</p>
                  <span class="text-[10px] font-black" :class="redeemPin.length === 12 ? 'text-emerald-500' : 'text-slate-400'">{{ redeemPin.length }}/12</span>
                </div>
              </div>

              <!-- أزرار -->
              <div class="grid grid-cols-2 gap-3">
                <button type="button" @click="closeModal" class="py-3.5 rounded-2xl font-black text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95">
                  إلغاء
                </button>
                <button type="submit" :disabled="modalLoading" class="py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2" style="background: linear-gradient(135deg, #6366f1, #06b6d4);">
                  <svg v-if="modalLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  {{ modalLoading ? 'جارٍ...' : 'تأكيد التعبئة ✓' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== Modal: تفعيل الاشتراك ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'activate'" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" dir="rtl" @click.self="closeModal">
        <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <!-- شريط علوي أخضر -->
          <div class="h-1.5 w-full rounded-t-2xl" style="background: linear-gradient(135deg, #168A7D, #10B982);"></div>
          <div class="p-7">
            <!-- زر الإغلاق -->
            <button @click="closeModal" class="absolute top-5 left-5 flex p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 rounded-xl transition-all border border-slate-100">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4" style="background: linear-gradient(135deg,#168A7D,#10B982);">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="text-xl font-black text-slate-900 mb-1">تفعيل الاشتراك</h3>
            <p class="text-slate-400 text-sm mb-4">سيتم خصم تكلفة الخدمة من رصيدك الحالي تلقائياً.</p>

            <!-- مقارنة الرصيد والتكلفة -->
            <div class="space-y-2 mb-5">
              <div class="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                <span class="text-xs font-black text-slate-500">رصيدك الحالي</span>
                <span class="text-sm font-black text-slate-800">LD {{ balanceData.balance }}</span>
              </div>
              <div class="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                <span class="text-xs font-black text-slate-500">تكلفة الاشتراك</span>
                <span class="text-sm font-black text-indigo-700">{{ currentPackagePrice > 0 ? `LD ${currentPackagePrice}` : 'غير محدد' }}</span>
              </div>
              <div v-if="currentPackagePrice > 0 && Number(balanceData.balance) < currentPackagePrice" class="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl p-3">
                <svg class="w-4 h-4 text-rose-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-xs font-black text-rose-700">الرصيد غير كافٍ. يرجى تعبئة الرصيد أولاً.</span>
              </div>
              <div v-else-if="currentPackagePrice > 0" class="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                <svg class="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span class="text-xs font-black text-emerald-700">الرصيد كافٍ للتفعيل ✓</span>
              </div>
            </div>

            <ModalFeedback :message="modalMsg" :success="modalSuccess" />

            <div class="space-y-3">
              <!-- ✅ زر التأكيد — يظهر دائماً ويتحقق من الرصيد عند الضغط -->
              <form @submit.prevent="handleActivate">
                <button
                  type="submit"
                  :disabled="modalLoading"
                  id="btn-confirm-activate"
                  class="w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                  style="background: linear-gradient(135deg, #168A7D, #10B982);"
                >
                  <svg v-if="modalLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  {{ modalLoading ? 'جارٍ التفعيل...' : 'تأكيد الاشتراك ✓' }}
                </button>
              </form>

              <!-- زر شحن الرصيد يظهر كخيار دائم للمستخدم -->
              <button
                type="button"
                @click="closeModal(); openModal('redeem')"
                id="btn-goto-recharge"
                class="w-full py-3.5 rounded-2xl font-black text-sm text-white shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                style="background: linear-gradient(135deg, #2B32B2, #1488CC);"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                تعبئة الرصيد الآن
              </button>

              <button type="button" @click="closeModal" class="w-full py-3 rounded-2xl font-black text-sm text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 transition-all">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== Modal: تحميل العقد ===== -->

    <Transition name="modal-fade">
      <div v-if="activeModal === 'contract'" class="fixed inset-0 z-[100] flex flex-col bg-slate-900/98 backdrop-blur-sm overflow-hidden" dir="rtl">

        <!-- ─── شريط الأدوات العلوي ─── -->
        <div class="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10" style="background: linear-gradient(135deg, #0c1220 0%, #1a2340 100%);">
          <!-- معلومات واضحة -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg" style="background: linear-gradient(135deg, #2B32B2, #1488CC);">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div>
              <h3 class="font-black text-base sm:text-lg leading-tight" style="color: #fff; text-shadow: 0 1px 4px rgba(0,0,0,.4);">معاينة العقد</h3>
              <p class="text-xs font-bold mt-0.5" style="color: #93c5fd;">عقد خدمة الإنترنت — التكامل نت</p>
            </div>
          </div>
          <!-- أزرار -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- تحميل PDF -->
            <button
              @click="downloadContract"
              :disabled="modalLoading"
              class="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-lg transition-all disabled:opacity-50 active:scale-95"
              style="background: linear-gradient(135deg,#2B32B2,#1488CC); color:#fff;"
            >
              <svg v-if="!modalLoading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <svg v-else class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>{{ modalLoading ? 'جارٍ...' : 'تحميل PDF' }}</span>
            </button>
            <!-- زر الإغلاق — أحمر بارز -->
            <button
              @click="closeModal"
              class="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all active:scale-95 shadow-lg"
              style="background: #dc2626; color:#fff; border: 2px solid #ef4444;"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              <span>إغلاق</span>
            </button>
          </div>
        </div>

        <!-- ─── منطقة العقد بالتمرير — A4 مع تمرير أفقي إذا لزم ─── -->
        <div class="flex-1 overflow-auto" style="background: #e2e8f0;">
          <div class="min-h-full flex items-start justify-center p-4 sm:p-6">
            <div id="contract-root" class="bg-white shadow-2xl" style="width: 210mm; min-height: 295mm;">
              <ContractPdf :userData="userData" :balanceData="balanceData" />
            </div>
          </div>
        </div>


      </div>
    </Transition>

    <!-- ===== Modal: تأكيد تغيير الباقة ===== -->
    <Transition name="modal-fade">
      <div v-if="activeModal === 'pkg-confirm'" class="fixed inset-0 z-[60] flex items-center justify-center p-4" dir="rtl">
        <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-md" @click="activeModal = ''"></div>
        <div class="bg-white rounded-[2rem] w-full max-w-sm relative z-10 shadow-2xl overflow-hidden" style="box-shadow: 0 30px 80px -10px rgba(99,102,241,.3);">

          <!-- شريط تحذيري -->
          <div class="h-1.5 w-full" style="background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>

          <div class="p-6">
            <!-- الأيقونة -->
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style="background: linear-gradient(135deg, #fef3c7, #fed7aa);">
              <svg class="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            </div>

            <h3 class="text-lg font-black text-slate-900 text-center mb-1">تغيير الباقة</h3>
            <p class="text-slate-500 text-xs text-center font-bold mb-5">تأكد من تفاصيل التغيير قبل التأكيد</p>

            <!-- معلومات الباقتين -->
            <div class="space-y-2.5 mb-5">
              <!-- الحالية -->
              <div class="flex items-center justify-between bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
                <div class="text-right">
                  <div class="text-[9px] font-black text-rose-400 uppercase tracking-wider">الباقة الحالية — ستُحذف</div>
                  <div class="text-sm font-black text-rose-700 mt-0.5">{{ currentPackageName }}</div>
                </div>
                <svg class="w-6 h-6 text-rose-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>

              <div class="flex items-center justify-center">
                <svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>

              <!-- الجديدة -->
              <div class="flex items-center justify-between bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3">
                <div class="text-right">
                  <div class="text-[9px] font-black text-indigo-400 uppercase tracking-wider">الباقة الجديدة — ستُفعّل</div>
                  <div class="text-sm font-black text-indigo-700 mt-0.5">{{ selectedPkg?.name }}</div>
                  <div class="text-[10px] text-indigo-400 font-bold mt-0.5">
                    {{ selectedPkg?.speed_download && Number(selectedPkg.speed_download) > 0 ? selectedPkg.speed_download + ' Mbps' : '' }}
                    {{ selectedPkg?.price ? ' · LD ' + selectedPkg.price : '' }}
                  </div>
                </div>
                <svg class="w-6 h-6 text-indigo-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
            </div>

            <!-- تحذير -->
            <div class="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 mb-5">
              <svg class="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <p class="text-[10px] font-bold text-amber-700">سيتم حذف الباقة الحالية فوراً وتفعيل الباقة الجديدة. هذا الإجراء لا يمكن التراجع عنه.</p>
            </div>

            <!-- أزرار -->
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="activeModal = ''; selectedPkg = null"
                class="py-3 rounded-2xl font-black text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
              >إلغاء</button>
              <button
                @click="handlePkgChange"
                :disabled="pkgChangeLoading"
                class="py-3 rounded-2xl font-black text-sm text-white shadow-lg transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-1.5"
                style="background: linear-gradient(135deg, #6366f1, #8b5cf6);"
              >
                <svg v-if="pkgChangeLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {{ pkgChangeLoading ? 'جارٍ...' : 'تأكيد التغيير ✓' }}
              </button>
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

// دالة تحويل MB → GB (محلية لتجنب مشاكل import في Nuxt)
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
const selectedPkg      = ref(null)   // الباقة المختارة للتغيير

// Modals
const activeModal  = ref('')   // 'redeem' | 'activate' | 'contract' | 'pkg-confirm'
const modalLoading = ref(false)
const modalMsg     = ref('')
const modalSuccess = ref(false)
const redeemPin    = ref('')
const redeemPinError = ref('')

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

  // نفضّل بيانات loan من الـ Dashboard
  const rxMb  = loan.rx_mb  ?? null
  const txMb  = loan.tx_mb  ?? null
  const totMb = loan.rxtx_mb ?? (rxMb !== null && txMb !== null ? rxMb + txMb : null)

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

  // نُشغّل الطلبات الثلاث بالتوازي
  const [userRes, balRes, pkgRes] = await Promise.all([
    getUserData(token),
    getBalance(token),
    getPackages(token),
  ])

  // التحقق من انتهاء الجلسة
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

  // جلب الفواتير بشكل منفصل لتسريع عرض الصفحة
  loadInvoices()
}

async function loadInvoices() {
  invoicesLoading.value = true
  const token = getToken()
  if (!token) return
  const res = await getInvoices(token)
  if (res?.invoices) invoices.value = res.invoices
  invoicesLoading.value = false
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
  // لو الباقة هي نفس الحالية نتجاهل
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

  if (res?.success || res?._httpStatus === 200 || res?.message === 'rsp_service_change_success') {
    // تحديث البيانات فوراً
    const newPkgId = selectedPkg.value.id
    userData.value = { ...userData.value, profile_id: String(newPkgId) }
    showToast(`تم التغيير إلى ${selectedPkg.value.name} بنجاح ✓`, 'success', 5000)
    activeModal.value = ''
    selectedPkg.value = null
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

  // إذا أراد التفعيل → تحقق من الرصيد
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
  // نحفظ الحالة السابقة للرجوع إليها عند الفشل
  const previousValue = userData.value.auto_renew
  const token = getToken()

  // تحديث فوري في الواجهة (Optimistic UI)
  userData.value = { ...userData.value, auto_renew: enabling ? 1 : 0 }

  const res = await toggleAutoRenew(token, enabling)
  autoRenewLoading.value = false

  if (res.success) {
    updateUser({ auto_renew: enabling ? 1 : 0 })
    showToast(res.message, 'success')
  } else if (res.expired) {
    // ارجع الحالة ثم انتقل للدخول
    userData.value = { ...userData.value, auto_renew: previousValue }
    clearSession()
    router.replace('/portal/login')
  } else {
    // ارجع الـ toggle للحالة السابقة عند الفشل
    userData.value = { ...userData.value, auto_renew: previousValue }
    showToast(res.error || 'عذراً، حدث خطأ أثناء تغيير حالة التجديد التلقائي أو لا تملك صلاحية لذلك.', 'error')
  }
}

// ─── تعبئة رصيد — دوال مساعدة ────────────────────────────────────────────────
// يمنع إدخال أي حرف غير رقم
function blockNonDigit(e) {
  if (!/[0-9]/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Enter'].includes(e.key)) {
    e.preventDefault()
  }
}
// ينظف القيمة عند الكتابة
function onPinInput(e) {
  redeemPin.value = e.target.value.replace(/\D/g, '').slice(0, 12)
  e.target.value  = redeemPin.value
  redeemPinError.value = ''
}
// يتحكم في اللصق
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
  // تفريغ الخطأ السابق
  redeemPinError.value = ''
  modalMsg.value       = ''

  // التحقق من صحة الرمز محلياً
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
    // تحديث الرصيد فوراً
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
  // تحقق من الرصيد قبل إرسال الطلب
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
    // تحديث كامل للبيانات بعد التفعيل
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

    if (Capacitor.isNativePlatform()) {
      // ─── نسخة الأندرويد ───
      showToast('جاري تجهيز العقد...', 'warning', 8000)

      // 1) توليد PDF كـ Blob
      let pdfBlob
      try {
        pdfBlob = await html2pdf().set(opt).from(element).outputPdf('blob')
      } catch (genErr) {
        console.error('[PDF] خطأ أثناء التوليد:', genErr)
        throw new Error('تعذّر توليد ملف PDF. يرجى المحاولة لاحقاً.')
      }

      if (!pdfBlob || pdfBlob.size === 0) {
        throw new Error('ملف PDF فارغ. يرجى المحاولة مجدداً.')
      }

      // 2) تحويل Blob → Base64 (باستخدام Promise لضمان الانتظار الصحيح)
      const base64DataOnly = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const result = reader.result
          if (result) {
            resolve(result.split(',')[1])
          } else {
            reject(new Error('فشل قراءة الملف.'))
          }
        }
        reader.onerror = () => reject(new Error('خطأ أثناء قراءة الملف.'))
        reader.readAsDataURL(pdfBlob)
      })

      // 3) حفظ الملف في Cache
      let savedFile
      try {
        savedFile = await Filesystem.writeFile({
          path: filename,
          data: base64DataOnly,
          directory: Directory.Cache,
        })
      } catch (fsErr) {
        console.error('[PDF] خطأ حفظ الملف:', fsErr)
        throw new Error('تعذّر حفظ الملف على الجهاز. تحقق من أذونات التخزين.')
      }

      // 4) مشاركة الملف عبر نافذة النظام
      try {
        await Share.share({
          title: 'عقد الاشتراك — التكامل نت',
          url: savedFile.uri,
          dialogTitle: 'حفظ أو فتح عقد الاشتراك',
        })
        showToast('تم تجهيز العقد بنجاح! اختر تطبيقاً لحفظه أو فتحه.', 'success', 4000)
      } catch (shareErr) {
        // المستخدم أغلق نافذة المشاركة — ليس خطأ حقيقياً
        console.log('[PDF] المستخدم أغلق نافذة المشاركة:', shareErr?.message)
        showToast('تم تجهيز الملف. اختر تطبيقاً لحفظه.', 'warning', 3000)
      }

    } else {
      // ─── نسخة المتصفح العادي ───
      await html2pdf().set(opt).from(element).save()
      showToast('تم تحميل العقد بنجاح! ✓', 'success', 4000)
    }
  } catch (error) {
    console.error('[PDF] خطأ عام:', error)
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
// ModalFeedback — رسالة نجاح/فشل داخل الـ Modal
const ModalFeedback = {
  props: ['message', 'success'],
  template: `
    <Transition name="fade">
      <div v-if="message" :class="success ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'"
        class="mb-4 flex items-start gap-2 border rounded-2xl p-3 text-sm font-bold">
        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="success ? 'M5 13l4 4L19 7' : 'M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'"/>
        </svg>
        {{ message }}
      </div>
    </Transition>
  `
}

// ModalBtn — زر submit موحّد مع حالة تحميل
const ModalBtn = {
  props: { loading: Boolean, label: String, color: { default: 'indigo' } },
  computed: {
    gradient() {
      const map = {
        indigo:  'linear-gradient(135deg,#6366f1,#06b6d4)',
        emerald: 'linear-gradient(135deg,#10b981,#059669)',
        rose:    'linear-gradient(135deg,#f43f5e,#e11d48)'
      }
      return map[this.color] || map.indigo
    }
  },
  template: `
    <button type="submit" :disabled="loading" :style="'background:' + gradient"
      class="w-full py-4 text-white font-black rounded-2xl shadow-lg hover:scale-[1.01] transition-all disabled:opacity-70">
      <span v-if="!loading">{{ label }}</span>
      <span v-else class="flex items-center justify-center gap-2">
        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
        جارٍ التنفيذ...
      </span>
    </button>
  `
}

export default {
  components: { ModalFeedback, ModalBtn }
}
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

/* Contract scale للموبايل */
@media (max-width: 767px) {
  .contract-mobile-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 12px;
  }
}
</style>
