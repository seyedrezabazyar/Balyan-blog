export default defineEventHandler(async (event) => {
    const { slug } = event.context.params as { slug: string }

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/${slug}`

    try {
        const data = await $fetch(targetUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            timeout: 5000
        })

        return data
    } catch (error) {
        console.error('Error proxying book detail API:', error)

        // Return mock book detail when API is not available
        const bookId = slug.includes('-') ? parseInt(slug.split('-').pop() || '1') : 1

        const mockBook = {
            id: bookId,
            slug,
            title: `کتاب نمونه با شناسه ${slug}`,
            excerpt: 'این خلاصه‌ای از کتاب نمونه است که برای نمایش در رابط کاربری استفاده می‌شود.',
            content: `
        <h2>درباره این کتاب</h2>
        <p>این یک کتاب نمونه است که برای آزمایش رابط کاربری ایجاد شده است. محتوای واقعی کتاب از پایگاه داده دریافت خواهد شد.</p>

        <h3>فصل اول: مقدمه</h3>
        <p>در این فصل با مفاهیم پایه آشنا می‌شویم و پیش‌نیازهای لازم برای مطالعه کتاب بررسی می‌شود.</p>

        <h3>فصل دوم: مفاهیم اصلی</h3>
        <p>در این بخش به بررسی مفاهیم اصلی و اساسی موضوع می‌پردازیم.</p>

        <h3>فصل سوم: کاربردها</h3>
        <p>نحوه استفاده عملی از مطالب آموخته شده در پروژه‌های واقعی.</p>
      `,
            cover_image: null,
            isbn: `978-${bookId}-${Math.random().toString().substr(2, 8)}`,
            publication_year: 2020 + (bookId % 5),
            pages_count: 250 + bookId,
            language: bookId % 3 === 0 ? 'en' : 'fa',
            view_count: Math.floor(Math.random() * 15000),
            like_count: Math.floor(Math.random() * 500),
            download_count: Math.floor(Math.random() * 1000),
            created_at: new Date().toISOString(),
            formatted_date: 'چند روز پیش',
            authors: [
                {
                    id: 1,
                    name: 'دکتر احمد محمدی',
                    bio: 'نویسنده و پژوهشگر حوزه فناوری اطلاعات'
                },
                {
                    id: 2,
                    name: 'مهندس سارا رضایی',
                    bio: 'متخصص طراحی و توسعه نرم‌افزار'
                }
            ],
            category: {
                id: 1,
                name: 'برنامه‌نویسی',
                slug: 'programming',
                description: 'کتاب‌های مربوط به برنامه‌نویسی و توسعه نرم‌افزار'
            },
            publisher: {
                id: 1,
                name: 'انتشارات نوین',
                description: 'ناشر کتب تخصصی فناوری اطلاعات'
            },
            available_formats: ['pdf', 'epub', 'mobi']
        }

        return {
            success: true,
            data: {
                book: mockBook
            },
            message: 'جزئیات کتاب با موفقیت دریافت شد (داده نمونه)'
        }
    }
})
