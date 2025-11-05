import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        // brand tokens
        'brand-light': '#FDE7B3', // warm pale
        'brand-yellow': '#FFC50F', // bright yellow
        'brand-green': '#63A361', // main green
        'brand-olive': '#5B532C', // dark accent / olive
      },
      // optional: custom boxShadow or ring color
      ringColor: {
        brand: '#63A361'
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
