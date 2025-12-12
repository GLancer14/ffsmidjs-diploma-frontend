import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "~/assets/scss/_buttons.scss" as buttons;
          @use "~/assets/scss/_colors.scss" as colors;
          @use "~/assets/scss/_fonts.scss" as fonts;
          @use "~/assets/scss/_text.scss" as text;
        `
      }
    }
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  }
})
