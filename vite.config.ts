import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { compression } from 'vite-plugin-compression2'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    // ── Image compression ──────────────────────────────────────────
    // Compresses PNG/JPG/JPEG during build without visual quality loss.
    // Large images are the #1 cause of slow page speed scores.
    ViteImageOptimizer({
      png:  { quality: 82 },
      jpeg: { quality: 82 },
      jpg:  { quality: 82 },
      webp: { lossless: false, quality: 82 },
      // Skip HEIC — not supported by sharp
      include: /\.(png|jpe?g|webp|svg)$/i,
    }),

    // ── Brotli + Gzip compression ──────────────────────────────────
    // Pre-compresses all text assets (JS, CSS, HTML).
    // Vercel / Netlify / Cloudflare serve the .br / .gz files automatically.
    compression({ algorithms: ['brotliCompress'], exclude: [/\.(png|jpe?g|webp|heic|gif|svg)$/i] }),
    compression({ algorithms: ['gzip'],           exclude: [/\.(png|jpe?g|webp|heic|gif|svg)$/i] }),

    // ── Progressive Web App ────────────────────────────────────────
    // Adds a service worker that caches assets on first visit.
    // Repeat visits load instantly → better Core Web Vitals → better ranking.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Raha Bridal Studio & Beauty Lounge',
        short_name: 'Raha Bridal',
        description: 'Luxury bridal makeup, saree draping & beauty services in Trichy, Tamil Nadu',
        theme_color: '#2C1810',
        background_color: '#FDFAF6',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/favicon.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/favicon.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Only precache small app-shell assets (JS, CSS, HTML, fonts).
        // Images are large — cache them lazily via runtimeCaching instead.
        globPatterns: ['**/*.{js,css,html,woff2}'],
        globIgnores: ['**/*.{png,jpg,jpeg,PNG,JPG,webp,heic,HEIC,gif}'],
        runtimeCaching: [
          {
            // Google Fonts — cache for 1 year
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            // Portfolio / bridal images — serve from cache after first load,
            // refresh in background. Keeps repeat visits fast.
            urlPattern: /\.(?:png|jpg|jpeg|PNG|JPG|webp|svg)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'raha-images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],

  assetsInclude: ['**/*.HEIC', '**/*.heic'],

  build: {
    // Raise the warning threshold slightly — large images are expected for a photography portfolio
    chunkSizeWarningLimit: 600,
  },
})
