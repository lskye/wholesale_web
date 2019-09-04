import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.api = 'http://localhost:3000/api'

new Vue({
  el:'#app',
  router,
  render: h => h(App),
}).$mount('#app')
