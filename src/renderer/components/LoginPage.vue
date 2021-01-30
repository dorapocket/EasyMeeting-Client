<template>
  <div>
      未登录
            <a-input v-model="username" />
            <a-input v-model="password" />
            <a-button type="primary" @click="loginRequest"> 登录 </a-button>
            <a-spin size="large" v-if="loginloading"/>
            {{msg}}
  </div>
</template>
<script>
const { ipcRenderer } = require("electron");
export default {
  data: () => ({
    loginloading:false,
    username:'',
    password:'',
    msg:'msg',
    loginType:''
  }),
  created: function() {
    let remember = ipcRenderer.sendSync("getStorageSync","loginRemember") || {};
    let token = ipcRenderer.sendSync("getStorageSync", "UserToken") || "";
    let that=this;

    if(remember.autologin){
      this.loginloading=true
      let validToken = new Promise((reslove, reject) => {
      this.$http
        .get("/user/validToken", {
          params: {
            token,
          },
        })
        .then(function(response) {
          console.log(response);
          that.loginloading=false;
          if(response.data.code==200){
            ipcRenderer.sendSync("setStorageSync", "UserToken",response.data.data.token);
            ipcRenderer.sendSync("loginSuccess");
            console.log('Login Set Token:',response.data.data.token);
          }
          reslove();
        })
        .catch(function(error) {
          console.error("Checking Token Failed :", error.response.data.msg);
          that.loginloading=false;
          that.msg=error.response.data.msg;
          reject(error);
        });
    })
      .then(() => {})
      .catch((e) => {that.loginloading=false;
      console.log(e)
          that.msg="未知错误，请稍后重试";});
    }else if(remember.username){
      this.loginloading=false
      this.username=remember.username||'';
      this.password='';
    }else{
      this.loginloading=false
      this.username='';
      this.password='';
    }
  },
  methods:{
      loginRequest(){
          this.loginloading=true;
          let that=this;
          let loginInfo=this.getLoginType(this.username)
          this.$http.get("/user/login",{
          params: {
            username:loginInfo.username,
            certificate:that.password,
            loginType:loginInfo.type,
          }
        }).then(function(response){
            that.loginloading=false;
            if(response.data.code==200){
                console.log('Login Set Token:',response.data.token)
                ipcRenderer.sendSync("setStorageSync", "UserToken",response.data.token);
                ipcRenderer.sendSync("loginSuccess");
            }else{
                that.msg=response.data.msg
            }
        }).catch(function(error){
          that.loginloading=false;
          that.msg=error.response.data.msg;
        })
      },
      getLoginType(username){
          let returnValue={username:username,type:'USERNAME'};
// 用户名数字字母开头
          const REGS={
              username:/^[a-zA-z]\w{3,15}$/,
              telephone:/^1\d{10}$/,
              email:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
          }
          if(REGS.telephone.test(username)){
              returnValue.type='TELEPHONE'
              return returnValue;
          }
          if(REGS.email.test(username)){
              returnValue.type='EMAIL'
              return returnValue;
          }
          return returnValue;
      }
  }
};
</script>
