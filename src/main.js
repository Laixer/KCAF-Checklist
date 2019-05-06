import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import routes from './routes/routes'

Vue.config.productionTip = false

Vue
  .use(VueRouter)

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
