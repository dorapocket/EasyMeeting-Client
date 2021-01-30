import Vue from "vue";
import axios from "axios";
import Antd from "ant-design-vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
const { ipcRenderer } = require("electron");
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;

// 读取配置
let baseURL = ipcRenderer.sendSync("getStorageSync", "baseURL");
console.log(baseURL);
if (baseURL !== "") {
  console.warn("Server info:", baseURL);
  axios.defaults.baseURL = baseURL;
}


Vue.prototype.$sockets = []; // 定义socket数据结构 socket不能放到vuex中(会发生不经过mutations内容改变错误)！
Vue.config.productionTip = false;
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
