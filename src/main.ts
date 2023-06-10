import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import store from './store/index'
import VueApexCharts from 'vue3-apexcharts'

// vercel analytics
import { inject } from '@vercel/analytics'
inject()

const app = createApp(App)


app.use(naive)
app.use(store)
app.use(VueApexCharts)
app.mount('#app')
