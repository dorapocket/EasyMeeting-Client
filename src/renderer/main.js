import Vue from "vue";
import axios from "axios";
import Antd, { message } from "ant-design-vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
const { ipcRenderer } = require("electron");
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;

// 读取配置
let baseURL = ipcRenderer.sendSync("getStorageSync", "baseURL");
if (baseURL !== "") {
  console.warn("Server info:", baseURL);
  axios.defaults.baseURL = baseURL;
}
axios.defaults.timeout=5000;
var noAuth=['/user/register','/user/login'];
axios.interceptors.request.use(config=>{
  if(noAuth.indexOf(config.url)==-1){
    const token = ipcRenderer.sendSync("getStorageSync", "UserToken");
    token && (config.headers.Authorization = token);
  }
  return config;
},error=>{
  console.error(error);
  Promise.error(error);
});
axios.interceptors.response.use(response => {
    return response;
},error => {
  if (error.response&&error.response.status) {
    switch (error.response.status) {
      case 400:
        message.error(error.response.data.msg);
        break;
      // 401: 未登录
      case 401:
        message.error(error.response.data.msg);
        break;

      // 403: token过期
      case 403:
        message.error(error.response.data.msg);
        // 清除token
        break;

      // 404请求不存在
      case 404:
        message.error("您的请求不存在，请和管理员联系！");
        break;
      // 其他错误，直接抛出错误提示
      default:
        message.error(error.response.data.message.msg);
    }
    return Promise.reject(error);
  }else{
    message.error("请求超时，请检查网络连接后继续！");
    return Promise.reject(error);
  }
})


Vue.prototype.$sockets = []; // 定义socket数据结构 socket不能放到vuex中(会发生不经过mutations内容改变错误)！
/**
 * global内容
 * userInfo:{uid,realname,username,telephone,email} 设置和服务端的函数有关 返回的data直接赋值过来的
 */
Vue.config.productionTip = false;
Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
