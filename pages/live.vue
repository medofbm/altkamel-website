<script setup>
// ✅ صفحة البث المباشر — Premium UI — شبكة التكامل نت
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

// ── بيانات الشركة ──
const WHATSAPP_LINK  = 'https://wa.me/218923339798'
const PHONE_LINK     = 'tel:+218923339798'
const PHONE_DISPLAY  = '0923339798'

// ── حالة المشغّل ──
const videoRef         = ref(null)
const playerContainer  = ref(null)
const isLoading        = ref(true)
const isError          = ref(false)
const isPlaying        = ref(false)
const isMuted          = ref(false)
const isFullscreen     = ref(false)
const volume           = ref(1)
const showControls     = ref(true)
const showVolumeSlider = ref(false)
let hlsInstance   = null
let controlsTimer = null
let retryCount    = 0
const MAX_RETRIES  = 2

// ── قائمة القنوات ──
const channels = [
  { id: 'bein1', label: 'beIN Sports 1', short: 'beIN 1', url: 'http://172.16.6.102/altkamel-playlist/bein1.m3u8', emoji: '⚽', disabled: false },
  { id: 'bein2', label: 'beIN Sports 2', short: 'beIN 2', url: '',   emoji: '🏆', disabled: true,  badge: 'قريباً' },
]
const activeChannel = ref(channels[0])

// ── إحصائيات ──
const viewerCount = ref(Math.floor(Math.random() * 900) + 100)
let statsInterval = null

// ────────────────────────────────────────────────────
// HLS Player — Direct attempt, no pre-checks
// ────────────────────────────────────────────────────
function startHls(url) {
  if (!videoRef.value || !url) return
  isLoading.value = true
  isError.value   = false

  import('hls.js').then(({ default: Hls }) => {
    if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null }

    if (Hls.isSupported()) {
      // ── hls.js: Chrome / Firefox / Edge / Android / Smart TV ──
      hlsInstance = new Hls({
        enableWorker:           true,
        lowLatencyMode:         true,
        backBufferLength:       90,
        maxBufferLength:        30,
        maxMaxBufferLength:     60,
        maxLoadingDelay:        4,
        startLevel:             -1,
        abrEwmaDefaultEstimate: 2_000_000,
        xhrSetup(xhr) { xhr.withCredentials = false },
      })
      hlsInstance.loadSource(url)
      hlsInstance.attachMedia(videoRef.value)
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        isLoading.value = false; retryCount = 0
        videoRef.value.play().then(() => { isPlaying.value = true }).catch(() => {})
      })
      hlsInstance.on(Hls.Events.ERROR, (_e, data) => {
        if (!data.fatal) return
        if (retryCount < MAX_RETRIES) {
          retryCount++; hlsInstance.destroy(); hlsInstance = null
          setTimeout(() => startHls(url), 1500 * retryCount)
        } else { isLoading.value = false; isError.value = true }
      })
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      // ── Native HLS: Safari / iOS ──
      videoRef.value.src = url
      videoRef.value.addEventListener('loadedmetadata', () => {
        isLoading.value = false; retryCount = 0
        videoRef.value.play().catch(() => {})
      }, { once: true })
      videoRef.value.addEventListener('error', () => {
        isLoading.value = false; isError.value = true
      }, { once: true })
    } else {
      isLoading.value = false; isError.value = true
    }
  })
}

function switchChannel(ch) {
  if (ch.disabled || !ch.url) return
  activeChannel.value = ch; isPlaying.value = false; retryCount = 0
  startHls(ch.url)
}

function togglePlay() {
  if (!videoRef.value) return
  if (videoRef.value.paused) { videoRef.value.play(); isPlaying.value = true }
  else                       { videoRef.value.pause(); isPlaying.value = false }
}
function toggleMute() {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted; isMuted.value = videoRef.value.muted
}
function setVolume(v) {
  volume.value = v
  if (videoRef.value) { videoRef.value.volume = v; isMuted.value = v === 0 }
}
function toggleFullscreen() {
  const el = playerContainer.value
  if (!document.fullscreenElement) {
    el.requestFullscreen?.() || el.webkitRequestFullscreen?.() || el.mozRequestFullScreen?.()
    screen?.orientation?.lock?.('landscape').catch(() => {})
  } else {
    document.exitFullscreen?.() || document.webkitExitFullscreen?.()
  }
}
function retryStream() { retryCount = 0; isError.value = false; startHls(activeChannel.value.url) }
function resetControlsTimer() {
  showControls.value = true; clearTimeout(controlsTimer)
  controlsTimer = setTimeout(() => { if (isPlaying.value) showControls.value = false }, 3500)
}

onMounted(() => {
  startHls(activeChannel.value.url)
  document.addEventListener('fullscreenchange', () => { isFullscreen.value = !!document.fullscreenElement })
  statsInterval = setInterval(() => {
    viewerCount.value = Math.max(50, viewerCount.value + Math.floor(Math.random() * 21) - 10)
  }, 8000)
})
onUnmounted(() => {
  if (hlsInstance) hlsInstance.destroy()
  clearTimeout(controlsTimer); clearInterval(statsInterval)
})
</script>

<template>
  <!-- ════════════════════════════════════════════════════
       خلفية داكنة مع gradient يتناسق مع هوية التكامل نت
       (indigo → teal — نفس brand-gradient الموقع)
       ════════════════════════════════════════════════════ -->
  <div
    class="min-h-screen font-cairo"
    dir="rtl"
    style="background: #07091a; background-image:
      radial-gradient(ellipse at 80% 0%,   rgba(67,56,202,0.12) 0%, transparent 55%),
      radial-gradient(ellipse at 10% 100%, rgba(6,182,212,0.07)  0%, transparent 50%);"
  >

    <!-- ════════ NAVBAR — مخصص لصفحة البث ════════ -->
    <header class="sticky top-0 z-50 border-b border-white/5" style="background: rgba(7,9,26,0.88); backdrop-filter: blur(20px);">
      <nav class="container mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between">

        <NuxtLink to="/" class="flex items-center gap-3 group">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-8 w-auto transition-transform duration-300 group-hover:scale-105" />
          <div class="hidden sm:flex flex-col leading-none">
            <span class="font-black text-sm text-white">التكامل نت</span>
            <span class="text-[10px] text-cyan-400/70 font-medium tracking-wide">للاتصالات وتقنية المعلومات</span>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-3">
          <!-- مؤشر LIVE بلون الهوية (indigo) لا أحمر -->
          <div
            class="flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style="background: rgba(67,56,202,0.15); border: 1px solid rgba(99,102,241,0.30);"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
            </span>
            <span class="text-indigo-300 font-extrabold text-xs tracking-widest">LIVE</span>
          </div>

          <NuxtLink to="/" class="flex items-center gap-1 text-white/35 hover:text-white/70 transition-colors text-xs font-medium">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
            </svg>
            الرئيسية
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- ════════ الجسم الرئيسي ════════ -->
    <div class="container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-10">

      <!-- ══ TITLE ROW ══ -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 class="text-xl md:text-2xl font-black text-white leading-tight">
            <span class="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-indigo-400">🏆 كأس العالم 2026</span>
          </h1>
          <p class="text-white/30 text-xs mt-1 font-medium">بث مباشر حصري لمشتركي شبكة التكامل نت</p>
        </div>

        <!-- Live stats pill -->
        <div
          class="flex items-center gap-3 rounded-full px-4 py-2 text-xs self-start sm:self-auto"
          style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);"
        >
          <span class="flex items-center gap-1.5 text-white/50">
            <span class="text-green-400 text-sm">👁</span>
            {{ viewerCount.toLocaleString('ar') }} مشاهد
          </span>
          <span class="w-px h-3 bg-white/15" />
          <span class="text-cyan-400 font-bold">HD</span>
          <span class="w-px h-3 bg-white/15" />
          <span class="flex items-center gap-1 text-red-400">
            <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span class="font-bold">مباشر</span>
          </span>
        </div>
      </div>

      <!-- ══ CHANNEL SELECTOR — Panel مستقل أنيق فوق الفيديو ══ -->
      <div
        class="flex items-center gap-3 rounded-2xl px-4 py-3 mb-4"
        style="background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);"
      >
        <span class="text-white/25 text-[11px] font-bold tracking-widest uppercase flex-shrink-0">القنوات</span>
        <div class="w-px h-4 bg-white/10 flex-shrink-0" />
        <div class="flex gap-2">
          <button
            v-for="ch in channels"
            :key="ch.id"
            :disabled="ch.disabled"
            @click="switchChannel(ch)"
            class="relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-250"
            :class="ch.disabled
              ? 'text-white/20 cursor-not-allowed'
              : activeChannel.id === ch.id
                ? 'text-white shadow-lg'
                : 'hover:text-white/80 transition-colors'"
            :style="ch.disabled
              ? 'background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.05);'
              : activeChannel.id === ch.id
                ? 'background: linear-gradient(135deg, #3820d0, #0094b0); border: 1px solid rgba(99,102,241,0.4); box-shadow: 0 4px 20px rgba(67,56,202,0.35);'
                : 'background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);'"
          >
            <span>{{ ch.emoji }}</span>
            <span>{{ ch.short }}</span>
            <!-- نقطة مباشر للقناة الفعالة -->
            <span v-if="!ch.disabled && activeChannel.id === ch.id" class="flex items-center gap-1 mr-0.5">
              <span class="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            </span>
            <!-- شارة قريباً -->
            <span
              v-if="ch.disabled"
              class="absolute -top-2 -left-1 text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none"
              style="background: linear-gradient(135deg, #d97706, #f59e0b); color: #000;"
            >{{ ch.badge }}</span>
          </button>
        </div>

        <!-- spacer -->
        <div class="flex-1" />

        <!-- اسم القناة الفعالة -->
        <div class="hidden sm:flex items-center gap-2 text-xs text-white/40">
          <svg class="w-3.5 h-3.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          <span>{{ activeChannel.label }}</span>
        </div>
      </div>

      <!-- ══ MAIN GRID: فيديو (يمين / أكبر) + sidebar (يسار) ══ -->
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

        <!-- ═══════════ عمود الفيديو ═══════════ -->
        <div>
          <!-- مشغّل الفيديو — Hero Element -->
          <div
            ref="playerContainer"
            id="video-player"
            class="relative w-full aspect-video bg-black rounded-2xl overflow-hidden cursor-pointer select-none"
            style="box-shadow: 0 30px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06); border-radius: 20px;"
            @mousemove="resetControlsTimer"
            @touchstart.passive="resetControlsTimer"
            @click="togglePlay"
          >
            <video
              ref="videoRef"
              class="w-full h-full object-contain"
              playsinline webkit-playsinline
              :muted="isMuted" preload="auto"
            />

            <!-- ════ البصمة المائية — أعلى اليسار ════
                 z-20 (تحت شريط التحكم z-30)
                 pointer-events-none (لا تعيق النقر)
                 شفافية 55% — خفية لكن مقروءة ════ -->
            <div class="absolute top-3 left-3 z-20 pointer-events-none select-none">
              <div
                class="flex items-center gap-1.5 rounded-lg px-2 py-1"
                style="background: rgba(0,0,0,0.18); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.07); opacity: 0.55;"
              >
                <img
                  src="/images/logo/logo.png" alt=""
                  class="h-4 w-auto"
                  style="filter: brightness(1.5) drop-shadow(0 1px 3px rgba(0,0,0,0.8));"
                />
                <span class="text-white text-[10px] font-bold tracking-wide">التكامل نت</span>
              </div>
            </div>

            <!-- تحميل -->
            <div v-if="isLoading" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70">
              <div class="relative mb-4">
                <div class="w-14 h-14 rounded-full border-[3px] border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <div class="absolute inset-0 flex items-center justify-center text-2xl">⚽</div>
              </div>
              <p class="text-white font-bold text-sm mb-1">جارٍ تحميل البث...</p>
              <p class="text-white/30 text-xs">{{ activeChannel.label }}</p>
            </div>

            <!-- خطأ -->
            <div v-else-if="isError" class="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center" style="background: rgba(7,9,26,0.96);">
              <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-3xl"
                style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);">📡</div>
              <p class="text-white font-bold text-base mb-1.5">تعذّر الاتصال بالبث</p>
              <p class="text-white/40 text-sm mb-6 max-w-xs leading-relaxed">
                تأكد من اتصالك بشبكة التكامل نت الداخلية ثم أعد المحاولة
              </p>
              <div class="flex gap-3">
                <button
                  @click.stop="retryStream"
                  class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all"
                  style="background: linear-gradient(135deg, #3820d0, #0094b0); box-shadow: 0 4px 20px rgba(67,56,202,0.4);"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  إعادة المحاولة
                </button>
                <a
                  :href="WHATSAPP_LINK" target="_blank" rel="noopener"
                  @click.stop
                  class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-green-400 transition-colors"
                  style="background: rgba(34,197,94,0.08); border: 1px solid rgba(34,197,94,0.2);"
                >دعم فني</a>
              </div>
            </div>

            <!-- أيقونة Play -->
            <Transition name="fade-icon">
              <div v-if="!isLoading && !isError && !isPlaying"
                class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div class="w-18 h-18 rounded-full flex items-center justify-center"
                  style="width:72px;height:72px;background:rgba(255,255,255,0.15);backdrop-filter:blur(6px);border:1.5px solid rgba(255,255,255,0.25);">
                  <svg class="w-8 h-8 text-white" style="margin-left:4px;" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </Transition>

            <!-- شريط تحكم سفلي — z-30 ─────────────────── -->
            <Transition name="controls-fade">
              <div
                v-if="showControls && !isLoading && !isError"
                class="absolute bottom-0 right-0 left-0 z-30 pt-10 pb-3 px-4"
                style="background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);"
                @click.stop
              >
                <!-- اسم القناة + LIVE -->
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-white font-bold text-xs">{{ activeChannel.emoji }} {{ activeChannel.label }}</span>
                  <span class="text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1 text-white"
                    style="background: rgba(220,38,38,0.85);">
                    <span class="w-1 h-1 bg-white rounded-full animate-pulse" />LIVE
                  </span>
                </div>
                <!-- أزرار التحكم -->
                <div class="flex items-center gap-3">
                  <button @click="togglePlay" class="text-white/80 hover:text-white transition-colors" aria-label="تشغيل">
                    <svg v-if="!isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  </button>
                  <!-- صوت -->
                  <div class="flex items-center gap-1.5" @mouseenter="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
                    <button @click="toggleMute" class="text-white/80 hover:text-white transition-colors" aria-label="صوت">
                      <svg v-if="!isMuted && volume > 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                      </svg>
                      <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    </button>
                    <Transition name="slide-volume">
                      <input v-if="showVolumeSlider" type="range" min="0" max="1" step="0.05"
                        :value="volume" @input="setVolume(+$event.target.value)"
                        class="w-16 accent-cyan-400 cursor-pointer" @click.stop />
                    </Transition>
                  </div>
                  <div class="flex-1" />
                  <button @click="toggleFullscreen" class="text-white/80 hover:text-white transition-colors" aria-label="ملء الشاشة">
                    <svg v-if="!isFullscreen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"/>
                    </svg>
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- ═══════════ SIDEBAR ═══════════ -->
        <aside class="flex flex-col gap-4">

          <!-- ── 1. Dashboard Stats Widget ── -->
          <div
            class="rounded-2xl overflow-hidden"
            style="background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(20px);"
          >
            <!-- header صغير -->
            <div class="px-4 pt-3.5 pb-2 flex items-center justify-between">
              <span class="text-white/40 text-[10px] font-bold tracking-widest uppercase">حالة البث</span>
              <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            </div>
            <!-- 2×2 grid من المقاييس -->
            <div class="grid grid-cols-2 divide-x divide-y divide-white/5 border-t border-white/5">
              <div class="flex flex-col items-center justify-center py-4 gap-0.5">
                <span class="text-2xl font-black tracking-tight" style="background: linear-gradient(135deg,#00e1f0,#1a56db); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">HD</span>
                <span class="text-white/30 text-[10px] font-medium">جودة البث</span>
              </div>
              <div class="flex flex-col items-center justify-center py-4 gap-0.5">
                <span class="text-base font-black text-indigo-300">منخفض</span>
                <span class="text-white/30 text-[10px] font-medium">التأخير</span>
              </div>
              <div class="flex flex-col items-center justify-center py-4 gap-0.5">
                <span class="text-xl font-black text-white">{{ viewerCount }}</span>
                <span class="text-white/30 text-[10px] font-medium">مشاهد الآن</span>
              </div>
              <div class="flex flex-col items-center justify-center py-4 gap-1">
                <span class="flex items-center gap-1.5">
                  <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span class="text-red-400 font-black text-sm">مباشر</span>
                </span>
                <span class="text-white/30 text-[10px] font-medium">نوع البث</span>
              </div>
            </div>
          </div>

          <!-- ── 2. باقات الإنترنت (Glassmorphism card) ── -->
          <div
            class="rounded-2xl overflow-hidden"
            style="background: rgba(67,56,202,0.07); border: 1px solid rgba(99,102,241,0.15); backdrop-filter: blur(20px);"
          >
            <!-- Header -->
            <div class="px-4 pt-4 pb-3 flex items-center gap-2.5 border-b border-white/5">
              <div
                class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style="background: linear-gradient(135deg, #3820d0, #0094b0);"
              >
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                </svg>
              </div>
              <div>
                <p class="text-white font-bold text-sm leading-none">باقات الإنترنت</p>
                <p class="text-white/30 text-[10px] mt-0.5">للمنازل والشركات</p>
              </div>
            </div>

            <!-- الباقات -->
            <div class="p-3 space-y-1.5">
              <div
                v-for="pkg in [
                  { icon: '🏠', name: 'الأساسية',  speed: '10 ميجا',  color: 'rgba(56,189,248,0.06)',  border: 'rgba(56,189,248,0.12)' },
                  { icon: '⭐', name: 'المتميزة',   speed: '25 ميجا',  color: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.18)' },
                  { icon: '🏢', name: 'الأعمال',    speed: '50+ ميجا', color: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.18)' },
                ]"
                :key="pkg.name"
                class="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-200 hover:scale-[1.01]"
                :style="`background: ${pkg.color}; border: 1px solid ${pkg.border};`"
              >
                <span class="text-base">{{ pkg.icon }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-white font-bold text-xs">{{ pkg.name }}</p>
                  <p class="text-white/35 text-[10px]">{{ pkg.speed }}</p>
                </div>
                <a
                  :href="WHATSAPP_LINK" target="_blank" rel="noopener"
                  class="text-cyan-400 text-[10px] font-black hover:text-cyan-300 transition-colors whitespace-nowrap"
                  @click.stop
                >استفسر ←</a>
              </div>
            </div>

            <!-- CTA -->
            <div class="px-3 pb-3">
              <a
                href="/#packages"
                class="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all hover:opacity-90"
                style="background: linear-gradient(135deg, #3820d0 0%, #0094b0 100%); box-shadow: 0 3px 15px rgba(67,56,202,0.3);"
              >
                عرض جميع الباقات
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- ── 3. الدعم الفني ── -->
          <div
            class="rounded-2xl p-3"
            style="background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); backdrop-filter: blur(20px);"
          >
            <p class="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-2.5 px-1">الدعم الفني</p>
            <div class="space-y-2">
              <a
                :href="WHATSAPP_LINK" target="_blank" rel="noopener"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:scale-[1.01]"
                style="background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.15);"
              >
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(34,197,94,0.12);">
                  <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-green-400 font-bold text-xs">واتساب</p>
                  <p class="text-white/30 text-[10px]">{{ PHONE_DISPLAY }}</p>
                </div>
                <svg class="w-3.5 h-3.5 text-white/15 mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>

              <a
                :href="PHONE_LINK"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:scale-[1.01]"
                style="background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.13);"
              >
                <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: rgba(99,102,241,0.12);">
                  <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div class="min-w-0">
                  <p class="text-indigo-300 font-bold text-xs">اتصال مباشر</p>
                  <p class="text-white/30 text-[10px]">{{ PHONE_DISPLAY }}</p>
                </div>
                <svg class="w-3.5 h-3.5 text-white/15 mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

        </aside>
      </div>
    </div>

    <!-- ════════ FOOTER ════════ -->
    <footer class="border-t py-5" style="border-color: rgba(255,255,255,0.05); background: rgba(255,255,255,0.01);">
      <div class="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/20">
        <div class="flex items-center gap-2">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-4 w-auto opacity-30" />
          <span>© 2026 شركة التكامل نت للاتصالات وتقنية المعلومات</span>
        </div>
        <span>البث مخصص لمشتركي الشبكة الداخلية</span>
      </div>
    </footer>

  </div>
</template>

<style scoped>
.fade-icon-enter-active, .fade-icon-leave-active { transition: opacity 0.3s ease; }
.fade-icon-enter-from,  .fade-icon-leave-to      { opacity: 0; }

.controls-fade-enter-active, .controls-fade-leave-active { transition: opacity 0.4s ease; }
.controls-fade-enter-from,   .controls-fade-leave-to     { opacity: 0; }

.slide-volume-enter-active, .slide-volume-leave-active { transition: all 0.2s ease; }
.slide-volume-enter-from,   .slide-volume-leave-to     { opacity: 0; width: 0; }
</style>
