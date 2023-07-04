import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import DateFormat from '@voidsolutions/vue-dateformat'
import './assets/main.css'
import 'ant-design-vue/dist/antd.css';



const app = createApp(App)

app.use(Antd)
app.use(DateFormat)
app.use(router)
app.provide('router',router)

app.mount('#app')
