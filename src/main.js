import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import defaultDiscImage from './assets/images/default.png'
import "./assets/stylus/index.styl"

fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: defaultDiscImage
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
