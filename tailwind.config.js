/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF4444',
        'primary-light': '#FEE2E2',
        'sidebar-bg': '#2A3342',
        'sidebar-bg-light': '#1F2937',
        'sidebar-text': '#9CA3AF',
        'page-bg': '#F3F4F6',
        'card-bg': '#FFFFFF',
        'border-default': '#E5E7EB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        'gold': '#F59E0B',
      },
      animation: {
        'in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
