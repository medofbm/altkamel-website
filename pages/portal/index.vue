<script setup>
definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/portal/login')
    }
  ]
})
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500 font-cairo">
    <div class="animate-pulse">جاري التحويل الآمن...</div>
  </div>
</template>
