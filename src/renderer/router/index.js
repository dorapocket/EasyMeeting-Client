import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      //component: require('@/components/AdminPage').default,
      meta:{
        keepAlive:true,
      },
      // FIXME: debug message
      component: require('@/components/LandingPage').default
    },
    {
      path: '/proj',
      name: 'proj',
      component: require('@/components/ProjPage').default,
      meta:{
        keepAlive:true,
      }
    },
    {
      path: '/message',
      name: 'message',
      component: require('@/components/MessagePage').default,
      meta:{
        keepAlive:false,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: require('@/components/AdminPage').default,
      meta:{
        keepAlive:false,
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/SettingsPage').default,
      meta:{
        keepAlive:true,
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
