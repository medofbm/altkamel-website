<script setup>
// ✅ LiveStreamSection — قسم البث المباشر التسويقي في الصفحة الرئيسية
const WHATSAPP_LINK = 'https://wa.me/218923339798'
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

            <!-- بصمة مائية — أسفل اليسار (لا تعيق النقر) -->
            <div class="absolute z-20 pointer-events-none select-none" style="bottom: 4.5rem; left: 1rem;">
              <div class="flex items-center gap-2 bg-black/25 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10" style="opacity: 0.70;">
                <img src="/images/logo/logo.png" alt="التكامل نت" class="h-6 w-auto drop-shadow-lg" style="filter: brightness(1.3) drop-shadow(0 1px 4px rgba(0,0,0,0.9));" />
                <div class="flex flex-col leading-none">
                  <span class="text-white font-bold text-[11px]">التكامل نت</span>
                  <span class="text-cyan-400 text-[9px]">altkamel.ly</span>
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
                <span class="text-white/60">📺 beIN Sports 1 <span class="text-amber-400 text-xs">(+ beIN 2 قريباً)</span></span>
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
            { icon: '📺', label: 'beIN Sports 1',  color: 'from-blue-500/10 to-blue-600/10 border-blue-500/20 text-blue-400' },
            { icon: '🎯', label: 'جودة HD فائقة',  color: 'from-green-500/10 to-green-600/10 border-green-500/20 text-green-400' },
            { icon: '⚡', label: 'بدون تقطيع',     color: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20 text-yellow-400' },
            { icon: '📱', label: 'كل الأجهزة',     color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400' },
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
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              :href="WHATSAPP_LINK"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              اشترك عبر واتساب
            </a>
            <a
              href="/#packages"
              class="inline-flex items-center gap-2 bg-gradient-to-l from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-900/50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>
              عرض الباقات
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
