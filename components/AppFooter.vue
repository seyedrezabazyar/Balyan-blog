<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold mb-4">بلیان</h3>
          <p class="text-gray-400">
            راه‌حل‌های حرفه‌ای برای کسب و کار شما
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">لینک‌های سریع</h4>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition">
                خانه
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/services" class="text-gray-400 hover:text-white transition">
                خدمات
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-white transition">
                درباره ما
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-400 hover:text-white transition">
                بلاگ
              </NuxtLink>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">خدمات</h4>
          <ul class="space-y-2">
            <li class="text-gray-400">مشاوره کسب و کار</li>
            <li class="text-gray-400">توسعه نرم‌افزار</li>
            <li class="text-gray-400">دیجیتال مارکتینگ</li>
            <li class="text-gray-400">طراحی وب‌سایت</li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4">تماس با ما</h4>
          <ul class="space-y-2 text-gray-400">
            <li>📧 info@balyan.com</li>
            <li>📱 ۰۲۱-۱۲۳۴۵۶۷۸</li>
            <li>📍 تهران، خیابان ولیعصر</li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2024 بلیان. تمامی حقوق محفوظ است.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>