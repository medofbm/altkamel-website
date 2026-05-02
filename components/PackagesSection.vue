<script setup>
// ✅ PackagesSection - معرض باقات تفاعلي
const packages = [
  {
    id: 'pkg-1',
    image: '/images/packages/packfour.jpeg',
    alt: 'باقة إنترنت المنازل الأساسية',
    title: 'الباقة الأساسية',
    tag: 'للمنازل',
    tagColor: 'bg-blue-500',
  },
  {
    id: 'pkg-2',
    image: '/images/packages/packtwo.jpeg',
    alt: 'باقة إنترنت المنازل المتميزة',
    title: 'الباقة المتميزة',
    tag: 'الأكثر طلباً',
    tagColor: 'bg-indigo-600',
  },
  {
    id: 'pkg-4',
    image: '/images/packages/packone.jpeg',
    alt: 'باقة إنترنت الشركات',
    title: 'باقة الأعمال',
    tag: 'للشركات',
    tagColor: 'bg-teal-600',
  },
  {
    id: 'pkg-5',
    image: '/images/packages/packsix.jpeg',
    alt: 'باقة إنترنت الشركات الذهبية',
    title: 'الباقة الذهبية',
    tag: 'VIP',
    tagColor: 'bg-amber-500',
  },
]
</script>

<template>
  <section id="packages" class="py-14 sm:py-24 bg-gray-50/60 relative overflow-hidden">

    <div class="absolute top-1/2 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
    <div class="absolute top-1/2 left-0 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

    <div class="relative container mx-auto px-4 md:px-8">

      <!-- رأس القسم -->
      <div class="text-center mb-10 sm:mb-16">
        <span class="inline-block bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
          اختر ما يناسبك
        </span>
        <h2 class="section-title text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 leading-normal pb-3 sm:pb-4 overflow-visible">باقاتنا المتنوعة</h2>
        <div class="section-divider" />
        <p class="text-gray-500 text-sm sm:text-lg max-w-xl mx-auto mt-4 sm:mt-6 leading-loose font-medium">
          نوفر لك باقات إنترنت متنوعة تلائم جميع الاحتياجات والميزانيات، للمنازل والشركات على حدٍّ سواء
        </p>
      </div>

      <!-- شبكة الباقات التفاعلية -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="group relative rounded-2xl overflow-hidden shadow-card cursor-pointer hover:shadow-card-hover transition-all duration-300"
        >
          <div class="relative overflow-hidden aspect-[3/4] sm:aspect-[3/4] bg-gray-100">
            <img
              :src="pkg.image"
              :alt="pkg.alt"
              class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <span
              class="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
              :class="pkg.tagColor"
            >{{ pkg.tag }}</span>

            <div class="absolute bottom-0 right-0 left-0 p-3 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 class="text-white font-bold text-sm sm:text-xl mb-2 sm:mb-3">{{ pkg.title }}</h3>
              <a
                href="#contact"
                class="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-indigo-700"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                استفسر الآن
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA سفلي -->
      <div class="text-center mt-10 sm:mt-14">
        <p class="text-gray-500 mb-4 sm:mb-5 text-sm sm:text-base">هل تريد باقة مخصصة لاحتياجاتك؟</p>
        <a href="#contact" class="btn-primary inline-flex">
          <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          تواصل معنا لعرض مخصص
        </a>
      </div>
    </div>
  </section>
</template>

