<script setup>
// ✅ صفحة "من نحن" المستقلة - التكامل نت

// ✅ SEO كامل — يُولَّد كـ HTML ثابت عند البناء
useSeoMeta({
  title: 'من نحن | شركة التكامل نت للاتصالات والتقنية',
  description: 'تعرّف على شركة التكامل نت للاتصالات والتقنية، المؤسسة عام 2023. رؤيتنا ورسالتنا وقيمنا الجوهرية وإنجازاتنا في مجال الإنترنت والاتصالات بليبيا.',
  ogTitle: 'من نحن | التكامل نت',
  ogDescription: 'شركة التكامل نت للاتصالات والتقنية — رائدة في خدمات الإنترنت في ليبيا منذ 2023. تعرّف على قصتنا وإنجازاتنا.',
  ogImage: 'https://altkamel.ly/images/og-image.jpg',
  ogUrl: 'https://altkamel.ly/about',
  ogType: 'website',
  ogLocale: 'ar_LY',
  twitterCard: 'summary_large_image',
  twitterTitle: 'من نحن | التكامل نت',
  twitterDescription: 'شركة التكامل نت للاتصالات والتقنية — تأسست 2023 في ليبيا.',
  twitterImage: 'https://altkamel.ly/images/og-image.jpg',
})

// ==============================
// الإحصائيات
// ==============================
const stats = [
  { value: '+5000', label: 'عميل راضٍ', icon: 'users', color: 'from-indigo-500 to-blue-600' },
  { value: '99.9%', label: 'وقت التشغيل', icon: 'activity', color: 'from-teal-500 to-cyan-600' },
  { value: '2023', label: 'سنة التأسيس', icon: 'calendar', color: 'from-purple-500 to-indigo-600' },
  { value: '24/7', label: 'دعم فني متواصل', icon: 'headset', color: 'from-rose-500 to-pink-600' },
]

// ==============================
// قيم الشركة
// ==============================
const values = [
  {
    id: 'transparency',
    title: 'الشفافية',
    desc: 'نتعامل بشفافية ومصداقية تامة مع عملائنا وشركائنا في كل مرحلة.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    shadow: 'hover:shadow-indigo-100/60',
  },
  {
    id: 'quality',
    title: 'الجودة والتميز',
    desc: 'نلتزم بأعلى معايير الجودة في كل خدمة نقدمها، من البنية التحتية وحتى الدعم الفني.',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    shadow: 'hover:shadow-teal-100/60',
  },
  {
    id: 'integrity',
    title: 'النزاهة',
    desc: 'النزاهة والأمانة في كل تعاملاتنا التجارية والإدارية هي ركيزة أساسية لا نساوم عليها.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    shadow: 'hover:shadow-purple-100/60',
  },
  {
    id: 'respect',
    title: 'الاحترام',
    desc: 'نحترم عملاءنا وموظفينا وشركاءنا، ونبني علاقات طويلة الأمد قائمة على الثقة المتبادلة.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    shadow: 'hover:shadow-rose-100/60',
  },
  {
    id: 'responsibility',
    title: 'المسؤولية',
    desc: 'نتحمل مسؤولية خدماتنا كاملةً ونسعى دائماً لحل مشكلات عملائنا بسرعة وكفاءة.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    shadow: 'hover:shadow-amber-100/60',
  },
  {
    id: 'innovation',
    title: 'الابتكار',
    desc: 'نستثمر باستمرار في البحث والتطوير لتقديم منتجات وخدمات تواكب أحدث التطورات التكنولوجية.',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-100',
    shadow: 'hover:shadow-cyan-100/60',
  },
]

// ==============================
// صور معرض الإنجازات
// ==============================
const galleryImages = [
  { src: '/images/about/netaltkamel.jpg', alt: 'توقيع اتفاقية الاستحواذ على شبكة 1ST NET' },
  { src: '/images/about/altkamelwassem.jpg', alt: 'الشريك التجاري مع 1ST NET' },
  { src: '/images/about/net.jpg', alt: 'شبكة 1ST NET' },
]

// صور خدمات منتقاة للعرض
const serviceImages = [
  { src: '/images/about/service16.jpeg', alt: 'مقر شركة التكامل نت', label: 'مقر الشركة' },
  { src: '/images/about/service7.jpeg', alt: 'بنية تحتية متطورة', label: 'بنيتنا التحتية' },
  { src: '/images/about/service10.jpeg', alt: 'فريق الدعم الفني', label: 'فريقنا المتخصص' },
]

// ==============================
// Scroll Reveal — IntersectionObserver
// ==============================
onMounted(() => {
  const items = document.querySelectorAll('[data-reveal]')
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
  items.forEach(el => io.observe(el))
  onUnmounted(() => io.disconnect())
})
</script>

<template>
  <div class="font-cairo" dir="rtl">
    <AppNavbar />

    <main class="overflow-hidden">

      <!-- ================================================ -->
      <!-- HERO - بطل الصفحة                               -->
      <!-- ================================================ -->
      <section class="relative min-h-[70vh] flex items-center justify-center bg-brand-gradient overflow-hidden">

        <!-- خلفية متحركة: شبكة نقطية -->
        <div class="absolute inset-0 opacity-10"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px); background-size: 40px 40px;" />

        <!-- دوائر متوهجة -->
        <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl animate-float" />
        <div class="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl animate-float" style="animation-delay: -3s;" />

        <!-- محتوى Hero -->
        <div class="relative z-10 container mx-auto px-4 md:px-8 text-center text-white py-32">

          <!-- شارة صغيرة -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
            <span class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span class="text-sm font-semibold text-cyan-200">تأسست عام 2023</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight">
            من نحن
          </h1>
          <p class="text-xl md:text-2xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            شركة التكامل نت للاتصالات والتقنية — نربط الناس بالمستقبل
          </p>

          <!-- خط ديكوري -->
          <div class="mt-10 flex items-center justify-center gap-3">
            <div class="w-16 h-0.5 bg-white/30 rounded-full" />
            <div class="w-3 h-3 rotate-45 bg-cyan-400 rounded-sm" />
            <div class="w-16 h-0.5 bg-white/30 rounded-full" />
          </div>
        </div>

        <!-- موجة سفلية -->
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 20C480 40 240 0 0 20L0 80Z" fill="white"/>
          </svg>
        </div>
      </section>

      <!-- ================================================ -->
      <!-- إحصائيات الثقة                                  -->
      <!-- ================================================ -->
      <section class="py-8 bg-white">
        <div class="container mx-auto px-4 md:px-8">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="relative group rounded-2xl p-6 md:p-8 text-center overflow-hidden border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <!-- خلفية تدرج خفية -->
              <div class="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                :class="stat.color" />

              <!-- الأيقونة -->
              <div class="relative mb-3">
                <!-- users -->
                <svg v-if="stat.icon === 'users'" class="w-8 h-8 mx-auto mb-1" :class="'bg-gradient-to-br ' + stat.color + ' bg-clip-text'" style="color: transparent;" fill="none" stroke="url(#g1)" stroke-width="1.5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#6366f1"/>
                      <stop offset="100%" stop-color="#2563eb"/>
                    </linearGradient>
                  </defs>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
                <!-- activity -->
                <svg v-if="stat.icon === 'activity'" class="w-8 h-8 mx-auto mb-1" fill="none" stroke="url(#g2)" stroke-width="1.5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#14b8a6"/>
                      <stop offset="100%" stop-color="#06b6d4"/>
                    </linearGradient>
                  </defs>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <!-- calendar -->
                <svg v-if="stat.icon === 'calendar'" class="w-8 h-8 mx-auto mb-1" fill="none" stroke="url(#g3)" stroke-width="1.5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#a855f7"/>
                      <stop offset="100%" stop-color="#6366f1"/>
                    </linearGradient>
                  </defs>
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <!-- headset -->
                <svg v-if="stat.icon === 'headset'" class="w-8 h-8 mx-auto mb-1" fill="none" stroke="url(#g4)" stroke-width="1.5" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#f43f5e"/>
                      <stop offset="100%" stop-color="#ec4899"/>
                    </linearGradient>
                  </defs>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3zM21 18a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/>
                </svg>
              </div>

              <div class="text-3xl md:text-4xl font-black text-gradient mb-1">{{ stat.value }}</div>
              <div class="text-sm md:text-base text-gray-500 font-semibold">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================ -->
      <!-- النبذة التعريفية + صور (Animated)           -->
      <!-- ================================================ -->
      <section class="py-20 md:py-28 bg-white relative overflow-hidden">

        <!-- زخارف خلفية -->
        <div class="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 opacity-50" />

        <div class="relative container mx-auto px-4 md:px-8">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <!-- الجانب الأيمن: النص -->
            <div data-reveal data-reveal-dir="right" class="reveal-item reveal-from-right">
              <span class="inline-block bg-indigo-100 text-indigo-700 text-xs md:text-sm font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-4 md:mb-5">
                قصتنا
              </span>
              <h2 class="section-title text-3xl md:text-5xl mb-1 md:mb-2 leading-tight md:leading-normal pb-1 md:pb-2">شركة التكامل نت</h2>
              <h3 class="text-lg md:text-2xl font-bold text-gray-600 mb-4 md:mb-6">للاتصالات والتقنية</h3>
              <div class="w-16 md:w-20 h-1 md:h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 mb-6 md:mb-8" />

              <p class="text-gray-600 text-sm md:text-base leading-loose mb-4 md:mb-5">
                <strong class="text-indigo-700">أُنشئت شركة التكامل نت للاتصالات والتقنية عام 2023</strong>، وهي شركة رائدة
                في تقديم خدمات الإنترنت، تسعى لتقديم حلول تقنية مبتكرة وخدمات اتصال متطورة للمستخدمين والشركات على حد سواء.
              </p>
              <p class="text-gray-500 text-sm md:text-base leading-loose mb-4 md:mb-5">
                تلتزم الشركة بتقديم خدمات عالية الجودة وتوفير أحدث التقنيات لتلبية احتياجات عملائها المتنوعة، وتعمل على
                بناء علاقات طويلة الأمد مع عملائها من خلال توفير حلول مخصصة تلبي احتياجاتهم الفريدة.
              </p>
              <p class="text-gray-500 text-sm md:text-base leading-loose">
                بفضل فريق عمل مؤهل ومدرب على أعلى مستوى، تضمن الشركة تقديم الدعم الفني والاستشارات التقنية التي
                تساعد العملاء على تحقيق أهدافهم بفعالية وكفاءة.
              </p>

              <!-- نقاط تشويقية سريعة -->
              <div class="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                <div v-for="(kpi, ki) in [
                  { num: '+5000', label: 'عميل راضٍ', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { num: '99.9%', label: 'وقت تشغيل', color: 'text-teal-600', bg: 'bg-teal-50' },
                  { num: '24/7', label: 'دعم فني', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                ]" :key="ki"
                  class="flex flex-col items-center justify-center px-3 py-4 rounded-xl text-center transition-transform duration-300 hover:-translate-y-1"
                  :class="kpi.bg"
                >
                  <div class="text-xl md:text-2xl font-black mb-0.5" :class="kpi.color">{{ kpi.num }}</div>
                  <div class="text-xs text-gray-500 font-medium">{{ kpi.label }}</div>
                </div>
              </div>
            </div>

            <!-- الجانب الأيسر: صورة مع بادجات -->
            <div data-reveal data-reveal-dir="left" class="reveal-item reveal-from-left relative mt-8 lg:mt-0">
              <!-- صورة رئيسية -->
              <div class="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src="/images/about/service16.jpeg"
                  alt="مقر شركة التكامل نت"
                  class="w-full h-[280px] md:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent" />
              </div>

              <!-- صورة متداخلة صغيرة يمين-أسفل -->
              <div class="absolute -bottom-5 -right-4 md:-bottom-6 md:-right-6 w-32 h-32 md:w-48 md:h-48 rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10">
                <img
                  src="/images/about/service7.jpeg"
                  alt="بنية تحتية التكامل نت"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- بادج تأسيس -->
              <div class="absolute -top-4 -left-4 md:-top-5 md:-left-5 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-4 flex items-center gap-2 md:gap-3 z-10 border border-indigo-50">
                <div class="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-gradient flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <div>
                  <div class="text-lg md:text-xl font-black text-indigo-700">2023</div>
                  <div class="text-xs text-gray-500 font-medium">سنة التأسيس</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================ -->
      <!-- رؤيتنا ورسالتنا - بطاقتان متوازيتان            -->
      <!-- ================================================ -->
      <section class="py-24 bg-gray-50 relative overflow-hidden">

        <!-- زخرفة خلفية -->
        <div class="absolute inset-0 bg-hero-radial opacity-60" />
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-40" />

        <div class="relative container mx-auto px-4 md:px-8">

          <!-- رأس القسم -->
          <div class="text-center mb-16">
            <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              توجهنا الاستراتيجي
            </span>
            <h2 class="section-title text-4xl md:text-5xl mb-4 leading-normal pb-4 overflow-visible">رؤيتنا ورسالتنا</h2>
            <div class="section-divider mt-5" />
          </div>

          <div class="grid md:grid-cols-2 gap-8">

            <!-- بطاقة الرؤية -->
            <div class="group relative bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover border border-indigo-50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">

              <!-- شريط علوي ملون -->
              <div class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-t-3xl" />

              <!-- أيقونة -->
              <div class="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>

              <h3 class="text-2xl font-black text-gray-900 mb-5 pb-4 overflow-visible">رؤيتنا</h3>

              <p class="text-gray-600 leading-loose text-base">
                تطوير البنية التحتية التقنية والسعي للاستثمار المستمر في تحسين وتوسيع البنية التحتية لضمان تقديم خدمات الإنترنت
                بأعلى مستويات السرعة والاستقرار.
              </p>
              <p class="text-gray-500 leading-loose text-base mt-4">
                حيث يتم السعي باستمرار للابتكار في تقديم منتجات وخدمات جديدة تتماشى مع التطورات التكنولوجية السريعة من خلال
                البحث والتطوير.
              </p>

              <!-- نقاط مميزة -->
              <div class="mt-6 space-y-2">
                <div v-for="point in ['بنية تحتية متوسعة باستمرار', 'خدمة بأعلى سرعة واستقرار', 'بحث وتطوير مستمر']" :key="point"
                  class="flex items-center gap-3">
                  <span class="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span class="text-sm text-gray-600 font-medium">{{ point }}</span>
                </div>
              </div>
            </div>

            <!-- بطاقة الرسالة -->
            <div class="group relative bg-white rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover border border-cyan-50 hover:-translate-y-1 transition-all duration-300 overflow-hidden">

              <!-- شريط علوي ملون -->
              <div class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-3xl" />

              <!-- أيقونة -->
              <div class="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                </svg>
              </div>

              <h3 class="text-2xl font-black text-gray-900 mb-5 pb-4 overflow-visible">رسالتنا</h3>

              <p class="text-gray-600 leading-loose text-base">
                التميز في خدمة العملاء حيث إن العملاء في مقدمة الأولويات، وتوفير تجربة مميزة وشخصية لضمان رضا العملاء الكامل
                لحل مشكلاتهم بسرعة.
              </p>
              <p class="text-gray-500 leading-loose text-base mt-4">
                السعي الدائم لتقديم خدمات إنترنت متميزة تلبي توقعات عملائنا وتعزز من تجربتهم الرقمية، مع الالتزام بأعلى معايير
                الجودة والأمان، وتقديم حلول مخصصة للشركات بمختلف أحجامها.
              </p>

              <!-- نقاط مميزة -->
              <div class="mt-6 space-y-2">
                <div v-for="point in ['العميل في المقدمة دائماً', 'حلول مخصصة لكل حاجة', 'جودة وأمان لا مساومة فيهما']" :key="point"
                  class="flex items-center gap-3">
                  <span class="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </span>
                  <span class="text-sm text-gray-600 font-medium">{{ point }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ================================================ -->
      <!-- قيمنا الجوهرية - شبكة ست بطاقات               -->
      <!-- ================================================ -->
      <section class="py-24 bg-white relative overflow-hidden">

        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-50/60 blur-3xl" />

        <div class="relative container mx-auto px-4 md:px-8">

          <div class="text-center mb-16">
            <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4 pb-4 overflow-visible">
              ما يميزنا
            </span>
            <h2 class="section-title text-4xl md:text-5xl pb-4 overflow-visible">قيمنا الجوهرية</h2>
            <p class="text-gray-500 mt-5 max-w-2xl mx-auto leading-loose">
              التعامل بشفافية ومصداقية مع العملاء، الجودة والتميز والنزاهة والاحترام والمسؤولية هي أساس قيمنا الجوهرية
              في إدارة وتنفيذ أعمالنا.
            </p>
            <div class="section-divider mt-5" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(val, i) in values"
              :key="val.id"
              class="group flex flex-col p-7 rounded-2xl border shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-default"
              :class="[val.border, val.shadow]"
            >
              <!-- رقم ترتيبي -->
              <div class="text-5xl font-black opacity-10 mb-3 leading-none select-none"
                :class="val.color">
                {{ String(i + 1).padStart(2, '0') }}
              </div>

              <!-- أيقونة + عنوان -->
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  :class="val.bg">

                  <!-- Transparency -->
                  <svg v-if="val.id === 'transparency'" class="w-6 h-6" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <!-- Quality -->
                  <svg v-else-if="val.id === 'quality'" class="w-6 h-6" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  <!-- Integrity -->
                  <svg v-else-if="val.id === 'integrity'" class="w-6 h-6" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/>
                  </svg>
                  <!-- Respect -->
                  <svg v-else-if="val.id === 'respect'" class="w-6 h-6" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                  <!-- Responsibility -->
                  <svg v-else-if="val.id === 'responsibility'" class="w-6 h-6" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                  <!-- Innovation -->
                  <svg v-else-if="val.id === 'innovation'" class="w-6 h-6" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>

                <h4 class="text-lg font-black text-gray-900">{{ val.title }}</h4>
              </div>

              <p class="text-gray-500 text-sm leading-relaxed">{{ val.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================ -->
      <!-- إنجاز الاستحواذ على 1ST NET - قسم بارز          -->
      <!-- ================================================ -->
      <section class="py-24 bg-gray-950 relative overflow-hidden">

        <!-- خلفية متوهجة -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl" />
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-cyan-900/20 rounded-full blur-3xl" />
        <div class="absolute inset-0 opacity-5"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 40px 40px;" />

        <div class="relative container mx-auto px-4 md:px-8">

          <!-- رأس القسم -->
          <div class="text-center mb-16">
            <span class="inline-flex items-center gap-2 bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-sm font-bold px-5 py-2 rounded-full mb-5">
              <span class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
              أبرز الإنجازات
            </span>
            <h2 class="text-4xl md:text-5xl font-black text-white mb-4">
              ملامح نجاحنا
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto leading-loose">
              منذ التأسيس، نسعى بخطى راسخة نحو التوسع والريادة في قطاع الاتصالات والإنترنت
            </p>
          </div>

          <!-- بطاقة الإنجاز الكبرى: الاستحواذ على 1ST NET -->
          <div class="relative bg-gradient-to-br from-indigo-900/60 to-slate-900/80 rounded-3xl border border-indigo-700/30 overflow-hidden mb-10">

            <!-- شريط أعلى -->
            <div class="h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500" />

            <div class="grid lg:grid-cols-2 gap-0">

              <!-- النص -->
              <div class="p-10 md:p-14 flex flex-col h-full min-h-[400px]">
                <div class="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                  إنجاز استراتيجي بارز
                </div>

                <h3 class="text-3xl md:text-4xl font-black text-white mb-5 leading-snug">
                  الاستحواذ الرسمي على
                  <span class="text-gradient">شبكة 1ST NET</span>
                </h3>

                <p class="text-gray-300 leading-loose mb-6 text-base">
                  انضمت شبكة <strong class="text-white">1ST NET</strong> رسمياً إلى مجموعة التكامل نت، في خطوة استراتيجية
                  تعزز حضور الشركة وتوسع نطاق تغطيتها ومواردها التقنية. يُعد هذا الاستحواذ إضافة نوعية تمكّن التكامل نت
                  من تقديم خدمات أوسع وأقوى لعملائها.
                </p>

                <div class="flex flex-wrap gap-3">
                  <span class="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-lg">
                    <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    استحواذ رسمي
                  </span>
                  <span class="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-lg">
                    <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    توسع استراتيجي
                  </span>
                  <span class="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-sm px-4 py-2 rounded-lg">
                    <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    دمج شبكات
                  </span>
                </div>

                <!-- فاصل ناعم بين الشارات والخريطة -->
                <div class="mt-8 pt-8 border-t border-indigo-500/15 flex items-center gap-3 mb-6">
                  <div class="h-px flex-grow bg-gradient-to-r from-indigo-500/20 to-transparent"></div>
                  <span class="text-indigo-400/60 text-xs font-semibold tracking-widest uppercase">خريطة التغطية</span>
                  <div class="h-px flex-grow bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
                </div>

                <!-- تصميم خريطة نطاق التغطية -->
                <div class="mt-10 md:mt-auto relative rounded-2xl border border-indigo-500/10 overflow-hidden bg-slate-800/30 group flex-grow min-h-[250px]">
                  <!-- شريطة تعريفية -->
                  <div class="absolute top-4 right-4 z-10 flex items-center gap-2 bg-indigo-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-indigo-500/30 shadow-lg">
                    <span class="relative flex h-2.5 w-2.5">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    <span class="text-xs font-bold text-cyan-100">توسعة نطاق التغطية بطرابلس</span>
                  </div>

                  <!-- صورة الخريطة (SVG) -->
                  <img
                    src="/images/about/tripoli.svg"
                    alt="مخطط أبراج التغطية في طرابلس"
                    class="w-full h-full object-cover object-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                  />

                  <!-- تدرجات لونية لتدمج الخريطة بشكل ساحر مع الخلفية -->
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-60" />
                  <div class="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              <!-- معرض صور الاستحواذ بتصميم احترافي (Premium Grid) -->
              <div class="relative p-5 sm:p-8 md:p-12 flex items-center justify-center bg-slate-900/40 lg:border-r border-indigo-500/10">
                <!-- تأثيرات خلفية ناعمة -->
                <div class="absolute inset-0 opacity-10"
                     style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 24px 24px;">
                </div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full"></div>

                <div class="w-full flex flex-col gap-4 md:gap-5 relative z-10">
                  <!-- الصورة الرئيسية (كبيرة في الأعلى) -->
                  <div class="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] border border-white/10 group">
                    <img
                      :src="galleryImages[0].src"
                      :alt="galleryImages[0].alt"
                      class="w-full h-auto sm:h-[400px] md:h-[500px] object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <!-- تدرج لوني لإبراز النص -->
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    <!-- شارة على الصورة -->
                    <div class="absolute bottom-4 right-4 md:bottom-6 md:right-6 pointer-events-none">
                      <div class="inline-flex items-center gap-2.5 bg-black/40 backdrop-blur-md text-white text-xs md:text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 shadow-lg">
                        <span class="relative flex h-2.5 w-2.5">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                        </span>
                        {{ galleryImages[0].alt }}
                      </div>
                    </div>
                  </div>

                  <!-- الصورتان في الأسفل -->
                  <div class="grid grid-cols-2 gap-4 md:gap-5">
                    <div class="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-white/10 group">
                      <img
                        :src="galleryImages[1].src"
                        :alt="galleryImages[1].alt"
                        class="w-full h-auto sm:h-[250px] object-cover object-[center_top] group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                    </div>
                    <div class="relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-white/10 group">
                      <img
                        :src="galleryImages[2].src"
                        :alt="galleryImages[2].alt"
                        class="w-full h-auto sm:h-[250px] object-cover object-[center_top] group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- شبكة إحصائيات صغيرة -->
          <div class="grid grid-cols-3 gap-4">
            <div v-for="item in [
              { num: '+5000', label: 'عميل راضٍ', sub: 'ونمو مستمر' },
              { num: '24/7', label: 'دعم فني', sub: 'متواصل دون انقطاع' },
              { num: '99.9%', label: 'وقت تشغيل', sub: 'موثوقية عالية' },
            ]" :key="item.num"
              class="text-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors duration-200"
            >
              <div class="text-2xl md:text-2xl font-black text-gradient mb-1">{{ item.num }}</div>
              <div class="text-white font-bold text-sm md:text-base">{{ item.label }}</div>
              <div class="text-gray-500 text-xs mt-1">{{ item.sub }}</div>
            </div>
          </div>

        </div>
      </section>

      <!-- ================================================ -->
      <!-- معرض الصور / الملف المرئي                       -->
      <!-- ================================================ -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4 md:px-8">

          <div class="text-center mb-14">
            <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
              ملفنا المرئي
            </span>
            <h2 class="section-title text-4xl md:text-5xl pb-4 overflow-visible">من الميدان</h2>
            <div class="section-divider mt-5" />
          </div>

          <!-- شبكة صور ديناميكية -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            <div v-for="(img, index) in [
              { src: '/images/about/service1.jpeg',  alt: 'برج اتصالات', span: 'row-span-2' },
              { src: '/images/about/service10.jpeg', alt: 'معدات الشبكة', span: '' },
              { src: '/images/about/service11.jpeg', alt: 'عمل الفني', span: '' },
              { src: '/images/about/service8.jpeg',  alt: 'بنية تحتية', span: 'row-span-2 col-span-1 md:col-span-1' },
              { src: '/images/about/service12.jpeg', alt: 'مشروع ميداني', span: '' },
              { src: '/images/about/service13.jpeg', alt: 'تركيب معدات', span: '' },
              { src: '/images/about/service14.jpeg', alt: 'شبكة انترنت', span: '' },
              { src: '/images/about/service15.jpeg', alt: 'خدمات ميدانية', span: '' },
            ]" :key="index"
              class="group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer"
              :class="img.span"
            >
              <img
                :src="img.src"
                :alt="img.alt"
                class="w-full h-full object-cover min-h-[160px] md:min-h-[180px] group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div class="absolute bottom-0 right-0 left-0 p-3 text-white text-sm font-semibold translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {{ img.alt }}
              </div>
            </div>
          </div>

          <!-- placeholder للصور الحقيقية -->
          <div class="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div v-for="ph in [
              { label: 'صورة: مبنى الشركة الرئيسي', icon: 'building' },
              { label: 'صورة: فريق العمل', icon: 'team' },
              { label: 'صورة: أبراج الاتصالات', icon: 'tower' },
            ]" :key="ph.label"
              class="relative h-48 rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex flex-col items-center justify-center gap-3 text-indigo-400 hover:border-indigo-400 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer group"
            >
              <!-- أيقونة Placeholder -->
              <svg v-if="ph.icon === 'building'" class="w-10 h-10 opacity-50 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              <svg v-else-if="ph.icon === 'team'" class="w-10 h-10 opacity-50 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <svg v-else-if="ph.icon === 'tower'" class="w-10 h-10 opacity-50 group-hover:opacity-70 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>

              <span class="text-xs font-semibold text-center px-3">{{ ph.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================ -->
      <!-- CTA - دعوة للتواصل                             -->
      <!-- ================================================ -->
      <section class="py-24 bg-brand-gradient relative overflow-hidden">

        <div class="absolute inset-0 opacity-10"
          style="background-image: radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 32px 32px;" />
        <div class="absolute top-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />

        <div class="relative container mx-auto px-4 md:px-8 text-center text-white">
          <h2 class="text-4xl md:text-5xl font-black mb-5">
            هل أنت مستعد للانضمام؟
          </h2>
          <p class="text-indigo-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-loose">
            انضم إلى أكثر من 5000 عميل يثقون في خدمات التكامل نت. تواصل معنا اليوم واحصل على أفضل حلول الإنترنت.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/#contact"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-indigo-700 hover:bg-indigo-50 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              تواصل معنا
            </NuxtLink>
            <a
              href="tel:0923339798"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 text-base"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              اتصل بنا مباشرة
            </a>
          </div>
        </div>
      </section>

    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* =========================================
   Scroll Reveal Animation System
   ========================================= */

/* الحالة المبدئية: مخفية ومزاحة */
.reveal-item {
  opacity: 0;
  will-change: opacity, transform;
  transition:
    opacity 0.85s cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 0.85s cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* اتجاهات الدخول */
.reveal-from-right  { transform: translateX(100px);  }
.reveal-from-left   { transform: translateX(-100px); }
.reveal-from-bottom { transform: translateY(100px);  }
.reveal-from-top    { transform: translateY(-100px); }
.reveal-scale       { transform: scale(1.9);        }

/* عند التقاطع مع الشاشة: الحالة النهائية */
.reveal-item.revealed {
  opacity: 1;
  transform: translate(0) scale(1);
}

/* تأخير متدرج للبطاقات في الشبكة (stagger) */
.reveal-item:nth-child(1) { transition-delay: 0.00s; }
.reveal-item:nth-child(2) { transition-delay: 0.12s; }
.reveal-item:nth-child(3) { transition-delay: 0.22s; }
.reveal-item:nth-child(4) { transition-delay: 0.32s; }
.reveal-item:nth-child(5) { transition-delay: 0.42s; }
.reveal-item:nth-child(6) { transition-delay: 0.52s; }

/* hover على بطاقات معرض الصور */
.grid > div {
  transition: transform 1.3s ease, box-shadow 1.3s ease;
}
</style>
