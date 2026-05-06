// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ✅ SPA Mode — يولّد ملفات HTML/JS/CSS ثابتة بدون Node.js server
  //    مثالي لـ cPanel shared hosting (Apache / LiteSpeed)
  ssr: false,

  // ✅ المتغيرات العامة (Runtime Config)
  runtimeConfig: {
    public: {
      // مفتاح AES لتشفير SASv4 — احفظه في .env: NUXT_PUBLIC_SAS_AES_KEY=xxxx
      sasAesKey: '',
      // ⚠️ في SPA mode لا يوجد Nitro proxy، نستخدم /sas-api/ وندير الـ proxy عبر .htaccess
      sasApiBase: '/sas-api',
    }
  },

  // ✅ Nitro — preset static لـ npm run generate
  nitro: {
    preset: 'static',
    // ملاحظة: routeRules proxy لا تعمل في static mode
    // الـ CORS proxy الآن يعمل عبر .htaccess (RewriteRule في public_html)
    routeRules: {
      '/sas-api/**': { proxy: 'https://altkamel.ly/sas-api/**' }
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
      title: 'شركة التكامل نت',
      meta: [
        {
          name: 'description',
          content:
            'شركة التكامل للاتصالات وتقنية المعلومات - نقدم أفضل خدمات الإنترنت للمنازل والشركات، شبكات مخصصة، وحلول الأمن السيبراني.',
        },
        { name: 'theme-color', content: '#4f46e5' },
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
