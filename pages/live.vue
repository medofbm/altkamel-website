<script setup>
// ✅ صفحة البث المباشر — كأس العالم 2026 — شبكة التكامل نت
import { ref, onMounted, onUnmounted } from 'vue'

useSeoMeta({
  title: 'البث المباشر — كأس العالم 2026 | التكامل نت',
  description: 'شاهد مباريات كأس العالم 2026 بثاً مباشراً وحصرياً عبر شبكة التكامل نت — جودة HD بدون انقطاع.',
  ogTitle: 'البث المباشر — كأس العالم 2026 | التكامل نت',
  ogDescription: 'مباريات كأس العالم 2026 مباشرةً على شبكة التكامل نت. جودة HD ودعم فني 24/7.',
  ogImage: 'https://altkamel.ly/images/og-image.jpg',
  ogUrl: 'https://altkamel.ly/live',
  ogType: 'website',
})

// ────────────────────────────────────────────────────────
// بيانات الشركة الحقيقية
// ────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '218923339798'
const PHONE_NUMBER    = '+218923339798'
const WHATSAPP_LINK   = `https://wa.me/${WHATSAPP_NUMBER}`
const PHONE_LINK      = `tel:${PHONE_NUMBER}`

// ────────────────────────────────────────────────────────
// حالة المشغّل
// ────────────────────────────────────────────────────────
const videoRef        = ref(null)
const playerContainer = ref(null)
const isLoading       = ref(true)
const isError         = ref(false)
const errorType       = ref('generic') // 'generic' | 'mixed-content'
const isPlaying       = ref(false)
const isMuted         = ref(false)
const isFullscreen    = ref(false)
const volume          = ref(1)
const showControls    = ref(true)
const showVolumeSlider = ref(false)
let hlsInstance   = null
let controlsTimer = null
let retryCount    = 0
const MAX_RETRIES  = 3

// ────────────────────────────────────────────────────────
// قائمة القنوات (قناتان فقط — الثانية Coming Soon)
// ────────────────────────────────────────────────────────
const channels = [
  {
    id: 'bein1',
    name: 'beIN Sports 1',
    label: 'بي إن 1',
    url: 'http://172.16.6.102/altkamel-playlist/bein1.m3u8',
    emoji: '⚽',
    disabled: false,
  },
  {
    id: 'bein2',
    name: 'beIN Sports 2',
    label: 'بي إن 2',
    url: 'http://172.16.6.102/altkamel-playlist/bein2.m3u8',
    emoji: '🏆',
    disabled: true,
    badge: 'قريباً',
  },
]
const activeChannel = ref(channels[0])

// ────────────────────────────────────────────────────────
// إحصائيات البث (ديناميكية للعرض)
// ────────────────────────────────────────────────────────
const liveStats = ref({
  viewers: Math.floor(Math.random() * 900) + 100,
  quality: 'HD',
})
let statsInterval = null

// ────────────────────────────────────────────────────────
// كشف Mixed Content: هل الموقع https بينما الرابط http؟
// ────────────────────────────────────────────────────────
function isMixedContentBlocked(url) {
  if (typeof window === 'undefined') return false
  return (
    window.location.protocol === 'https:' &&
    url.startsWith('http://')
  )
}

// ────────────────────────────────────────────────────────
// تشغيل HLS مع Fallback كامل
// ────────────────────────────────────────────────────────
function startHls(url) {
  if (!videoRef.value) return
  isLoading.value  = true
  isError.value    = false
  errorType.value  = 'generic'

  // ── كشف Mixed Content مبكراً ──
  if (isMixedContentBlocked(url)) {
    isLoading.value = false
    isError.value   = true
    errorType.value = 'mixed-content'
    return
  }

  import('hls.js').then(({ default: Hls }) => {
    // تنظيف أي instance سابق
    if (hlsInstance) {
      hlsInstance.destroy()
      hlsInstance = null
    }

    // ── Fallback 1: hls.js (Chrome / Firefox / Android / Smart TV) ──
    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        enableWorker:           true,
        lowLatencyMode:         true,
        backBufferLength:       90,
        maxBufferLength:        30,
        maxMaxBufferLength:     60,
        maxLoadingDelay:        4,
        startLevel:             -1,
        abrEwmaDefaultEstimate: 2_000_000,
        // منع أخطاء CORS أثناء التحميل
        xhrSetup(xhr) {
          xhr.withCredentials = false
        },
      })

      hlsInstance.loadSource(url)
      hlsInstance.attachMedia(videoRef.value)

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        isLoading.value = false
        retryCount      = 0
        videoRef.value.play()
          .then(() => { isPlaying.value = true })
          .catch(() => { /* autoplay محظور — الزر يظهر تلقائياً */ })
      })

      hlsInstance.on(Hls.Events.ERROR, (_event, data) => {
        if (!data.fatal) return
        // إعادة المحاولة تلقائية حتى MAX_RETRIES مرات
        if (retryCount < MAX_RETRIES) {
          retryCount++
          hlsInstance.destroy()
          hlsInstance = null
          setTimeout(() => startHls(url), 1500 * retryCount)
        } else {
          isLoading.value = false
          isError.value   = true

          // هل الخطأ بسبب Mixed Content؟ نكشفه من الـ details
          if (
            data.details === Hls.ErrorDetails?.MANIFEST_LOAD_ERROR ||
            data.details === Hls.ErrorDetails?.FRAG_LOAD_ERROR
          ) {
            errorType.value = isMixedContentBlocked(url) ? 'mixed-content' : 'generic'
          }
        }
      })

    // ── Fallback 2: Safari / iOS Native HLS ──
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.value.src = url

      const onMeta = () => {
        isLoading.value = false
        videoRef.value.play().catch(() => {})
      }
      const onErr = () => {
        videoRef.value.removeEventListener('loadedmetadata', onMeta)
        // Safari يطرح خطأ MEDIA_ERR_SRC_NOT_SUPPORTED عند Mixed Content
        const isBlocked = isMixedContentBlocked(url)
        isLoading.value = false
        isError.value   = true
        errorType.value = isBlocked ? 'mixed-content' : 'generic'
      }

      videoRef.value.addEventListener('loadedmetadata', onMeta, { once: true })
      videoRef.value.addEventListener('error',          onErr,  { once: true })

    // ── لا يوجد دعم HLS إطلاقاً ──
    } else {
      isLoading.value = false
      isError.value   = true
    }
  })
}

function switchChannel(ch) {
  if (ch.disabled) return
  activeChannel.value = ch
  isPlaying.value     = false
  retryCount          = 0
  startHls(ch.url)
}

function togglePlay() {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPlaying.value = true
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

function toggleMute() {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
}

function setVolume(v) {
  volume.value = v
  if (videoRef.value) {
    videoRef.value.volume = v
    isMuted.value = v === 0
  }
}

function toggleFullscreen() {
  const el = playerContainer.value
  if (!document.fullscreenElement) {
    el.requestFullscreen?.()
      || el.webkitRequestFullscreen?.()
      || el.mozRequestFullScreen?.()
    isFullscreen.value = true
    if (screen?.orientation?.lock) {
      screen.orientation.lock('landscape').catch(() => {})
    }
  } else {
    document.exitFullscreen?.() || document.webkitExitFullscreen?.()
    isFullscreen.value = false
  }
}

function retryStream() {
  retryCount = 0
  isError.value = false
  startHls(activeChannel.value.url)
}

function resetControlsTimer() {
  showControls.value = true
  clearTimeout(controlsTimer)
  controlsTimer = setTimeout(() => {
    if (isPlaying.value) showControls.value = false
  }, 3500)
}

onMounted(() => {
  startHls(activeChannel.value.url)

  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })

  statsInterval = setInterval(() => {
    liveStats.value.viewers += Math.floor(Math.random() * 21) - 10
    if (liveStats.value.viewers < 50) liveStats.value.viewers = 50
  }, 8000)
})

onUnmounted(() => {
  if (hlsInstance) hlsInstance.destroy()
  clearTimeout(controlsTimer)
  clearInterval(statsInterval)
})
</script>

<template>
  <!--
    upgrade-insecure-requests: يطلب من المتصفح ترقية طلبات http → https
    تلقائياً حيث يدعمها السيرفر. لا يحل مشكلة رابط شبكة داخلية،
    لكنه أفضل ممارسة عامة. الحل الحقيقي هو Reverse Proxy من السيرفر.
  -->
  <Head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
  </Head>

  <div class="min-h-screen bg-gray-950 font-cairo" dir="rtl">

    <!-- ─── Navbar ─── -->
    <header class="bg-gray-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <nav class="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-9 w-auto" />
          <div class="flex flex-col leading-tight">
            <span class="font-extrabold text-base text-white">التكامل نت</span>
            <span class="text-xs text-cyan-400">للاتصالات وتقنية المعلومات</span>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-1.5">
            <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span class="text-red-400 font-bold text-sm">مباشر</span>
          </div>
          <NuxtLink to="/" class="text-white/60 hover:text-white transition-colors text-sm font-medium">
            ← العودة للرئيسية
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-2 md:px-6 lg:px-8 py-4 md:py-6">

      <!-- ─── عنوان + إحصائيات ─── -->
      <div class="mb-4 md:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl md:text-3xl font-black text-white mb-1">
            <span class="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500">
              🏆 كأس العالم 2026
            </span>
          </h1>
          <p class="text-white/50 text-sm">بث مباشر حصري لمشتركي شبكة التكامل نت</p>
        </div>
        <div class="flex items-center gap-3 text-xs">
          <div class="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <span class="text-green-400">👁</span>
            <span class="text-white/70">{{ liveStats.viewers.toLocaleString('ar') }} مشاهد</span>
          </div>
          <div class="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <span class="text-blue-400">📶</span>
            <span class="text-white/70">{{ liveStats.quality }}</span>
          </div>
        </div>
      </div>

      <!-- ─── تخطيط رئيسي ─── -->
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 md:gap-6">

        <!-- ════════════════ عمود المشغّل ════════════════ -->
        <div class="space-y-4">

          <!-- مشغّل الفيديو -->
          <div
            ref="playerContainer"
            id="video-player"
            class="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl group cursor-pointer select-none"
            @mousemove="resetControlsTimer"
            @touchstart="resetControlsTimer"
            @click="togglePlay"
          >
            <!-- عنصر الفيديو -->
            <video
              ref="videoRef"
              class="w-full h-full object-contain"
              playsinline
              webkit-playsinline
              :muted="isMuted"
              preload="auto"
            />

            <!-- ═══════════════════════════════════════════════
                 البصمة المائية — أسفل اليسار
                 • pointer-events-none → لا تعيق أي نقر
                 • z-20 → فوق الفيديو لكن تحت أشرطة التحكم (z-30)
                 • bottom-16 → فوق شريط التحكم بما يكفي
                 ═══════════════════════════════════════════════ -->
            <div
              class="absolute bottom-16 left-4 z-20 pointer-events-none select-none"
              style="bottom: 4.5rem;"
            >
              <div class="flex items-center gap-2 bg-black/25 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/8"
                   style="opacity: 0.70;">
                <img
                  src="/images/logo/logo.png"
                  alt="التكامل نت"
                  class="h-6 w-auto drop-shadow-lg"
                  style="filter: brightness(1.3) drop-shadow(0 1px 4px rgba(0,0,0,0.9));"
                />
                <div class="flex flex-col leading-none">
                  <span class="text-white font-bold text-[11px] drop-shadow">التكامل نت</span>
                  <span class="text-cyan-400 text-[9px] font-medium">altkamel.ly</span>
                </div>
              </div>
            </div>

            <!-- حالة التحميل -->
            <div v-if="isLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
              <div class="relative mb-4">
                <div class="w-16 h-16 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl">⚽</span>
                </div>
              </div>
              <p class="text-white font-bold text-base mb-1">جارٍ تحميل البث...</p>
              <p class="text-white/50 text-sm">{{ activeChannel.label }}</p>
            </div>

            <!-- ═══════════════════════════════════════════════
                 حالة الخطأ — نوعان:
                 1) mixed-content → رسالة واضحة مع حل بديل
                 2) generic → إعادة المحاولة
                 ═══════════════════════════════════════════════ -->
            <div v-else-if="isError" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/95 z-10 px-6 text-center">

              <!-- Mixed Content Error -->
              <template v-if="errorType === 'mixed-content'">
                <div class="text-5xl mb-4">🔒</div>
                <p class="text-white font-black text-lg mb-2">يتطلب اتصالاً داخلياً بالشبكة</p>
                <p class="text-white/60 text-sm mb-4 max-w-sm leading-relaxed">
                  البث متاح فقط عبر شبكة التكامل نت الداخلية. إذا كنت متصلاً بالشبكة، جرّب فتح الصفحة عبر
                  <span class="font-bold text-cyan-400">HTTP</span>
                  أو تواصل مع الدعم الفني.
                </p>
                <!-- رابط HTTP كحل مؤقت -->
                <a
                  href="http://altkamel.ly/live"
                  @click.stop
                  class="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors mb-3 text-sm"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                  فتح عبر HTTP
                </a>
                <div class="flex items-center gap-3 mt-1">
                  <a
                    :href="WHATSAPP_LINK"
                    target="_blank"
                    rel="noopener"
                    @click.stop
                    class="flex items-center gap-2 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 text-green-400 font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                  >
                    واتساب الدعم الفني
                  </a>
                  <button
                    @click.stop="retryStream"
                    class="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </template>

              <!-- Generic Error -->
              <template v-else>
                <div class="text-5xl mb-4">📡</div>
                <p class="text-white font-bold text-lg mb-2">تعذّر الاتصال بالبث</p>
                <p class="text-white/50 text-sm mb-6 max-w-xs">
                  تأكد من اتصالك بشبكة التكامل نت الداخلية ثم أعد المحاولة
                </p>
                <div class="flex items-center gap-3">
                  <button
                    @click.stop="retryStream"
                    class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    إعادة المحاولة
                  </button>
                  <a
                    :href="WHATSAPP_LINK"
                    target="_blank"
                    rel="noopener"
                    @click.stop
                    class="flex items-center gap-2 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 text-green-400 font-bold px-4 py-3 rounded-xl transition-colors text-sm"
                  >
                    دعم فني
                  </a>
                </div>
              </template>
            </div>

            <!-- أيقونة Play وسط الشاشة -->
            <Transition name="fade-icon">
              <div
                v-if="!isLoading && !isError && !isPlaying"
                class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </Transition>

            <!-- أدوات التحكم السفلية (z-30 — فوق البصمة) -->
            <Transition name="controls-fade">
              <div
                v-if="showControls && !isLoading && !isError"
                class="absolute bottom-0 right-0 left-0 z-30 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10 pb-3 px-4"
                @click.stop
              >
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-white font-bold text-sm">{{ activeChannel.emoji }} {{ activeChannel.label }}</span>
                  <span class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <!-- تشغيل/إيقاف -->
                  <button @click="togglePlay" class="text-white hover:text-cyan-400 transition-colors" aria-label="تشغيل/إيقاف">
                    <svg v-if="!isPlaying" class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg v-else class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  </button>

                  <!-- الصوت -->
                  <div class="flex items-center gap-2" @mouseenter="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
                    <button @click="toggleMute" class="text-white hover:text-cyan-400 transition-colors" aria-label="كتم/تفعيل الصوت">
                      <svg v-if="!isMuted && volume > 0" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                      </svg>
                      <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    </button>
                    <Transition name="slide-volume">
                      <input
                        v-if="showVolumeSlider"
                        type="range" min="0" max="1" step="0.05"
                        :value="volume"
                        @input="setVolume(+$event.target.value)"
                        class="w-20 accent-cyan-400 cursor-pointer"
                        @click.stop
                      />
                    </Transition>
                  </div>

                  <div class="flex-1" />

                  <!-- تكبير -->
                  <button @click="toggleFullscreen" class="text-white hover:text-cyan-400 transition-colors" aria-label="تكبير/تصغير">
                    <svg v-if="!isFullscreen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                    </svg>
                    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <!-- ═══════════════════════════════════
               اختيار القناة — قناتان فقط
               ═══════════════════════════════════ -->
          <div class="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <button
              v-for="ch in channels"
              :key="ch.id"
              :disabled="ch.disabled"
              @click="switchChannel(ch)"
              class="relative flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 border"
              :class="[
                ch.disabled
                  ? 'bg-white/3 border-white/5 text-white/30 cursor-not-allowed opacity-60'
                  : activeChannel.id === ch.id
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              <span>{{ ch.emoji }}</span>
              <span>{{ ch.label }}</span>

              <!-- نقطة مباشر للقناة النشطة -->
              <span
                v-if="!ch.disabled && activeChannel.id === ch.id"
                class="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"
              />

              <!-- شارة Coming Soon للقناة المعطّلة -->
              <span
                v-if="ch.disabled"
                class="absolute -top-2 -left-1 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none"
              >
                {{ ch.badge }}
              </span>
            </button>
          </div>

          <!-- ═══════════════════════════════════
               إعلان أسفل المشغّل — باقات الإنترنت
               ═══════════════════════════════════ -->
          <div class="bg-gradient-to-l from-indigo-900/60 to-purple-900/60 border border-indigo-500/20 rounded-2xl p-4 backdrop-blur-sm">
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">عرض خاص</span>
                  <span class="text-white/40 text-xs">لمشتركي كأس العالم 2026</span>
                </div>
                <p class="text-white font-bold text-base leading-snug">
                  استمتع بسرعات خارقة وبث HD لا ينقطع — باقات الإنترنت من التكامل نت
                </p>
                <div class="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-white/50">
                  <span>🏠 أساسية: 10 ميجا</span>
                  <span>⭐ متميزة: 25 ميجا</span>
                  <span>🏢 أعمال: 50+ ميجا</span>
                </div>
                <p class="text-white/40 text-xs mt-1">دعم فني 24/7 · تركيب مجاني · أسعار تنافسية</p>
              </div>
              <div class="flex flex-col gap-2 flex-shrink-0">
                <a
                  :href="WHATSAPP_LINK"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm whitespace-nowrap"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  واتساب
                </a>
                <a
                  href="/#packages"
                  class="inline-flex items-center gap-2 bg-gradient-to-l from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm whitespace-nowrap"
                >
                  اكتشف الباقات
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- ════════════════ الشريط الجانبي ════════════════ -->
        <aside class="space-y-4">

          <!-- بطاقة الباقات -->
          <div class="bg-gradient-to-br from-indigo-900/80 to-purple-950/80 border border-indigo-500/20 rounded-2xl p-5 backdrop-blur-sm">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                </svg>
              </div>
              <div>
                <h3 class="text-white font-bold text-base">باقات الإنترنت</h3>
                <p class="text-white/50 text-xs">للمنازل والشركات · اتصل للسعر</p>
              </div>
            </div>

            <div class="space-y-2.5 mb-4">
              <div
                v-for="pkg in [
                  { name: 'الباقة الأساسية',  speed: '10 ميجا',  desc: 'مثالية للمنازل',     icon: '🏠', color: 'from-blue-500/10   to-blue-600/10   border-blue-500/20'   },
                  { name: 'الباقة المتميزة',   speed: '25 ميجا',  desc: 'الأكثر طلباً',       icon: '⭐', color: 'from-indigo-500/10 to-indigo-600/10 border-indigo-500/20' },
                  { name: 'باقة الأعمال',      speed: '50+ ميجا', desc: 'للشركات والمكاتب',  icon: '🏢', color: 'from-purple-500/10 to-purple-600/10 border-purple-500/20' },
                ]"
                :key="pkg.name"
                class="flex items-center gap-3 bg-gradient-to-l rounded-xl p-3 border"
                :class="pkg.color"
              >
                <span class="text-xl">{{ pkg.icon }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-white font-bold text-sm truncate">{{ pkg.name }}</p>
                  <p class="text-white/50 text-xs">{{ pkg.speed }} — {{ pkg.desc }}</p>
                </div>
                <a :href="WHATSAPP_LINK" target="_blank" rel="noopener" class="text-cyan-400 text-xs font-bold hover:text-cyan-300 transition-colors whitespace-nowrap">استفسر</a>
              </div>
            </div>

            <a
              href="/#packages"
              class="flex items-center justify-center gap-2 w-full bg-gradient-to-l from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm hover:shadow-lg hover:shadow-indigo-900/50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              عرض جميع الباقات
            </a>
          </div>

          <!-- بطاقة التواصل السريع (بيانات حقيقية) -->
          <div class="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 class="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <span class="text-lg">💬</span>
              تواصل مع الدعم الفني
            </h3>
            <div class="space-y-2">
              <a
                :href="WHATSAPP_LINK"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-3 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 rounded-xl p-3 transition-colors group"
              >
                <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <span class="text-green-400 font-bold text-sm group-hover:text-green-300 block">واتساب</span>
                  <span class="text-white/40 text-xs">{{ PHONE_NUMBER }}</span>
                </div>
              </a>
              <a
                :href="PHONE_LINK"
                class="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 rounded-xl p-3 transition-colors group"
              >
                <svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <span class="text-blue-400 font-bold text-sm group-hover:text-blue-300 block">اتصل بنا</span>
                  <span class="text-white/40 text-xs">{{ PHONE_NUMBER }}</span>
                </div>
              </a>
            </div>
          </div>

          <!-- بطاقة حالة البث -->
          <div class="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
            <h3 class="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <span class="text-lg">📡</span>
              حالة البث الآن
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                <div class="text-green-400 font-black text-lg">HD</div>
                <div class="text-white/50 text-xs mt-0.5">جودة البث</div>
              </div>
              <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                <div class="text-blue-400 font-black text-sm">منخفض</div>
                <div class="text-white/50 text-xs mt-0.5">التأخير</div>
              </div>
              <div class="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-center">
                <div class="text-indigo-400 font-black text-sm">مباشر</div>
                <div class="text-white/50 text-xs mt-0.5">نوع البث</div>
              </div>
              <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 text-center">
                <div class="text-cyan-400 font-black text-lg">{{ liveStats.viewers }}</div>
                <div class="text-white/50 text-xs mt-0.5">مشاهد</div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      <!-- ═══════════════════════════════════
           قسم إعلاني سفلي
           ═══════════════════════════════════ -->
      <section class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="feat in [
            { icon: '⚡', title: 'سرعة خارقة',   desc: 'إنترنت فائق السرعة يضمن بثاً سلساً بدون تقطيع',               color: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20' },
            { icon: '🛡️', title: 'شبكة موثوقة',  desc: 'بنية تحتية متطورة وضمان استمرارية الخدمة 24/7',              color: 'from-green-500/10  to-teal-500/10  border-green-500/20'  },
            { icon: '💰', title: 'أسعار منافسة', desc: 'باقات 10 و25 و50+ ميجا تناسب المنازل والشركات بأسعار مناسبة', color: 'from-purple-500/10 to-pink-500/10  border-purple-500/20' },
          ]"
          :key="feat.title"
          class="bg-gradient-to-br border rounded-2xl p-5 flex items-start gap-4 hover:scale-[1.02] transition-transform duration-200 cursor-default"
          :class="feat.color"
        >
          <span class="text-3xl flex-shrink-0">{{ feat.icon }}</span>
          <div>
            <h4 class="text-white font-bold text-sm mb-1">{{ feat.title }}</h4>
            <p class="text-white/50 text-xs leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </section>

      <!-- CTA اشتراك -->
      <div class="mt-6 text-center">
        <a
          :href="WHATSAPP_LINK"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-3 bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/50 text-base"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          اشترك الآن عبر واتساب
        </a>
      </div>

    </main>

    <!-- فوتر مبسط -->
    <footer class="mt-12 border-t border-white/5 bg-gray-900/50 py-6">
      <div class="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
        <div class="flex items-center gap-2">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-6 w-auto opacity-60" />
          <span>© 2026 شركة التكامل نت للاتصالات وتقنية المعلومات</span>
        </div>
        <p class="text-xs">البث مخصص لمشتركي شبكة التكامل نت الداخلية فقط</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fade-icon-enter-active,
.fade-icon-leave-active { transition: opacity 0.3s ease; }
.fade-icon-enter-from,
.fade-icon-leave-to { opacity: 0; }

.controls-fade-enter-active,
.controls-fade-leave-active { transition: opacity 0.4s ease; }
.controls-fade-enter-from,
.controls-fade-leave-to { opacity: 0; }

.slide-volume-enter-active,
.slide-volume-leave-active { transition: all 0.2s ease; }
.slide-volume-enter-from,
.slide-volume-leave-to { opacity: 0; width: 0; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
