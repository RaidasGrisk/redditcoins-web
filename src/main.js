import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// global vars
Vue.prototype.$api_data = {
  data_ready_flag: false,
  api_resp: null,
  api_resp_: null,
  vol_order: [],
  vol_pct_change: {},
  vol_pct_change_: {},
  time: []
}

new Vue ({
    render: h => h(App),
}).$mount('#app')
