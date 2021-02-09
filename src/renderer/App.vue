<template>
  <div>
    <login-page v-if="login"></login-page>
    <main-page v-else></main-page>
  </div>
</template>
<script>
import MainPage from "./components/MainPage.vue";
import LoginPage from "./components/LoginPage.vue";
const { ipcRenderer } = require("electron");
export default {
  components: { MainPage, LoginPage },
  data: () => ({
    login: true,
  }),
  created: function() {
    let stat = ipcRenderer.sendSync("getStorageSync", "loginStatus");
    if (stat) {
      this.login = false;
    } else {
      this.login = true;
    }
  },
  methods:{
    setLoginStatus(stat){
      this.login=!stat;
    }
  }
};
</script>