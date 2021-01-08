import Vue from 'vue'
import axios from 'axios'
import Antd from 'ant-design-vue';
import App from './App'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import 'ant-design-vue/dist/antd.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Antd);
/*Vue.use(new VueSocketIO({
  debug: true,
  // 信令socket
  connection: 'http://47.106.167.117:65534',
  vuex: {
  },
 }))*/
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
