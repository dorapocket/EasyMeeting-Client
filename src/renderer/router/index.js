import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/proj',
      name: 'proj',
      component: require('@/components/ProjPage').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/SettingsPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
