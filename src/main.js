import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from './router'

const app = createApp(App)

// 插件统一挂载
app.use(router)
app.use(ElementPlus)

// 挂载应用
app.mount('#app')