import axios from "axios";
import { message } from "ant-design-vue";
const { ipcRenderer } = require("electron");
const state = {
  loginStatus:false, // 登陆状态 控制显示主页和登录页
  loginPage:'login', // 登录页注册register和登录login显示哪个
};

const mutations = {
  setLoginStatus(state, n) {
    state.loginStatus = n;
  },
  setLoginPage(state, n) {
    state.loginPage = n;
  },
};

const actions = {
  openCreateMeetingModal({ commit }, value) {
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
