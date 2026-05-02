<script setup>
useHead({ title: 'التكامل نت - خدمات الإنترنت والاتصالات | ليبيا' })
</script>

<template>
  <div class="font-cairo" dir="rtl">
    <AppNavbar />
    <main>
      <HeroSection />
      <ServicesSection />

      <!-- ===== تيزر "نبذة عنا" يشير للصفحة المستقلة ===== -->
      <section class="py-20 bg-gray-50 relative overflow-hidden">
        <div class="absolute inset-0 bg-hero-radial opacity-50" />
        <div class="relative container mx-auto px-4 md:px-8">
          <div class="bg-white rounded-3xl shadow-card border border-indigo-50 p-10 md:p-14 grid md:grid-cols-2 gap-10 items-center">

            <!-- النص -->
            <div>
              <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-5">
                من نحن
              </span>
              <h2 class="section-title text-4xl md:text-5xl mb-2 leading-normal pb-2 overflow-visible">شركة التكامل نت</h2>
              <p class="text-gray-600 text-base leading-loose mb-3">
                <strong class="text-indigo-700">أُنشئت عام 2023</strong>، شركة رائدة في تقديم خدمات الإنترنت والاتصالات، تلتزم بتقديم حلول تقنية مبتكرة وخدمات متطورة للمستخدمين والشركات على حد سواء.
              </p>
              <p class="text-gray-500 text-sm leading-loose mb-8">
                بفريق مؤهل ومدرب، نضمن دعماً فنياً متواصلاً 24/7 وأعلى معايير الجودة والموثوقية.
              </p>
              <div class="flex flex-wrap gap-4">
                <NuxtLink to="/about" class="btn-primary">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  اعرف المزيد عنا
                </NuxtLink>
              </div>
            </div>

            <!-- إحصائيات سريعة -->
            <div class="grid grid-cols-2 gap-4">
              <div v-for="stat in [
                { value: '+5000', label: 'عميل راضٍ', color: 'from-indigo-50 to-blue-50', border: 'border-indigo-100' },
                { value: '99.9%', label: 'وقت التشغيل', color: 'from-teal-50 to-cyan-50', border: 'border-teal-100' },
                { value: '2023', label: 'سنة التأسيس', color: 'from-purple-50 to-indigo-50', border: 'border-purple-100' },
                { value: '24/7', label: 'دعم فني', color: 'from-rose-50 to-pink-50', border: 'border-rose-100' },
              ]" :key="stat.label"
                class="text-center p-5 rounded-xl bg-gradient-to-br border"
                :class="[stat.color, stat.border]"
              >
                <div class="text-2xl font-black text-gradient mb-1">{{ stat.value }}</div>
                <div class="text-xs text-gray-500 font-bold">{{ stat.label }}</div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <!-- ===================================================== -->

      <PackagesSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
