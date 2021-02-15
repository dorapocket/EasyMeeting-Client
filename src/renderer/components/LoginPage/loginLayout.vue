<template>
    <a-layout class="login-layout" style="height:100vh;">
      <a-layout-header style="line-height:1.5;padding:40px 50px;height:auto;">
        <div class="login-text" id="logo">EasyMeeting 会易</div>
        <div class="login-text" id="vers">v1.0</div></a-layout-header
      >
    <a-layout-content style="padding:0px 50px;">
        <a-row type="flex" justify="center" align="top">
          <a-col
            ><a-input
              style="margin-bottom:10px;"
              v-model="username"
              placeholder="手机/邮箱/用户名"
              :maxLength=40
            >
              <a-icon slot="prefix" type="user" /> </a-input
          ></a-col>
          <a-col>
            <a-input-password
              v-model="password"
              style="margin-bottom:10px;"
              placeholder="密码"
              :maxLength=40
            >
              <a-icon slot="prefix" type="key" /> </a-input-password
          ></a-col>
        </a-row>
        <a-checkbox
          class="login-text"
          style="margin-bottom:20px;"
          @change="autoLoginChange"
          :checked="autoLoginCheck"
        >
          自动登录
        </a-checkbox>

        <a-row class="login-text" type="flex" justify="center" align="top">
          <a-col>
            <a-button
              class="login-text"
              style="background-color:#1890ff5e;border-color:#1890ff5e;"
              @click="loginRequest"
              :loading="loginloading"
            >
              登录
            </a-button>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer
        class="login-text"
        id="login-footer"
        style="padding:15px 50px;text-align:center;"
      >
        欢迎使用EasyMeeting<br />
        <a style="opacity:70%" @click="toReg">用户注册</a>
      </a-layout-footer>
    </a-layout>
</template>
<script>
const { ipcRenderer } = require("electron");
import { message } from "ant-design-vue";
export default {
  data: () => ({
    loginloading: false,
    username: "",
    password: "",
    loginType: "",
    autoLoginCheck: false,
  }),
  mounted: function() {
    let remember =
      ipcRenderer.sendSync("getStorageSync", "loginRemember") || {};
    let token = ipcRenderer.sendSync("getStorageSync", "UserToken") || "";
    let that = this;

    if (remember.autologin) {
      this.loginloading = true;
      this.autoLoginCheck=true;
      this.username=remember.username;
      this.password="placeholder";// 为了美观补充一个密码
      let validToken = new Promise((reslove, reject) => {
        this.$http
          .get("/user/validToken", {
          })
          .then(function(response) {
            that.loginloading = false;
              ipcRenderer.send(
                "setStorageSync",
                "UserToken",
                response.data.data.token
              );
              that.getUserInfoAndSwitch(response.data.data.token);
            reslove();
          })
          .catch(function(error) {
            that.loginloading = false;
            // 登陆失败取消自动登录
            ipcRenderer.send(
              "setStorageSync",
              "loginRemember",
              {username:remember.username,autologin:false}
            );
            reject(error);
          });
      })
        .then(() => {})
        .catch((e) => {
          that.loginloading = false;
          console.log(e);
        });
    } else if (remember.username) {
      this.loginloading = false;
      this.username = remember.username || "";
      this.password = "";
    } else {
      this.loginloading = false;
      this.username = "";
      this.password = "";
    }
  },
  methods: {
    loginRequest() {
      this.loginloading = true;
      let that = this;
      let loginInfo = this.getLoginType(this.username);
      this.$http
        .post("/user/login", {
            username: loginInfo.username,
            certificate: that.password,
            loginType: loginInfo.type,
        })
        .then(function(response) {
          that.loginloading = false;
          if (response.data.code == 200) {
            console.log("Login Set Token:", response.data.token);
            ipcRenderer.send(
              "setStorageSync",
              "UserToken",
              response.data.token
            );
            ipcRenderer.send(
              "setStorageSync",
              "loginRemember",
              {username:that.username,autologin:that.autoLoginCheck}
            );
            that.getUserInfoAndSwitch(response.data.token);
          } else {
            message.warning(response.data.msg);
          }
        })
        .catch(function(error) {
          that.loginloading = false;
        });
    },
    getLoginType(username) {
      let returnValue = { username: username, type: "USERNAME" };
      // 用户名数字字母开头
      const REGS = {
        username: /^[a-zA-z]\w{3,15}$/,
        telephone: /^1\d{10}$/,
        email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      };
      if (REGS.telephone.test(username)) {
        returnValue.type = "TELEPHONE";
        return returnValue;
      }
      if (REGS.email.test(username)) {
        returnValue.type = "EMAIL";
        return returnValue;
      }
      return returnValue;
    },
    getUserInfoAndSwitch(token) {
      let that = this;
      this.$http
        .get("/user/userInfo", {
          params: {
            token: token,
          },
        })
        .then(function(response) {
          if (response.data.code == 200) {
            console.log("获取用户信息成功:", response.data.data);
            ipcRenderer.send("setStorageSync", "UserInfo", response.data.data);
            console.log("Login Set Token:", token);
            that.$store.commit("login/setLoginStatus",true);
            ipcRenderer.send("loginSuccess", token);
          } else {
            message.error("获取用户信息失败：" + response.data.msg);
          }
        })
        .catch(function(error) {});
    },
    toReg:function(){
        this.$store.commit("login/setLoginPage",'register')
    },
    autoLoginChange:function(e){
        this.autoLoginCheck=e.target.checked;
    }
  },
};
</script>
