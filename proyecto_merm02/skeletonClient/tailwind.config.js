/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.65rem', // Añade un tamaño de fuente más pequeño
      },
      screens: {
        'custom': '1650px', // Añade un nuevo punto de interrupción llamado 'custom'
      },
    }
  },
  plugins: [/*require('flowbite/plugin')*/]
}
