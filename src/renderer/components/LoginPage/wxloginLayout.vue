<template>
  <a-layout class="login-layout" style="height:100vh;">
    <a-layout-header style="line-height:1.5;padding:40px 50px;height:auto;">
      <div class="login-text" id="logo">EasyMeeting 会易</div>
      <div class="login-text" id="vers">v1.0</div></a-layout-header
    >
    <a-layout-content style="padding:0px 50px;">
      <a-row style="height:100%" class="login-text" type="flex" justify="center" align="top">
        <a-col style="height:100%">
      
      <div style="height:80%;display: flex;flex-direction: column;justify-content: center; text-align:center">
        <a-row style="height:100%" class="login-text" type="flex" justify="center" align="top">
        <a-col style="height:100%">
        <img v-if="imageReady" :src="imageUrl" style="width: auto; height: auto; max-width: 100%; max-height: 100%; border-radius:50%;" alt="">
        </a-col>
</a-row>
        <a-spin size="large" v-if="codeLoading"/>
        <span>{{loadingMsg}}</span>
      </div>
      <div class="login-text" style="text-align:center;margin-top:15px;height:20%" v-if="!codeLoading">{{tipMsg}}</div>
        </a-col></a-row>
    </a-layout-content>
    <a-layout-footer
      class="login-text"
      id="login-footer"
      style="padding:15px 50px;text-align:center;"
    >
      <a-icon type="user" style="color:white" @click="toPassword" /><br />
      欢迎使用EasyMeeting<br />
      <a style="opacity:70%" @click="toReg">用户注册</a>
    </a-layout-footer>
  </a-layout>
</template>
<script>
const { ipcRenderer } = require("electron");
import { message } from "ant-design-vue";
import io from "socket.io-client";
let wxsocket;
let tm;
function arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
export default {
  data: () => ({
    imageUrl: "",
    codeLoading:true,
    loadingMsg:"正在连接...",
    tipMsg:'',
    imageReady:false,
  }),
  mounted: function() {
    let that = this;
    let wxSocketUrl = ipcRenderer.sendSync("getStorageSync", "wxSocketUrl");
    tm=setTimeout(function(){
      if(!wxsocket.connected){
        that.loadingMsg="连接失败，请检查您的网络环境";
        that.tipMsg="";
        that.codeLoading=false;
        that.imageReady=false;
      }
    },5000);
    wxsocket = io.connect(wxSocketUrl);
    wxsocket.on("connect", () => {
      that.loadingMsg="请稍后";
      that.tipMsg="";
      that.codeLoading=true;
      that.imageReady=false;
    });
    wxsocket.on("disconnect", () => {
      that.loadingMsg='连接断开，请检查您的网络环境';
      that.tipMsg="";
      that.codeLoading=false;
      that.imageReady=false;
    });
    wxsocket.on("WXLOGIN_IMAGE_READY", function(url) {
      console.log(url);
      if (url) {
        let baseUrl = ipcRenderer.sendSync("getStorageSync", "baseURL");
        that.imageUrl=baseUrl+url;
        that.imageReady=true;
        that.codeLoading=false;
        that.loadingMsg='';
        that.tipMsg="请使用微信扫描小程序码登录";
      }
    });
  },
  methods: {
    toPassword: function() {
      this.$store.commit("login/setLoginPage", "login");
    },
    toReg: function() {
      this.$store.commit("login/setLoginPage", "register");
    },
  },
  beforeDestroy: function() {
    if (wxsocket && wxsocket.connected) {
      console.log("Destroy wx socket");
      clearTimeout(tm);
      wxsocket.disconnect();
    }
  },
};
</script>
