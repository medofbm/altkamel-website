// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ✅ SSR مُفعَّل — يُولِّد HTML كامل لكل صفحة عامة (SEO & Social Sharing)
  //    صفحات البوابة الخاصة تبقى Client-Side عبر routeRules أدناه
  //    مثالي لـ cPanel shared hosting (Apache / LiteSpeed) مع nuxt generate

  // ✅ المتغيرات العامة (Runtime Config)
  // 🔒 sasAesKey أُزيل من public بالكامل — المفتاح يعيش فقط في PHP Proxy على الخادم
  //    راجع: public/sas-api/index.php → ثابت SAS_AES_KEY
  runtimeConfig: {
    public: {
      // الـ CORS proxy يعمل عبر .htaccess (api-proxy.php في public_html)
      sasApiBase: '/sas-api',
    }
  },

  // ✅ Nitro — preset static لـ npm run generate (cPanel)
  nitro: {
    preset: 'static',
    routeRules: {
      // ── الصفحات العامة: تُولَّد كـ HTML كامل عند البناء (SEO ممتاز) ──
      '/':           { prerender: true },
      '/about':      { prerender: true },
      '/technician': { prerender: true },
      '/live':       { prerender: true },   // ✅ صفحة البث المباشر — كأس العالم 2026

      // ── صفحات البوابة الخاصة: Client-Side فقط (لا تحتاج SEO) ──
      '/portal':           { ssr: false },
      '/portal/**':        { ssr: false },
    }
  },

  // ✅ الوحدات المطلوبة
  modules: ['@nuxtjs/tailwindcss'],

  // ✅ إعدادات التطبيق
  app: {
    head: {
      htmlAttrs: { lang: 'ar', dir: 'rtl' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'التكامل نت | خدمات الإنترنت والاتصالات في ليبيا',
      meta: [
        {
          name: 'description',
          content:
            'شركة التكامل نت للاتصالات وتقنية المعلومات — باقات إنترنت للمنازل والشركات في ليبيا. سرعات عالية، دعم فني 24/7، وحلول مخصصة.',
        },
        { name: 'theme-color', content: '#4f46e5' },
        // ── Open Graph افتراضي (يُستبدل في كل صفحة بـ useSeoMeta) ──
        { property: 'og:site_name', content: 'التكامل نت' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://altkamel.ly/images/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        // ✅ أيقونة التبويب (Favicon) - شعار الشركة
        { rel: 'icon', type: 'image/png', href: '/images/logo/logo.png' },
        { rel: 'apple-touch-icon', href: '/images/logo/logo.png' },
        // ✅ خطوط Google
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  // ✅ إعدادات Tailwind CSS
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  // ✅ إجبار esbuild على معالجة ملفات JS بـ UTF-8 لحل مشكلة النصوص العربية
  vite: {
    build: {
      rollupOptions: {
        output: {
          charset: 'utf8'
        }
      }
    },
    esbuild: {
      charset: 'utf8'
    }
  }
})
