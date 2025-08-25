<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-lg">ب</span>
            </div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              وبلاگ من
            </h1>
          </div>
          <ul class="flex space-x-8 text-gray-600">
            <li><NuxtLink to="/" class="hover:text-purple-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-purple-50">🏠 خانه</NuxtLink></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-purple-50">👤 درباره</a></li>
            <li><a href="#" class="hover:text-purple-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-purple-50">📧 تماس</a></li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-white/50 backdrop-blur-md border-t border-gray-200/50 mt-20">
      <div class="max-w-6xl mx-auto px-4 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold">ب</span>
              </div>
              <h3 class="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                وبلاگ من
              </h3>
            </div>
            <p class="text-gray-600 leading-relaxed max-w-md">
              جایی برای به اشتراک گذاری ایده‌ها، تجربه‌ها و یادگیری‌های جدید.
              با ما همراه باشید در این سفر هیجان‌انگیز!
            </p>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-4">دسته‌بندی‌ها</h4>
            <ul class="space-y-2 text-gray-600">
              <li><a href="#" class="hover:text-purple-600 transition-colors">💡 تکنولوژی</a></li>
              <li><a href="#" class="hover:text-purple-600 transition-colors">🎨 طراحی</a></li>
              <li><a href="#" class="hover:text-purple-600 transition-colors">🌱 سبک زندگی</a></li>
              <li><a href="#" class="hover:text-purple-600 transition-colors">📚 آموزش</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 mb-4">ارتباط با ما</h4>
            <ul class="space-y-2 text-gray-600">
              <li><a href="#" class="hover:text-purple-600 transition-colors">📧 ایمیل</a></li>
              <li><a href="#" class="hover:text-purple-600 transition-colors">📱 تلگرام</a></li>
              <li><a href="#" class="hover:text-purple-600 transition-colors">🐦 توییتر</a></li>
              <li><a href="#" class="hover:text-purple-600 transition-colors">📷 اینستاگرام</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-6 text-center">
          <p class="text-gray-500">
            &copy; ۱۴۰۳ وبلاگ من • ساخته شده با 💜 و ☕
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* فونت فارسی */
body {
  font-family: 'Tahoma', 'Arial', sans-serif;
  direction: rtl;
}
</style>
