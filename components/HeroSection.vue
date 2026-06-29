<script setup>
// ✅ HeroSection - القسم الترحيبي مع بيانات الشركة الليبية
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">

    <div class="absolute inset-0 bg-brand-gradient" />

    <!-- شبكة تقنية شفافة -->
    <div
      class="absolute inset-0 opacity-10"
      style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
    />

    <!-- كرات ضوء -->
    <div class="absolute top-1/4 right-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-float" />
    <div class="absolute bottom-1/4 left-10 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-float" style="animation-delay: -3s;" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />

    <div class="relative z-10 container mx-auto px-4 md:px-8 text-center text-white pt-36 md:pt-24 lg:pt-0">

      <!-- شارة الموقع -->
      <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-up">
        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span class="text-sm font-semibold text-white/90">خدمات الإنترنت والاتصالات في ليبيا</span>
      </div>

      <!-- العنوان الرئيسي -->
      <h1 class="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-5 animate-fade-up animate-delay-100">
        <span class="block mb-1">شركة التكامل نت</span>
        <span class="block text-transparent bg-clip-text bg-gradient-to-l from-cyan-300 via-blue-200 to-white leading-normal pb-3 overflow-visible text-2xl md:text-4xl lg:text-5xl">
          للاتصالات وتقنية المعلومات
        </span>
      </h1>

      <!-- النص الفرعي -->
      <p class="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-loose font-medium animate-fade-up animate-delay-200">
        نقدم حلولاً تقنية مبتكرة وخدمات اتصال متطورة للمستخدمين والشركات.
        <br class="hidden sm:block" />
        اتصال موثوق · دعم متواصل · شبكات احترافية.
      </p>

      <!-- أزرار CTA -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
        <!-- زر البث المباشر — كأس العالم 2026 -->
        <a
          href="https://tv.altkamel.ly"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-base bg-gradient-to-l from-red-600 to-pink-600 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 w-full sm:w-auto justify-center border border-white/10"
        >
          <span class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 bg-white rounded-full animate-ping absolute" />
            <span class="w-2.5 h-2.5 bg-white rounded-full relative" />
          </span>
          🏆 بث مباشر — كأس العالم
        </a>
        <!-- زر تعبئة الرصيد الرئيسي -->
        <NuxtLink
          to="/portal/login"
          class="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-base bg-white text-indigo-700 shadow-xl hover:bg-gray-50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 w-full sm:w-auto justify-center"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
          تعبئة الرصيد
        </NuxtLink>
        <!-- زر استعراض الخدمات -->
        <a
          href="#services"
          class="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-base text-white border-2 border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto justify-center"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
          استعرض خدماتنا
        </a>
      </div>

      <!-- إحصائيات -->
      <div class="grid grid-cols-3 gap-3 sm:gap-6 max-w-sm sm:max-w-2xl mx-auto mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-white/20 animate-fade-up animate-delay-400">
        <div class="text-center">
          <div class="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1">+5000</div>
          <div class="text-[10px] sm:text-sm text-white/70 font-medium">عميل راضٍ</div>
        </div>
        <div class="text-center border-x border-white/20">
          <div class="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1">99.9%</div>
          <div class="text-[10px] sm:text-sm text-white/70 font-medium">وقت التشغيل</div>
        </div>
        <div class="text-center">
          <div class="text-xl sm:text-3xl md:text-4xl font-black text-white mb-1">24/7</div>
          <div class="text-[10px] sm:text-sm text-white/70 font-medium">دعم فني</div>
        </div>
      </div>
    </div>

    <!-- سهم النزول -->
    <a href="#services" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-200 animate-bounce" aria-label="التمرير لأسفل">
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </a>

    <!-- موجة انتقالية -->
    <div class="absolute bottom-0 right-0 left-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z" fill="white"/>
      </svg>
    </div>
  </section>
</template>
