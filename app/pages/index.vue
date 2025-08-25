<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
          خوش آمدید به وبلاگ من
        </h1>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          جایی برای کشف ایده‌های جدید، یادگیری و الهام گرفتن
        </p>
        <div class="flex gap-4 justify-center">
          <button class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
            شروع کنید
          </button>
          <button class="px-8 py-3 bg-white text-gray-700 rounded-full font-medium border-2 border-gray-200 hover:border-purple-300 transition-all hover:shadow-md">
            بیشتر بدانید
          </button>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          ویژگی‌های برجسته
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <span class="text-3xl">✨</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">محتوای با کیفیت</h3>
            <p class="text-gray-600 leading-relaxed">
              مقالات آموزشی و کاربردی که با دقت و عشق نوشته شده‌اند
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <span class="text-3xl">🚀</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">به‌روزرسانی مداوم</h3>
            <p class="text-gray-600 leading-relaxed">
              هر هفته محتوای جدید و جذاب برای یادگیری بیشتر
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <span class="text-3xl">💬</span>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">جامعه فعال</h3>
            <p class="text-gray-600 leading-relaxed">
              با دیگران در ارتباط باشید و تجربیات خود را به اشتراک بگذارید
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Posts Section -->
    <section class="py-16 px-4 bg-gray-50/50">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          آخرین مطالب
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Post 1 -->
          <article class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
            <div class="p-6">
              <span class="text-sm text-purple-600 font-medium">تکنولوژی</span>
              <h3 class="text-lg font-bold mt-2 mb-3 text-gray-800">
                آینده هوش مصنوعی در ایران
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                نگاهی به روندهای جدید و فرصت‌های پیش رو در حوزه هوش مصنوعی
              </p>
              <a href="#" class="text-purple-600 font-medium text-sm hover:text-purple-700">
                ادامه مطلب ←
              </a>
            </div>
          </article>

          <!-- Post 2 -->
          <article class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-cyan-400"></div>
            <div class="p-6">
              <span class="text-sm text-blue-600 font-medium">طراحی</span>
              <h3 class="text-lg font-bold mt-2 mb-3 text-gray-800">
                اصول طراحی مدرن وب
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                یادگیری بهترین شیوه‌های طراحی رابط کاربری در سال ۲۰۲۴
              </p>
              <a href="#" class="text-purple-600 font-medium text-sm hover:text-purple-700">
                ادامه مطلب ←
              </a>
            </div>
          </article>

          <!-- Post 3 -->
          <article class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <div class="h-48 bg-gradient-to-br from-green-400 to-emerald-400"></div>
            <div class="p-6">
              <span class="text-sm text-green-600 font-medium">آموزش</span>
              <h3 class="text-lg font-bold mt-2 mb-3 text-gray-800">
                شروع برنامه‌نویسی از صفر
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                راهنمای کامل برای کسانی که می‌خواهند برنامه‌نویسی را شروع کنند
              </p>
              <a href="#" class="text-purple-600 font-medium text-sm hover:text-purple-700">
                ادامه مطلب ←
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 px-4">
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 class="text-3xl font-bold mb-4">
            عضو خبرنامه ما شوید
          </h2>
          <p class="mb-8 text-purple-100">
            از آخرین مطالب و اخبار با خبر شوید
          </p>
          <div class="flex gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="ایمیل خود را وارد کنید"
              class="flex-1 px-6 py-3 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
            <button class="px-8 py-3 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors">
              عضویت
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes gradient {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>