<template>
  <!-- هذه الصفحة أصبحت جزءاً من لوحة التحكم الرئيسية -->
  <div></div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard' })

// إعادة توجيه تلقائية للـ dashboard — الباقات أصبحت tab داخل dashboard.vue
const router = useRouter()
onMounted(() => {
  router.replace('/portal/dashboard')
})
</script>
