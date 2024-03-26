import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
    ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

import pinia from './store/index.js'

import './utils/utils.js'
export function createApp() {
    const app = createSSRApp(App)
    //注册
    app.use(pinia)
    return {
        app,
    }
}

// #endif
