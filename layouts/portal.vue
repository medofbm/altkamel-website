<template>
  <div class="font-cairo min-h-full bg-gray-50 text-gray-800 flex flex-col relative" dir="rtl">
    <!-- Navbar الخاص بالبوابة -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 z-40 sticky top-0">
      <div class="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <!-- الشعار -->
        <NuxtLink href="/" class="flex items-center gap-3 group">
          <img src="/images/logo/logo.png" alt="شعار التكامل نت" class="h-8 w-auto group-hover:scale-105 transition-transform" />
          <div class="flex flex-col leading-tight">
            <span class="font-bold text-sm text-indigo-700">التكامل نت</span>
          </div>
        </NuxtLink>

        <!-- شريط الإجراءات الجانبي -->
        <div class="flex items-center gap-4">
           <!-- Dynamic Actions Injected Here if needed -->
           <slot name="header-actions" />
        </div>
      </div>
    </header>

    <!-- محتوى الصفحة -->
    <main class="flex-1 flex flex-col relative w-full h-full min-h-[calc(100vh-4rem)]">
      <slot />
    </main>
  </div>
</template>

<script setup>
// Portal Layout applies to /portal pages
</script>
