import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/tailwind.css'

const app = createApp(App)
app.provide('router', router)

app.use(router)

app.mount('#app')
