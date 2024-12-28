import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    proxy:{
      // 获取路径中包含了/api的请求
      '/api':{
        target:'http://localhost:8080',// 后端服务所在的源
        changeOrigin:true,// 修改源
        rewrite:(path)=>path.replace(/^\/api/,'')
      }
    }
  }
})
