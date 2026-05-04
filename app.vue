<script setup>
import { onMounted } from 'vue';
import { App } from '@capacitor/app';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      App.exitApp();
    } else {
      window.history.back();
    }
  });
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
