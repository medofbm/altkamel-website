<script setup>
// ✅ AboutSection - النص الرسمي للشركة + قيم الشركة الأربع

const stats = [
  { value: '+5000', label: 'عميل راضٍ' },
  { value: '99.9%', label: 'وقت التشغيل' },
  { value: '+10',   label: 'سنوات خبرة' },
  { value: '24/7',  label: 'دعم فني متواصل' },
]

// قيم الشركة الرسمية الأربع مع أيقونات SVG
const companyValues = [
  {
    id: 'innovation',
    title: 'الابتكار',
    desc: 'نسعى دائماً لتبنّي أحدث التقنيات وتقديم حلول مبتكرة تواكب متطلبات العصر الرقمي.',
    icon: 'lightbulb',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    id: 'quality',
    title: 'الجودة',
    desc: 'نلتزم بأعلى معايير الجودة في تقديم خدماتنا واختيار معداتنا وبنيتنا التحتية.',
    icon: 'star',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    id: 'customer-first',
    title: 'العميل أولاً',
    desc: 'نبني علاقات طويلة الأمد مع عملائنا عبر توفير حلول مخصصة ودعم متواصل.',
    icon: 'heart',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
  },
  {
    id: 'transparency',
    title: 'الشفافية',
    desc: 'نؤمن بالوضوح والصدق في تعاملاتنا مع عملائنا وشركائنا في جميع الأوقات.',
    icon: 'shield-check',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
]
</script>

<template>
  <section id="about" class="py-24 bg-white relative overflow-hidden">

    <!-- زخارف خلفية -->
    <div class="absolute top-0 left-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-70" />
    <div class="absolute bottom-0 right-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-70" />

    <div class="relative container mx-auto px-4 md:px-8">

      <!-- =============================================== -->
      <!-- القسم العلوي: نص + صور                        -->
      <!-- =============================================== -->
      <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">

        <!-- الجانب الأيسر: الصور المتداخلة -->
        <div class="relative order-2 lg:order-1 pb-10 pl-8">

          <!-- الصورة الرئيسية: مبنى الشركة -->
          <div class="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/about/service16.jpeg"
              alt="مبنى شركة التكامل نت"
              class="w-full h-[400px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent" />
          </div>

          <!-- الصورة الصغيرة المتداخلة: برج الاتصالات -->
          <div class="absolute -bottom-2 -right-2 w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="/images/about/service1.jpeg"
              alt="برج اتصالات التكامل نت"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-transparent" />
          </div>

          <!-- شارة الخبرة -->
          <div class="absolute top-6 -left-2 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </div>
            <div>
              <div class="text-xl font-black text-indigo-700">+10</div>
              <div class="text-xs text-gray-500 font-medium">سنوات في السوق</div>
            </div>
          </div>
        </div>

        <!-- الجانب الأيمن: النص التعريفي الرسمي -->
        <div class="order-1 lg:order-2">

          <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-5">
            من نحن
          </span>

          <h2 class="section-title text-4xl md:text-5xl mb-2 leading-normal pb-4 overflow-visible">نبذة عن</h2>
          <h2 class="text-4xl md:text-5xl font-black text-gray-800 mb-6">شركة التكامل نت</h2>
          <div class="w-20 h-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 mb-8" />

          <!-- ✅ النص الرسمي للشركة -->
          <p class="text-gray-600 text-base leading-loose mb-5">
            <strong class="text-indigo-700">شركة التكامل للاتصالات وتقنية المعلومات</strong> هي شركة رائدة في تقديم خدمات الإنترنت، تسعى لتقديم حلول تقنية مبتكرة وخدمات اتصال متطورة للمستخدمين والشركات.
          </p>
          <p class="text-gray-500 text-base leading-loose mb-10">
            تعمل الشركة على بناء علاقات طويلة الأمد مع عملائها من خلال توفير حلول مخصصة بفضل فريق عمل مؤهل ومدرب، يضمن أعلى معايير الجودة والموثوقية في كل خدمة نقدمها.
          </p>

          <!-- إحصائيات -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center p-4 sm:p-5 rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100"
            >
              <div class="text-2xl sm:text-3xl font-black text-gradient mb-1">{{ stat.value }}</div>
              <div class="text-xs sm:text-sm text-gray-500 font-bold">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- =============================================== -->
      <!-- ✅ قسم "قيمنا" الفرعي بالأيقونات              -->
      <!-- =============================================== -->
      <div class="relative">

        <!-- فاصل أنيق -->
        <div class="flex items-center gap-4 mb-12">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent to-indigo-200" />
          <div class="text-center">
            <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-5 py-2 rounded-full">
              قيمنا الجوهرية
            </span>
          </div>
          <div class="flex-1 h-px bg-gradient-to-l from-transparent to-indigo-200" />
        </div>

        <!-- شبكة القيم الأربع -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="val in companyValues"
            :key="val.id"
            class="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100
                   shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          >
            <!-- أيقونة القيمة -->
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              :class="val.bg"
            >
              <!-- الابتكار: لمبة -->
              <svg v-if="val.icon === 'lightbulb'" class="w-7 h-7" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <!-- الجودة: نجمة -->
              <svg v-if="val.icon === 'star'" class="w-7 h-7" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              <!-- العميل أولاً: قلب -->
              <svg v-if="val.icon === 'heart'" class="w-7 h-7" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <!-- الشفافية: درع -->
              <svg v-if="val.icon === 'shield-check'" class="w-7 h-7" :class="val.color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>

            <h4 class="text-lg font-bold text-gray-900 mb-2">{{ val.title }}</h4>
            <p class="text-sm text-gray-500 leading-relaxed">{{ val.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
