import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import colors from './assets/styles/colors'
import './assets/styles/global.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'



import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import SearchBar from './components/searchbar.vue'
Vue.component('search-bar', SearchBar)

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.primary.base,
    secondary: colors.secondary.base,
    orange: colors.orange.base,
    teal: colors.teal.base
  },
  options: {
    themeVariations: ['primary', 'secondary']
  }
}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
