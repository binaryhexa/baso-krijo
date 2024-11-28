/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      colors: {
        primary10: '#2A1113',
        primary20: '#2B0000',
        primary30: '#4F0000',
        primary40: '#740000',
        primary50: '#980000',
        primary60: '#B50000',
        primary70: '#D30000',
        primary80: '#EB1D1D',
        primary90: '#F50F0F',
        primary100: '#FF0000',
        neutral10: '#FFFFFF',
        neutral20: '#F5F5F6',
        neutral30: '#EEEEEF',
        neutral40: '#E1E2E3',
        neutral50: '#C3C4C7',
        neutral60: '#A0A2A6',
        neutral70: '#999CA2',
        neutral80: '#64686F',
        neutral90: '#434750',
        neutral100: '#0F141F',
        danger: '#E55353',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        }
      },
      animation: {
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
}

