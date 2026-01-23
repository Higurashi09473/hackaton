import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0',          // слушаем на всех интерфейсах (Tailscale и т.д.)
        strictPort: true,
        allowedHosts: [
            'xn----etbdfash4aeavd9h.xn--p1ai',
            'www.xn----etbdfash4aeavd9h.xn--p1ai',
            'город-решений.рф', 
            'www.город-решений.рф'],

        hmr: {
            https: false,
            host: 'город-решений.рф',     // именно твой домен
            // protocol: 'wss',        // обязательно wss, потому что Nginx Proxy Manager terminates TLS
        },
        proxy: {
            // Все запросы, которые начинаются с /api,
            // будут перенаправлены на твой бэкенд
            '/api': {
                target: 'http://сервер.город-решений.рф',
                changeOrigin: true,           // меняет заголовок Host на target
                secure: false,                // если http, а не https
            }
        }
    },
})
