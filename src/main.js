import Vue from 'vue'
import App from './App.vue'
// import mixin from './mixin.js'

Vue.config.productionTip = false

// global vars
Vue.prototype.$backendServer = 'http://34.72.38.207/volume/market_summary'
// Vue.mixin(mixin)

new Vue ({
    // mixins: [mixin],
    render: h => h(App),
}).$mount('#app')
