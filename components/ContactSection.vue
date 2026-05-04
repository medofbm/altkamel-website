<script setup>
// ✅ ContactSection - معلومات الاتصال الحقيقية للشركة + إرسال عبر واتساب

// ─── حالة النموذج ─────────────────────────────────────────────────────────
const form = reactive({ name: '', phone: '', message: '' })
const errors = reactive({ name: '', phone: '', message: '' })
const isSubmitting = ref(false)

// ─── التحقق من رقم الهاتف ────────────────────────────────────────────────
const isValidPhone = (p) =>
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/.test(p.replace(/\s/g, ''))

const clearError = (field) => { errors[field] = '' }

// ─── التحقق من الحقول ────────────────────────────────────────────────────
const validateForm = () => {
  let ok = true

  if (!form.name || form.name.trim().length < 2) {
    errors.name = 'الاسم مطلوب (حرفان على الأقل)'
    ok = false
  } else { errors.name = '' }

  if (!form.phone) {
    errors.phone = 'رقم الهاتف مطلوب'
    ok = false
  } else if (!isValidPhone(form.phone.trim())) {
    errors.phone = 'رقم الهاتف غير صالح'
    ok = false
  } else { errors.phone = '' }

  if (!form.message || form.message.trim().length < 10) {
    errors.message = 'الرسالة مطلوبة (10 أحرف على الأقل)'
    ok = false
  } else if (form.message.length > 1000) {
    errors.message = 'الرسالة طويلة جداً (1000 حرف كحد أقصى)'
    ok = false
  } else { errors.message = '' }

  return ok
}

// ─── إرسال بيانات النموذج عبر واتساب ────────────────────────────────────
const WHATSAPP_NUMBER = '218923339798'

const handleSubmit = () => {
  if (!validateForm()) return

  isSubmitting.value = true

  const text =
    `مرحباً فريق التكامل نت، لدي استفسار من الموقع الإلكتروني:\n\n` +
    `الاسم: ${form.name.trim()}\n` +
    `رقم الهاتف: ${form.phone.trim()}\n\n` +
    `الرسالة: ${form.message.trim()}`

  const encodedText = encodeURIComponent(text)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`

  window.open(url, '_blank', 'noopener,noreferrer')

  // إعادة تعيين النموذج بعد الإرسال
  form.name = form.phone = form.message = ''
  isSubmitting.value = false
}

// ─── بيانات التواصل الرسمية للشركة ────────────────────────────────
const branches = [
  {
    name: 'فرع طرابلس',
    area: 'حي الأندلس',
    hours: '10:00 ص – 5:00 م',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    mapUrl: 'https://maps.app.goo.gl/KPSuodW8PTTG9y5q6',
  },
  {
    name: 'فرع بني وليد',
    area: 'بني وليد',
    hours: '10:00 ص – 5:00 م',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    mapUrl: 'https://maps.app.goo.gl/Hjdujzjh9nBYXbW99?g_st=aw',
  },
]

// ─── روابط السوشيال الرسمية ───────────────────────────────────────────
const socials = [
  {
    name: 'فيسبوك',
    href: 'https://www.facebook.com/Altkamel.ly',
    hoverBg: 'hover:bg-[#1877F2]',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'إنستغرام',
    href: 'https://www.instagram.com/altkamel_net',
    hoverBg: 'hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'تيك توك',
    href: 'https://www.tiktok.com/@altkamel_net',
    hoverBg: 'hover:bg-black',
    path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z',
  },
  {
    name: 'واتسآب',
    href: 'https://wa.me/218923339798',
    hoverBg: 'hover:bg-[#25D366]',
    path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
  },
]
</script>

<template>
  <section id="contact" class="py-24 bg-white relative overflow-hidden">

    <!-- زخارف -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

    <div class="relative container mx-auto px-4 md:px-8">

      <!-- رأس القسم -->
      <div class="text-center mb-16">
        <span class="inline-block bg-indigo-100 text-indigo-700 text-sm font-bold px-4 py-1.5 rounded-full mb-4">
          نحن هنا لمساعدتك
        </span>
        <h2 class="section-title text-4xl md:text-5xl mb-4 leading-normal pb-4 overflow-visible">تواصل معنا</h2>
        <div class="section-divider" />
        <p class="text-gray-500 text-lg max-w-xl mx-auto mt-6 leading-loose font-medium">
          هل لديك استفسار أو تريد الاشتراك في إحدى خدماتنا؟ تواصل معنا وسيرد عليك فريقنا في أقرب وقت
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-10 items-start">

        <!-- ✅ معلومات الاتصال الرسمية -->
        <div class="lg:col-span-2 space-y-5">

          <!-- العنوان الرئيسي -->
          <a href="https://maps.app.goo.gl/KPSuodW8PTTG9y5q6" target="_blank" class="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-white/30 transition-colors">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <div class="text-xs text-white/70 font-medium mb-1">العنوان الرئيسي</div>
              <div class="font-bold text-base leading-snug group-hover:text-white transition-colors"> حي الاندلس مقابل صالة قرطبة</div>
              <div class="text-white/80 text-sm mt-0.5">طرابلس – ليبيا</div>
            </div>
          </a>

          <!-- الفروع -->
          <div class="p-5 rounded-2xl bg-gray-50 border border-gray-100">
            <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              فروعنا
            </h4>
            <div class="space-y-3">
              <a
                v-for="branch in branches"
                :key="branch.name"
                :href="branch.mapUrl"
                target="_blank"
                class="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 cursor-pointer group"
              >
                <div class="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 transition-colors flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="branch.icon"/>
                  </svg>
                </div>
                <div>
                  <div class="font-bold text-gray-800 text-sm group-hover:text-indigo-700 transition-colors">{{ branch.name }}</div>
                  <div class="text-xs text-gray-500">{{ branch.area }}</div>
                  <div class="text-xs text-indigo-600 font-semibold mt-0.5">
                    <svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ branch.hours }}
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- أرقام الهاتف -->
          <div class="grid grid-cols-1 gap-3">
            

            <!-- الدعم الفني -->
            <a
              href="https://wa.me/218923339798"
              target="_blank"
              class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-teal-50 hover:border-teal-200 transition-colors duration-200 group"
            >
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-400 font-medium">الدعم الفني</div>
                <div class="font-bold text-gray-800 group-hover:text-teal-700 transition-colors">0923339798</div>
              </div>
            </a>

            <!-- البريد الإلكتروني -->
            <a
              href="mailto:info@altkamel.ly"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 group"
            >
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-400 font-medium">البريد الإلكتروني</div>
                <div href="mailto:info@altkamel.ly" class="font-bold text-gray-800 group-hover:text-blue-700 transition-colors">info@altkamel.ly</div>
              </div>
            </a>

            <!-- ✅ أيقونات السوشيال ميديا -->
            <div class="pt-2">
              <p class="text-xs text-gray-400 mb-3 font-medium">تابعنا على</p>
              <div class="flex gap-2.5 flex-wrap">
                <a
                  v-for="social in socials"
                  :key="social.name"
                  :href="social.href"
                  :aria-label="social.name"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  :class="social.hoverBg"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path :d="social.path" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- ✅ نموذج التواصل المحمي -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-3xl shadow-card border border-gray-100 p-8">

            <h3 class="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h3>

            <!-- تلميح واتساب -->
            <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
              <svg class="w-6 h-6 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <p class="text-green-700 text-sm font-medium">سيتم فتح واتساب مع رسالتك جاهزة للإرسال مباشرة لفريقنا.</p>
            </div>

            <form novalidate @submit.prevent="handleSubmit">
              <div class="grid sm:grid-cols-2 gap-5 mb-5">

                <!-- الاسم -->
                <div>
                  <label for="c-name" class="block text-sm font-semibold text-gray-700 mb-2">
                    الاسم الكامل <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="c-name" v-model="form.name" type="text" maxlength="100"
                    placeholder="محمد علي" autocomplete="name"
                    class="w-full px-4 py-3 rounded-xl border text-gray-800 placeholder-gray-400 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    :class="errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'"
                    @input="clearError('name')"
                  />
                  <Transition name="err">
                    <p v-if="errors.name" class="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                      {{ errors.name }}
                    </p>
                  </Transition>
                </div>

                <!-- الهاتف -->
                <div>
                  <label for="c-phone" class="block text-sm font-semibold text-gray-700 mb-2">
                    رقم الهاتف <span class="text-red-500">*</span>
                  </label>
                  <input
                    id="c-phone" v-model="form.phone" type="tel" maxlength="20"
                    placeholder="09XXXXXXXX" autocomplete="tel"
                    class="w-full px-4 py-3 rounded-xl border text-gray-800 placeholder-gray-400 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    :class="errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'"
                    @input="clearError('phone')"
                  />
                  <Transition name="err">
                    <p v-if="errors.phone" class="text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                      <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                      {{ errors.phone }}
                    </p>
                  </Transition>
                </div>
              </div>

              <!-- الرسالة -->
              <div class="mb-7">
                <label for="c-message" class="block text-sm font-semibold text-gray-700 mb-2">
                  رسالتك <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="c-message" v-model="form.message" rows="5" maxlength="1000"
                  placeholder="أخبرنا عن احتياجاتك أو استفسارك..."
                  class="w-full px-4 py-3 rounded-xl border text-gray-800 placeholder-gray-400 text-sm font-medium transition-all duration-200 outline-none resize-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  :class="errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-gray-300'"
                  @input="clearError('message')"
                />
                <div class="flex justify-between items-start mt-1.5">
                  <Transition name="err">
                    <p v-if="errors.message" class="text-red-500 text-xs font-medium flex items-center gap-1">
                      <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
                      {{ errors.message }}
                    </p>
                    <span v-else />
                  </Transition>
                  <span class="text-xs text-gray-400">{{ form.message.length }}/1000</span>
                </div>
              </div>

              <!-- زر الإرسال عبر واتساب -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-primary justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54]"
              >
                <!-- أيقونة واتساب -->
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {{ isSubmitting ? 'جارٍ الفتح...' : 'إرسال عبر واتساب' }}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.err-enter-active, .err-leave-active   { transition: all 0.2s ease; }
.err-enter-from,  .err-leave-to        { opacity: 0; transform: translateY(-4px); }
.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from,   .fade-leave-to     { opacity: 0; transform: translateY(-8px); }
</style>
