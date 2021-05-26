<template>
  <div>
    <div class="clickable" @click="closeWindow" style="float:right;background-color:rgb(236,106,94);border-radius:5px;width:10px;height:10px;top:10px;right:10px;z-index:10000;position:fixed;"></div>
    <div class="clickable" @click="smallWindow" style="float:right;background-color:rgb(245,190,79);border-radius:5px;width:10px;height:10px;top:10px;right:30px;z-index:10000;position:fixed;"></div>
    <login-page v-if="!loginStatus"></login-page>
    <main-page v-else></main-page>
    <!--FIXME: debug message
    <main-page></main-page>-->
  </div>
</template>
<style>
a-button,a-input,a{
  -webkit-app-region: no-drag;
}

.clickable {
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
  methods:{
      closeWindow:function(){
    ipcRenderer.send('quitApp');
  },
  smallWindow:function(){
ipcRenderer.send('minApp');
  }
  }

};
</script>