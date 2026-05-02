<script setup>
// ✅ ServicesSection - الخدمات بالنصوص الرسمية للشركة

const services = [
  {
    id: 'home-internet',
    title: 'إنترنت المنازل',
    description: 'توفير اتصال سريع وموثوق بالإنترنت للأسر مع خطط متنوعة تناسب جميع الاحتياجات والميزانيات.',
    icon: 'home',
    bgLight: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    gradient: 'from-indigo-500 to-purple-600',
    features: ['سرعات عالية ومستقرة', 'خطط أسعار مرنة', 'دعم فني 24/7'],
  },
  {
    id: 'business-internet',
    title: 'إنترنت الشركات',
    description: 'تقديم حلول مخصصة للشركات بمختلف أحجامها مع ضمان استمرارية الخدمات والأولوية في الدعم الفني.',
    icon: 'building',
    bgLight: 'bg-blue-50',
    iconColor: 'text-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['اتصال مخصص ومضمون', 'SLA موثّق', 'IP ثابت مخصص'],
  },
  {
    id: 'networks',
    title: 'تأسيس وصيانة الشبكات',
    description: 'تصميم، تنفيذ، وصيانة الشبكات الاحترافية للشركات والمؤسسات بدعم فني مستمر وضمان الأداء.',
    icon: 'network',
    bgLight: 'bg-teal-50',
    iconColor: 'text-teal-600',
    gradient: 'from-teal-500 to-cyan-600',
    features: ['تصميم LAN/WAN مخصص', 'أجهزة احترافية', 'صيانة دورية مضمونة'],
  },
  {
    id: 'cybersecurity',
    title: 'الأمن السيبراني',
    description: 'حلول أمنية متكاملة لحماية البيانات والشبكات من التهديدات الرقمية المتطورة.',
    icon: 'shield',
    bgLight: 'bg-violet-50',
    iconColor: 'text-violet-600',
    gradient: 'from-violet-500 to-indigo-600',
    features: ['جدار حماية متقدم', 'مراقبة مستمرة', 'تقارير أمنية دورية'],
  },
]
</script>

<template>
  <section id="services" class="py-24 bg-gray-50/80 relative overflow-hidden">

    <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

    <div class="relative container mx-auto px-4 md:px-8">

      <!-- رأس القسم -->
      <div class="text-center mb-16">
        <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          ما نقدمه لك
        </span>
        <h2 class="section-title text-4xl md:text-5xl mb-4 leading-normal pb-4 overflow-visible">خدماتنا المتكاملة</h2>
        <div class="section-divider" />
        <p class="text-gray-500 text-lg max-w-xl mx-auto mt-6 leading-loose font-medium">
          نقدم مجموعة شاملة من الحلول التقنية لتلبية احتياجاتك الرقمية بأعلى معايير الجودة والاحترافية
        </p>
      </div>

      <!-- بطاقات الخدمات -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <article
          v-for="service in services"
          :key="service.id"
          class="service-card group"
        >
          <!-- طبقة تدرج عند Hover -->
          <div
            class="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
            :class="service.gradient"
          />

          <!-- أيقونة الخدمة -->
          <div
            class="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            :class="service.bgLight"
          >
            <!-- إنترنت المنازل -->
            <svg v-if="service.icon === 'home'" class="w-8 h-8" :class="service.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <!-- إنترنت الشركات -->
            <svg v-if="service.icon === 'building'" class="w-8 h-8" :class="service.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <!-- الشبكات -->
            <svg v-if="service.icon === 'network'" class="w-8 h-8" :class="service.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.143 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
            </svg>
            <!-- الأمن السيبراني -->
            <svg v-if="service.icon === 'shield'" class="w-8 h-8" :class="service.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>

          <!-- المحتوى -->
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition-colors duration-300 leading-snug">
            {{ service.title }}
          </h3>
          <p class="text-gray-500 text-sm leading-loose mb-5">
            {{ service.description }}
          </p>

          <!-- المميزات -->
          <ul class="space-y-2 mb-6">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-center gap-2 text-sm text-gray-600 font-medium"
            >
              <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ feature }}
            </li>
          </ul>

          <a
            href="#contact"
            class="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300"
            :class="service.iconColor"
          >
            <span>اكتشف المزيد</span>
            <svg class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
            </svg>
          </a>
        </article>
      </div>

      <!-- CTA -->
      <div class="text-center mt-14">
        <a href="#contact" class="btn-primary inline-flex">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          تواصل معنا لمعرفة التفاصيل
        </a>
      </div>
    </div>
  </section>
</template>
