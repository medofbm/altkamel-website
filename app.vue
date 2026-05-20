<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  // ✅ Capacitor تعمل فقط في بيئة Client — dynamic import يمنع أخطاء SSR
  if (typeof window !== 'undefined') {
    try {
      const { App } = await import('@capacitor/app');
      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        } else {
          window.history.back();
        }
      });
    } catch {
      // ليست بيئة Capacitor (متصفح عادي) — لا شيء يحدث
    }
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
