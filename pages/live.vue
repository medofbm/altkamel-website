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

// ── بيانات التواصل الرسمية ──
const WHATSAPP_LINK = 'https://wa.me/218923339798'
const PHONE_LINK    = 'tel:+218923339798'
const PHONE_DISPLAY = '0923339798'

// ── حالة المشغّل ──
const videoRef        = ref(null)
const playerContainer = ref(null)
const isLoading       = ref(true)
const isError         = ref(false)
const isPlaying       = ref(false)
const isMuted         = ref(false)
const isFullscreen    = ref(false)
const volume          = ref(1)
const showControls    = ref(true)
const showVolumeSlider = ref(false)
let hlsInstance   = null
let controlsTimer = null
let retryCount    = 0
const MAX_RETRIES  = 2

// ── قائمة القنوات ──
const channels = [
  { id: 'bein1', label: 'beIN 1', url: 'http://172.16.6.102/altkamel-playlist/bein1.m3u8', emoji: '⚽', disabled: false },
  { id: 'bein2', label: 'beIN 2', url: '',                                                   emoji: '🏆', disabled: true, badge: 'قريباً' },
]
const activeChannel = ref(channels[0])

// ── إحصائيات ديناميكية ──
const viewerCount = ref(Math.floor(Math.random() * 900) + 100)
let statsInterval = null

// ────────────────────────────────────────────────────
// تشغيل HLS — بدون أي فحص مسبق، نُحاول مباشرةً
// ────────────────────────────────────────────────────
function startHls(url) {
  if (!videoRef.value || !url) return
  isLoading.value = true
  isError.value   = false

  import('hls.js').then(({ default: Hls }) => {
    if (hlsInstance) { hlsInstance.destroy(); hlsInstance = null }

    // ── المسار الرئيسي: hls.js (Chrome / Firefox / Android / Smart TV) ──
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
        xhrSetup(xhr) { xhr.withCredentials = false },
      })
      hlsInstance.loadSource(url)
      hlsInstance.attachMedia(videoRef.value)

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        isLoading.value = false
        retryCount      = 0
        videoRef.value.play()
          .then(() => { isPlaying.value = true })
          .catch(() => {/* autoplay blocked */})
      })

      hlsInstance.on(Hls.Events.ERROR, (_e, data) => {
        if (!data.fatal) return
        if (retryCount < MAX_RETRIES) {
          retryCount++
          hlsInstance.destroy(); hlsInstance = null
          setTimeout(() => startHls(url), 1500 * retryCount)
        } else {
          isLoading.value = false
          isError.value   = true
        }
      })

    // ── Fallback: Safari / iOS Native HLS ──
    } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.value.src = url
      videoRef.value.addEventListener('loadedmetadata', () => {
        isLoading.value = false
        retryCount      = 0
        videoRef.value.play().catch(() => {})
      }, { once: true })
      videoRef.value.addEventListener('error', () => {
        isLoading.value = false
        isError.value   = true
      }, { once: true })

    } else {
      isLoading.value = false
      isError.value   = true
    }
  })
}

function switchChannel(ch) {
  if (ch.disabled || !ch.url) return
  activeChannel.value = ch
  isPlaying.value     = false
  retryCount          = 0
  startHls(ch.url)
}

function togglePlay() {
  if (!videoRef.value) return
  if (videoRef.value.paused) { videoRef.value.play(); isPlaying.value = true }
  else                       { videoRef.value.pause(); isPlaying.value = false }
}

function toggleMute() {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
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

function retryStream() {
  retryCount = 0; isError.value = false
  startHls(activeChannel.value.url)
}

function resetControlsTimer() {
  showControls.value = true
  clearTimeout(controlsTimer)
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
  clearTimeout(controlsTimer)
  clearInterval(statsInterval)
})
</script>

<template>
  <div class="min-h-screen bg-gray-950 font-cairo" dir="rtl">

    <!-- ══ Navbar ══ -->
    <header class="bg-gray-900/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <nav class="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-9 w-auto" />
          <div class="flex flex-col leading-tight hidden sm:flex">
            <span class="font-extrabold text-sm text-white">التكامل نت</span>
            <span class="text-[11px] text-cyan-400">للاتصالات وتقنية المعلومات</span>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-3">
          <div class="flex items-center gap-1.5 bg-red-600/15 border border-red-500/25 rounded-full px-3 py-1">
            <span class="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span class="text-red-400 font-bold text-xs">مباشر</span>
          </div>
          <NuxtLink to="/" class="text-white/50 hover:text-white transition-colors text-xs font-medium hidden sm:inline">
            ← الرئيسية
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-3 md:px-6 lg:px-8 py-4">

      <!-- ══ عنوان مدمج مع إحصائية ══ -->
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-xl md:text-2xl font-black text-white flex items-center gap-2">
          <span class="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-blue-500">🏆 كأس العالم 2026</span>
        </h1>
        <div class="flex items-center gap-2 text-xs text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
          <span class="text-green-400">👁</span>
          <span>{{ viewerCount.toLocaleString('ar') }} مشاهد</span>
          <span class="mx-1 text-white/20">|</span>
          <span class="text-blue-400 font-bold">HD</span>
        </div>
      </div>

      <!-- ══ التخطيط الرئيسي: مشغّل + sidebar ══ -->
      <div class="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">

        <!-- ── عمود المشغّل ── -->
        <div class="space-y-3">

          <!-- مشغّل الفيديو -->
          <div
            ref="playerContainer"
            id="video-player"
            class="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl cursor-pointer select-none"
            @mousemove="resetControlsTimer"
            @touchstart.passive="resetControlsTimer"
            @click="togglePlay"
          >
            <video
              ref="videoRef"
              class="w-full h-full object-contain"
              playsinline
              webkit-playsinline
              :muted="isMuted"
              preload="auto"
            />

            <!-- البصمة المائية — أسفل اليسار، pointer-events-none، z-20 -->
            <div
              class="absolute left-3 z-20 pointer-events-none select-none"
              style="bottom: 4rem;"
            >
              <div
                class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 border border-white/8"
                style="background: rgba(0,0,0,0.22); backdrop-filter: blur(4px); opacity: 0.65;"
              >
                <img
                  src="/images/logo/logo.png"
                  alt="التكامل نت"
                  class="h-5 w-auto"
                  style="filter: brightness(1.3) drop-shadow(0 1px 3px rgba(0,0,0,0.9));"
                />
                <span class="text-white text-[10px] font-bold leading-none">التكامل نت</span>
              </div>
            </div>

            <!-- تحميل -->
            <div v-if="isLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-black/70 z-10">
              <div class="relative mb-3">
                <div class="w-14 h-14 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <div class="absolute inset-0 flex items-center justify-center text-xl">⚽</div>
              </div>
              <p class="text-white font-bold text-sm">جارٍ تحميل البث...</p>
            </div>

            <!-- خطأ -->
            <div v-else-if="isError" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-950/95 z-10 px-6 text-center">
              <div class="text-4xl mb-3">📡</div>
              <p class="text-white font-bold text-base mb-1.5">تعذّر الاتصال بالبث</p>
              <p class="text-white/50 text-sm mb-5 max-w-xs">
                تأكد من اتصالك بشبكة التكامل نت الداخلية ثم أعد المحاولة
              </p>
              <div class="flex items-center gap-3">
                <button
                  @click.stop="retryStream"
                  class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
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
                  class="flex items-center gap-2 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 text-green-400 font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
                >
                  دعم فني
                </a>
              </div>
            </div>

            <!-- أيقونة Play -->
            <Transition name="fade-icon">
              <div
                v-if="!isLoading && !isError && !isPlaying"
                class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </Transition>

            <!-- شريط تحكم — z-30 دائماً فوق البصمة ──  -->
            <Transition name="controls-fade">
              <div
                v-if="showControls && !isLoading && !isError"
                class="absolute bottom-0 right-0 left-0 z-30 bg-gradient-to-t from-black/90 via-black/30 to-transparent pt-8 pb-2.5 px-3"
                @click.stop
              >
                <!-- اسم القناة + LIVE -->
                <div class="flex items-center gap-2 mb-1.5">
                  <span class="text-white font-bold text-xs">{{ activeChannel.emoji }} {{ activeChannel.label }}</span>
                  <span class="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                    <span class="w-1 h-1 bg-white rounded-full animate-pulse" />LIVE
                  </span>
                </div>

                <!-- أزرار التحكم -->
                <div class="flex items-center gap-3">
                  <!-- تشغيل/إيقاف -->
                  <button @click="togglePlay" class="text-white hover:text-cyan-400 transition-colors" aria-label="تشغيل/إيقاف">
                    <svg v-if="!isPlaying" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                  </button>

                  <!-- صوت -->
                  <div class="flex items-center gap-1.5" @mouseenter="showVolumeSlider = true" @mouseleave="showVolumeSlider = false">
                    <button @click="toggleMute" class="text-white hover:text-cyan-400 transition-colors" aria-label="صوت">
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

                  <!-- تكبير -->
                  <button @click="toggleFullscreen" class="text-white hover:text-cyan-400 transition-colors" aria-label="ملء الشاشة">
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

          <!-- اختيار القناة — أسفل المشغّل مباشرةً -->
          <div class="flex gap-2.5">
            <button
              v-for="ch in channels"
              :key="ch.id"
              :disabled="ch.disabled"
              @click="switchChannel(ch)"
              class="relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 border"
              :class="ch.disabled
                ? 'bg-white/3 border-white/8 text-white/25 cursor-not-allowed'
                : activeChannel.id === ch.id
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'"
            >
              <span>{{ ch.emoji }}</span>
              <span>{{ ch.label }}</span>
              <span v-if="!ch.disabled && activeChannel.id === ch.id" class="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              <span
                v-if="ch.disabled"
                class="absolute -top-2 -left-1 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full"
              >{{ ch.badge }}</span>
            </button>
          </div>
        </div>

        <!-- ── الـ Sidebar ── -->
        <aside class="space-y-3">

          <!-- باقات الإنترنت -->
          <div class="bg-gradient-to-br from-indigo-900/70 to-purple-950/70 border border-indigo-500/20 rounded-2xl p-4">
            <h3 class="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                </svg>
              </span>
              باقات الإنترنت
            </h3>

            <div class="space-y-2 mb-3">
              <div
                v-for="pkg in [
                  { icon: '🏠', name: 'الباقة الأساسية',  speed: '10 ميجا'  },
                  { icon: '⭐', name: 'الباقة المتميزة',   speed: '25 ميجا'  },
                  { icon: '🏢', name: 'باقة الأعمال',      speed: '50+ ميجا' },
                ]"
                :key="pkg.name"
                class="flex items-center gap-2.5 bg-white/5 border border-white/8 rounded-xl px-3 py-2"
              >
                <span class="text-base flex-shrink-0">{{ pkg.icon }}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-white font-bold text-xs truncate">{{ pkg.name }}</p>
                  <p class="text-white/40 text-[11px]">{{ pkg.speed }}</p>
                </div>
                <a :href="WHATSAPP_LINK" target="_blank" rel="noopener"
                   class="text-cyan-400 text-[11px] font-bold hover:text-cyan-300 transition-colors whitespace-nowrap">
                  استفسر
                </a>
              </div>
            </div>

            <a
              href="/#packages"
              class="flex items-center justify-center gap-1.5 w-full bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold py-2 rounded-xl transition-colors text-xs"
            >
              عرض جميع الباقات
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
          </div>

          <!-- التواصل -->
          <div class="bg-white/4 border border-white/8 rounded-2xl p-4">
            <h3 class="text-white/70 font-bold text-xs mb-2.5 uppercase tracking-wider">الدعم الفني</h3>
            <div class="space-y-2">
              <a
                :href="WHATSAPP_LINK"
                target="_blank"
                rel="noopener"
                class="flex items-center gap-3 bg-green-500/10 border border-green-500/20 hover:bg-green-500/18 rounded-xl px-3 py-2.5 transition-colors"
              >
                <svg class="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p class="text-green-400 font-bold text-xs">واتساب</p>
                  <p class="text-white/40 text-[10px]">{{ PHONE_DISPLAY }}</p>
                </div>
              </a>
              <a
                :href="PHONE_LINK"
                class="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/18 rounded-xl px-3 py-2.5 transition-colors"
              >
                <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <div>
                  <p class="text-blue-400 font-bold text-xs">اتصال مباشر</p>
                  <p class="text-white/40 text-[10px]">{{ PHONE_DISPLAY }}</p>
                </div>
              </a>
            </div>
          </div>

          <!-- بطاقة حالة البث — مدمجة مع مزايا بسيطة -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-white/4 border border-white/8 rounded-xl p-2.5 text-center">
              <div class="text-green-400 font-black text-base">HD</div>
              <div class="text-white/40 text-[10px] mt-0.5">جودة البث</div>
            </div>
            <div class="bg-white/4 border border-white/8 rounded-xl p-2.5 text-center">
              <div class="text-blue-400 font-black text-xs">منخفض</div>
              <div class="text-white/40 text-[10px] mt-0.5">التأخير</div>
            </div>
            <div class="bg-white/4 border border-white/8 rounded-xl p-2.5 text-center">
              <div class="text-cyan-400 font-black text-base">{{ viewerCount }}</div>
              <div class="text-white/40 text-[10px] mt-0.5">مشاهد الآن</div>
            </div>
            <div class="bg-white/4 border border-white/8 rounded-xl p-2.5 text-center">
              <div class="text-red-400 font-black text-xs flex items-center justify-center gap-1">
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />مباشر
              </div>
              <div class="text-white/40 text-[10px] mt-0.5">نوع البث</div>
            </div>
          </div>

        </aside>
      </div>

    </main>

    <!-- فوتر مبسّط -->
    <footer class="mt-10 border-t border-white/5 bg-gray-900/40 py-5">
      <div class="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
        <div class="flex items-center gap-2">
          <img src="/images/logo/logo.png" alt="التكامل نت" class="h-5 w-auto opacity-40" />
          <span>© 2026 شركة التكامل نت للاتصالات وتقنية المعلومات</span>
        </div>
        <span>البث مخصص لمشتركي الشبكة الداخلية فقط</span>
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
