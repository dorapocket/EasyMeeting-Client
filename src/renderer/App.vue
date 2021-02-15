<template>
  <div>
    <login-page v-if="!loginStatus"></login-page>
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
  computed:{
    loginStatus:function(){
      return this.$store.state.login.loginStatus;
    }
  },
};
</script>