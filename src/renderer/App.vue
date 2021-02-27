<template>
  <div>
    <!--FIXME: debug message
    <login-page v-if="!loginStatus"></login-page>
    <main-page v-else></main-page>-->
    <main-page></main-page>
  </div>
</template>
<style>
a-button{
  -webkit-app-region: no-drag;
}
</style>
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