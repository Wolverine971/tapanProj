import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import results from './components/results'
import landing from './components/landing'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: landing
    },
    {
      path: '/results',
      name: 'results',
      component: results
    },
    {
      path: '/landing',
      name: 'Landing',
      component: landing
    }
  ]
})
