/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
        backgroundImage: theme => ({
          'login-pic': "url('https://img.freepik.com/free-photo/abstract-bluish-paint-background-wallpaper_53876-97482.jpg')"
        })

    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
