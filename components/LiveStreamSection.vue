<script setup>
// ✅ LiveStreamSection — قسم البث المباشر (مبسّط للتحويل إلى المنصة المستقلة)
</script>

<template>
  <section id="live" class="py-12 sm:py-16 relative overflow-hidden">
    <!-- خلفية متدرجة -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950" />
    <!-- كرات ضوء -->
    <div class="absolute top-0 left-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-0 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;" />

    <div class="relative container mx-auto px-4 md:px-8">
      <div class="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
        
        <!-- زخرفة خلفية البطاقة -->
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
        <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />

        <div class="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-6 relative z-10">
          <span class="w-2 h-2 bg-indigo-400 rounded-full animate-ping absolute" />
          <span class="w-2 h-2 bg-indigo-500 rounded-full relative" />
          <span class="text-indigo-300 font-bold text-sm tracking-wide">منصة البث المباشر</span>
        </div>

        <h2 class="text-3xl md:text-5xl font-black text-white mb-4 leading-tight relative z-10">
          <span class="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-indigo-400">
            🏆 كأس العالم 2026
          </span>
        </h2>
        
        <p class="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 relative z-10 leading-relaxed">
          انتقل الآن إلى منصة التكامل نت المخصصة للبث المباشر، واستمتع بمشاهدة المباريات بجودة HD فائقة وبدون تقطيع.
        </p>

        <!-- زر الانتقال الوحيد -->
        <div class="relative z-10 flex justify-center">
          <a
            href="https://tv.altkamel.ly"
            target="_blank"
            class="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105"
            style="background: linear-gradient(135deg, #3820d0 0%, #0094b0 100%); box-shadow: 0 10px 30px rgba(67,56,202,0.4);"
          >
            <span>الانتقال لمنصة البث</span>
            <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  </section>
</template>
