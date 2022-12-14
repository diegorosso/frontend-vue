import { createApp } from 'vue'
import App from './App.vue'

import 'bootswatch/dist/lux/bootstrap.min.css'
import router from './router'


createApp(App).use(router).mount('#app')
