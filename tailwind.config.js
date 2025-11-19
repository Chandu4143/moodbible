/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2C5F58', // Deep Teal
                    light: '#4A7F78',
                    dark: '#1A3F3A',
                },
                secondary: {
                    DEFAULT: '#8DA399', // Sage Green
                    light: '#AEC2B9',
                },
                background: {
                    DEFAULT: '#FAFAF9', // Warm White
                    sand: '#F5F5F0',
                },
                text: {
                    DEFAULT: '#2D3748', // Dark Slate
                    muted: '#718096',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'breathe': 'breathe 4s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' },
                },
            },
        },
    },
    plugins: [],
}
