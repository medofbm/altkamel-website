<script setup>
// ✅ LiveStreamSection — قسم البث المباشر التسويقي في الصفحة الرئيسية
</script>

<template>
  <section id="live" class="py-16 sm:py-24 relative overflow-hidden">

    <!-- خلفية متدرجة -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950" />
    <!-- شبكة زخرفية -->
    <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 60px);" />
    <!-- كرات ضوء -->
    <div class="absolute top-1/4 left-10 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s;" />

    <div class="relative container mx-auto px-4 md:px-8">

      <!-- رأس القسم -->
      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-5 py-2 mb-5">
          <span class="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
          <span class="w-2.5 h-2.5 bg-red-500 rounded-full absolute" />
          <span class="text-red-400 font-bold text-sm">مباشر الآن</span>
        </div>

        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          <span class="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-blue-400 to-purple-400">
            🏆 كأس العالم 2026
          </span>
          <br />
          <span class="text-white">مباشرةً على شبكتنا</span>
        </h2>
        <p class="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          استمتع بمشاهدة مباريات كأس العالم بجودة HD فائقة وبدون تقطيع، حصرياً لمشتركي شبكة التكامل نت.
        </p>
      </div>

      <!-- بطاقة المشغّل التشويقية -->
      <div class="max-w-5xl mx-auto">
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

          <!-- معاينة المشغل (صورة ثابتة مع أيقونة play) -->
          <div class="relative aspect-video bg-gray-900 group">
            <!-- خلفية متدرجة تحاكي شاشة مشغل -->
            <div class="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center">
              <!-- أيقونة ملعب كرة قدم مبسطة -->
              <div class="absolute inset-0 opacity-10">
                <div class="w-full h-full flex items-center justify-center">
                  <div class="w-2/3 h-2/3 border-2 border-white rounded-lg relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t-2 border-white opacity-50" />
                    </div>
                    <div class="absolute inset-y-0 left-1/2 -translate-x-1/2">
                      <div class="w-24 h-24 border-2 border-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- تأثير بث حي -->
              <div class="relative text-center z-10">
                <div class="w-24 h-24 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 hover:bg-white/20 cursor-pointer">
                  <svg class="w-12 h-12 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p class="text-white font-bold text-xl mb-1">⚽ beIN Sports 1</p>
                <div class="flex items-center justify-center gap-2">
                  <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span class="text-red-400 font-bold text-sm">LIVE</span>
                  <span class="text-white/40 text-sm">· HD جودة عالية</span>
                </div>
              </div>
            </div>

            <!-- بصمة مائية تظهر على المعاينة -->
            <div class="absolute top-4 left-4 z-20">
              <div class="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                <img src="/images/logo/logo.png" alt="التكامل نت" class="h-7 w-auto opacity-80" style="filter: brightness(1.2) drop-shadow(0 1px 3px rgba(0,0,0,0.8));" />
                <div class="flex flex-col leading-none">
                  <span class="text-white/80 font-bold text-xs">التكامل نت</span>
                  <span class="text-cyan-400/80 text-[9px]">altkamel.ly</span>
                </div>
              </div>
            </div>

            <!-- شارة LIVE أعلى اليمين -->
            <div class="absolute top-4 right-4 z-20 flex items-center gap-2 bg-red-600/80 backdrop-blur-sm border border-red-500/30 rounded-full px-3 py-1.5">
              <span class="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span class="text-white font-black text-xs">مباشر</span>
            </div>

            <!-- رابط الانتقال للصفحة -->
            <NuxtLink
              to="/live"
              class="absolute inset-0 z-30"
              aria-label="شاهد البث المباشر"
            />
          </div>

          <!-- شريط معلومات أسفل المعاينة -->
          <div class="bg-gray-900/80 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-white font-bold text-lg mb-1 flex items-center gap-2">
                🏆 كأس العالم — FIFA World Cup 2026
              </h3>
              <div class="flex flex-wrap items-center gap-3 text-sm">
                <span class="flex items-center gap-1 text-green-400">
                  <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  بث مباشر
                </span>
                <span class="text-white/40">|</span>
                <span class="text-white/60">📺 beIN Sports 1, 2, 3</span>
                <span class="text-white/40">|</span>
                <span class="text-white/60">🎯 جودة HD</span>
              </div>
            </div>
            <NuxtLink
              to="/live"
              class="flex-shrink-0 inline-flex items-center gap-2 bg-gradient-to-l from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-black px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-900/50"
            >
              <span class="w-2 h-2 bg-white rounded-full animate-pulse" />
              شاهد الآن
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- ميزات البث -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div v-for="feat in [
            { icon: '📺', label: '3 قنوات رياضية', color: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400' },
            { icon: '🎯', label: 'جودة HD فائقة', color: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-400' },
            { icon: '⚡', label: 'بدون تقطيع', color: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20 text-yellow-400' },
            { icon: '📱', label: 'كل الأجهزة', color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400' },
          ]" :key="feat.label"
            class="bg-gradient-to-br border rounded-xl p-3 text-center hover:scale-[1.03] transition-transform duration-200"
            :class="feat.color"
          >
            <div class="text-2xl mb-1">{{ feat.icon }}</div>
            <div class="font-bold text-xs text-white">{{ feat.label }}</div>
          </div>
        </div>

        <!-- CTA للاشتراك -->
        <div class="mt-8 text-center">
          <p class="text-white/40 text-sm mb-4">
            🔒 خدمة البث حصرية لمشتركي شبكة التكامل نت
          </p>
          <a
            href="/#contact"
            class="inline-flex items-center gap-2 bg-gradient-to-l from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-900/50"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
            </svg>
            اشترك الآن للاستمتاع بالبث
          </a>
        </div>
      </div>

    </div>
  </section>
</template>
