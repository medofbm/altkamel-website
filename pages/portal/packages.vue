<template>
  <div class="space-y-6 sm:space-y-8 pb-6" dir="rtl">

    <!-- ─── رأس الصفحة ─── -->
    <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-5 pt-1">
      <div>
        <p class="text-[10px] sm:text-xs font-black text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span class="w-3 h-px bg-indigo-400 inline-block"></span>
          الباقات المتاحة
        </p>
        <h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">باقات التكامل نت</h1>
        <p class="text-slate-400 font-medium text-xs sm:text-sm mt-0.5">سرعة حقيقية بأسعار منافسة</p>
      </div>

      <!-- شارة الباقة الحالية — ديناميكية -->
      <div v-if="currentPkg" class="flex-shrink-0 inline-flex items-center gap-3 bg-white border border-indigo-200 rounded-2xl px-4 py-3 shadow-sm self-start sm:self-auto">
        <div class="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/></svg>
        </div>
        <div>
          <div class="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-0.5">باقتك الحالية</div>
          <div class="font-black text-indigo-700 text-xs sm:text-sm">{{ currentPkg.name }}</div>
          <div class="text-[9px] text-slate-400 font-bold mt-0.5">{{ currentPkg.speed_download }} Mbps · LD {{ currentPkg.price }}</div>
        </div>
      </div>
      <div v-else-if="isLoading" class="flex-shrink-0 h-14 w-48 bg-slate-100 animate-pulse rounded-2xl"></div>
    </div>

    <!-- ════════════ باقات غير المحدودة ════════════ -->
    <section>
      <!-- عنوان القسم -->
      <div class="flex items-center gap-3 mb-4">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0" style="background: linear-gradient(135deg,#6366f1,#06b6d4);">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <div class="flex-1">
          <h2 class="text-sm sm:text-base font-black text-slate-900 leading-tight">باقات غير المحدودة</h2>
          <p class="text-[10px] sm:text-[11px] text-slate-400 font-bold">Unlimited · للمنازل والعائلات</p>
        </div>
        <div class="flex-1 max-w-[80px] sm:max-w-none h-px" style="background:linear-gradient(90deg,rgba(99,102,241,0.3),transparent);"></div>
      </div>

      <!-- شبكة الكروت -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="pkg in unlimitedPackages"
          :key="pkg.name"
          class="pkg-card relative bg-white rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300"
          :class="[
            pkg.current
              ? 'border-indigo-300 shadow-xl shadow-indigo-100/60 ring-2 ring-indigo-500/20'
              : 'border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:border-indigo-200/60 active:scale-[0.98]'
          ]"
        >
          <!-- شريط علوي -->
          <div class="h-1 sm:h-1.5 w-full"
            :style="pkg.current ? 'background:linear-gradient(90deg,#2B32B2,#1488CC)' : (pkg.badge && pkg.badge.includes('الأكثر') ? 'background:linear-gradient(90deg,#168A7D,#10B982)' : 'background:linear-gradient(90deg,#e2e8f0,#cbd5e1)')">
          </div>

          <!-- شارة -->
          <div class="absolute top-3 left-3">
            <!-- شارة البطاقة الحالية -->
            <span v-if="pkg.current" class="inline-flex items-center gap-1 text-[9px] font-black text-white px-2 py-1 rounded-full shadow" style="background:linear-gradient(135deg,#2B32B2,#1488CC);">
              <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
              باقتك الحالية
            </span>
            <!-- شارة الأكثر طلباً — بتصميم مضيء -->
            <span v-else-if="pkg.badge && pkg.badge.includes('الأكثر')" class="inline-flex items-center gap-1 text-[9px] font-black text-white px-2.5 py-1 rounded-full shadow-lg" style="background:linear-gradient(135deg,#168A7D,#10B982);">
              🔥 الأكثر طلباً
            </span>
            <span v-else-if="pkg.badge" class="text-[9px] font-black px-2 py-1 rounded-full" :class="pkg.badgeClass">{{ pkg.badge }}</span>
          </div>

          <div class="p-4 sm:p-5" :class="(pkg.current || pkg.badge) ? 'pt-8 sm:pt-10' : ''">

            <!-- ─── الاسم ─── -->
            <div class="mb-2.5 sm:mb-4">
              <div class="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">UNLIMITED</div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 leading-tight">{{ pkg.name }}</h3>
              <p class="text-[10px] text-slate-400 font-medium mt-0.5 hidden sm:block">{{ pkg.desc }}</p>
            </div>

            <!-- ─── السعر + السرعة ─── -->
            <div class="flex items-center justify-between mb-2.5 sm:mb-4 bg-slate-50 rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 border border-slate-100">
              <div>
                <div class="flex items-baseline gap-0.5">
                  <span class="text-lg sm:text-2xl font-black text-slate-900 leading-none">{{ pkg.price }}</span>
                  <span class="text-[10px] sm:text-xs font-bold text-slate-400">د.ل</span>
                </div>
                <div class="text-[8px] sm:text-[9px] text-slate-400 font-bold">شهرياً</div>
              </div>
              <div class="w-px h-8 bg-slate-200"></div>
              <div class="text-center">
                <div class="flex items-baseline gap-0.5 justify-center">
                  <span class="text-lg sm:text-2xl font-black leading-none" :class="pkg.current ? 'text-indigo-600' : 'text-slate-800'">{{ pkg.speed }}</span>
                  <span class="text-[8px] sm:text-[9px] font-black" :class="pkg.current ? 'text-indigo-400' : 'text-slate-400'">M</span>
                </div>
                <div class="text-[8px] sm:text-[9px] text-slate-400 font-bold">Mbps</div>
              </div>
            </div>

            <!-- ─── الميزات ─── -->
            <ul class="space-y-1 sm:space-y-1.5 mb-2.5 sm:mb-4">
              <li v-for="feat in pkg.features" :key="feat" class="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600">
                <div class="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="pkg.current ? 'bg-indigo-100' : 'bg-slate-100'">
                  <svg class="w-1.5 h-1.5 sm:w-2 sm:h-2" :class="pkg.current ? 'text-indigo-600' : 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                {{ feat }}
              </li>
            </ul>

            
          </div>
        </div>
      </div>
    </section>

    <!-- ════════════ باقات الأعمال ════════════ -->
    <section>
      <div class="flex items-center gap-3 mb-4">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        </div>
        <div class="flex-1">
          <h2 class="text-sm sm:text-base font-black text-slate-900 leading-tight">باقات الأعمال</h2>
          <p class="text-[10px] sm:text-[11px] text-slate-400 font-bold">Business · للشركات والمؤسسات</p>
        </div>
        <div class="flex-1 max-w-[60px] sm:max-w-none h-px" style="background:linear-gradient(90deg,rgba(5,150,105,0.3),transparent);"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <div
          v-for="pkg in businessPackages"
          :key="pkg.name"
          class="pkg-card relative bg-white rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300"
          :class="[
            pkg.recommended
              ? 'border-emerald-300 shadow-xl shadow-emerald-100/60 ring-2 ring-emerald-500/20'
              : 'border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:border-emerald-200/60 active:scale-[0.98]'
          ]"
        >
          <div class="h-1 sm:h-1.5 w-full"
            :style="pkg.recommended ? 'background:linear-gradient(90deg,#059669,#0d9488)' : 'background:linear-gradient(90deg,#e2e8f0,#cbd5e1)'">
          </div>
          <div v-if="pkg.recommended" class="absolute top-3 left-3">
            <span class="inline-flex items-center gap-1 text-[9px] font-black text-white bg-emerald-600 px-2 py-1 rounded-full shadow">⭐ الأكثر طلباً</span>
          </div>

          <div class="p-3.5 sm:p-5" :class="pkg.recommended ? 'pt-7 sm:pt-10' : ''">
            <div class="mb-2.5 sm:mb-4">
              <div class="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">BUSINESS</div>
              <h3 class="text-sm sm:text-base font-black text-slate-900 leading-tight">{{ pkg.name }}</h3>
              <p class="text-[10px] text-slate-400 font-medium mt-0.5 hidden sm:block">{{ pkg.desc }}</p>
            </div>

            <div class="flex items-center justify-between mb-3 sm:mb-4 bg-slate-50 rounded-xl px-2.5 sm:px-3 py-2 sm:py-2.5 border border-slate-100">
              <div>
                <div class="flex items-baseline gap-0.5">
                  <span class="text-xl sm:text-2xl font-black text-slate-900 leading-none">{{ pkg.price }}</span>
                  <span class="text-[10px] sm:text-xs font-bold text-slate-400">د.ل</span>
                </div>
                <div class="text-[8px] sm:text-[9px] text-slate-400 font-bold">شهرياً</div>
              </div>
              <div class="w-px h-8 bg-slate-200"></div>
              <div class="text-center">
                <div class="flex items-baseline gap-0.5 justify-center">
                  <span class="text-xl sm:text-2xl font-black leading-none" :class="pkg.recommended ? 'text-emerald-600' : 'text-slate-800'">{{ pkg.speed }}</span>
                  <span class="text-[8px] sm:text-[9px] font-black mt-1" :class="pkg.recommended ? 'text-emerald-400' : 'text-slate-400'">M</span>
                </div>
                <div class="text-[8px] sm:text-[9px] text-slate-400 font-bold">Mbps</div>
              </div>
            </div>

            <ul class="space-y-1 sm:space-y-1.5 mb-3 sm:mb-4">
              <li v-for="feat in pkg.features" :key="feat" class="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-600">
                <div class="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="pkg.recommended ? 'bg-emerald-100' : 'bg-slate-100'">
                  <svg class="w-1.5 h-1.5" :class="pkg.recommended ? 'text-emerald-600' : 'text-slate-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                {{ feat }}
              </li>
            </ul>

            <div class="w-full py-2.5 sm:py-3 rounded-xl text-center font-black text-xs sm:text-sm bg-emerald-50 text-emerald-600 border border-emerald-100">
              تواصل مع الدعم للاشتراك
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── بانر التواصل ─── -->
    <div class="relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-8" style="background:linear-gradient(135deg,#1e1b4b 0%,#1e3a5f 100%);">
      <div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle,white 1px,transparent 1px);background-size:24px 24px;"></div>
      <div class="absolute top-0 left-0 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="text-right">
          <p class="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1.5">استفسار أو تغيير الباقة؟</p>
          <h3 class="text-lg sm:text-xl font-black text-white mb-1">تواصل مع فريق الدعم</h3>
          <p class="text-slate-400 text-xs sm:text-sm font-medium">سيساعدك فريقنا في اختيار الباقة المثالية</p>
        </div>
        <a
          href="https://wa.me/218923339798"
          target="_blank"
          class="flex-shrink-0 inline-flex items-center gap-2.5 bg-white text-slate-900 text-xs sm:text-sm font-black px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition-all hover:scale-105 shadow-xl shadow-black/20 active:scale-95"
        >
          <svg class="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          تواصل عبر واتساب
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard' })
useHead({ title: 'الباقات المتاحة | التكامل نت' })

const { getPackages, getUserData } = useSas()
const { getToken } = useAuth()

const isLoading  = ref(true)
const pkgList    = ref([])
const userPkgId  = ref(null)

// الباقة الحالية من البيانات
 const currentPkg = computed(() =>
  pkgList.value.find(p => String(p.id) === String(userPkgId.value)) ?? null
)

onMounted(async () => {
  const token = getToken()
  if (!token) return
  const [userRes, pkgRes] = await Promise.all([
    getUserData(token),
    getPackages(token),
  ])
  if (userRes?.data?.profile_id) userPkgId.value = userRes.data.profile_id
  if (pkgRes?.packages)          pkgList.value   = pkgRes.packages
  isLoading.value = false
})

function contactSupport(pkg) {
  const speed = pkg.speed_download ? `${pkg.speed_download} Mbps` : ''
  const price = pkg.price ? ` - LD ${pkg.price}` : ''
  window.open(
    `https://wa.me/218923339798?text=${encodeURIComponent(`مرحباً، أريد الاستفسار عن باقة: ${pkg.name} ${speed}${price}`)}`,
    '_blank'
  )
}

const unlimitedPackages = [
  { name: 'Personal Plus', desc: 'مثالية للاستخدام الشخصي',       speed: 6,  price: 65,  current: false, badge: null, features: ['غير محدودة', 'دعم فني 24/7'] },
  { name: 'Home Package',  desc: 'مناسبة للمنازل الصغيرة',        speed: 8,  price: 80,  current: false, badge: null, features: ['غير محدودة', 'أولوية دعم'] },
  { name: 'Family Package',desc: 'للعائلات والاستخدام المتعدد',   speed: 10, price: 100, current: false, badge: '🔥 الأكثر طلباً', badgeClass: 'bg-orange-100 text-orange-700', features: ['غير محدودة', 'دعم مميز'] },
  { name: 'Family Plus',   desc: 'عائلة أكبر، سرعة أعلى',         speed: 15, price: 140, current: false, badge: null, features: ['غير محدودة', 'دعم مميز'] },
  { name: 'Family Turbo',  desc: 'للأسر المتصلة دائماً',           speed: 20, price: 200, current: false, badge: null, features: ['غير محدودة', 'دعم VIP'] },
  { name: 'Family Extra',  desc: 'أقصى سرعة للاستخدام المكثف',    speed: 30, price: 260, current: false, badge: '⚡ الأسرع', badgeClass: 'bg-violet-100 text-violet-700', features: ['غير محدودة', 'دعم VIP', 'أولوية قصوى'] },
]

const businessPackages = [
  { name: 'Mini Business', desc: 'للمشاريع الصغيرة والناشئة', speed: 5,  price: 190, recommended: false, features: ['اتصال مضمون', 'دعم تجاري'] },
  { name: 'Business Flat', desc: 'مكتب صغير أو متوسط',       speed: 10, price: 350, recommended: false, features: ['اتصال مضمون', 'دعم تجاري 24/7'] },
  { name: 'Business Plus', desc: 'للأعمال المتوسطة الحجم',   speed: 15, price: 500, recommended: false, features: ['اتصال مضمون', 'SLA 99.8%', 'دعم VIP'] },
  { name: 'Business Turbo',desc: 'سرعة احترافية للشركات',    speed: 20, price: 600, recommended: true,  features: ['اتصال مضمون', 'SLA 99.8%', 'دعم VIP', 'مراقبة شبكة'] },
  { name: 'Business Extra',desc: 'للشركات الكبيرة والتقنية', speed: 25, price: 680, recommended: false, features: ['اتصال مضمون', 'SLA 99.8%', 'دعم VIP', 'مراقبة كاملة'] },
]
</script>

<style scoped>
.pkg-card { will-change: transform; }
</style>
