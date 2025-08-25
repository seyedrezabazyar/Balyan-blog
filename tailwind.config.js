/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                }
            },
            fontFamily: {
                sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
                persian: ['Vazirmatn', 'sans-serif'],
                english: ['Inter', 'system-ui', 'sans-serif']
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-slow': 'bounce 2s infinite',
                'blob': 'blob 7s infinite',
            },
            backdropBlur: {
                xs: '2px',
            },
            textShadow: {
                'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
                'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.1)',
                'lg': '0 4px 8px rgba(0, 0, 0, 0.2)',
            }
        },
    },
    plugins: [
        function({ addUtilities }) {
            const newUtilities = {
                '.text-shadow': {
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                },
                '.text-shadow-lg': {
                    textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                },
                '.direction-rtl': {
                    direction: 'rtl',
                },
                '.direction-ltr': {
                    direction: 'ltr',
                },
            }
            addUtilities(newUtilities)
        }
    ],
}
