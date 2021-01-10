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
Vue.prototype.$sockets = []; // 定义socket数据结构 socket不能放到vuex中！
Vue.config.productionTip = false
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
