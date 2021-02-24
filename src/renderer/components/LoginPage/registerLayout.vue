<template>
    <a-layout class="login-layout" style="height:100vh;">
      <a-layout-header style="line-height:1.5;padding:20px 50px 10px 50px;height:auto;">
        <div class="login-text" id="logo">用户注册</div>
      </a-layout-header>
      <!--TODO: 国际化增加长度！-->
    <a-layout-content style="padding:0px 50px;">
        <a-row type="flex" justify="center" align="top">
          <a-col
            ><a-input
              style="margin-bottom:10px;"
              v-model="username"
              placeholder="用户名"
              :maxLength=20
            >
              <a-icon slot="prefix" type="user" /> </a-input
          ></a-col>
          <a-col
            ><a-input
              style="margin-bottom:10px;"
              v-model="realname"
              placeholder="真实姓名"
              :maxLength=10
            >
              <a-icon slot="prefix" type="smile" /> </a-input
          ></a-col>
          <a-col
            ><a-input
              style="margin-bottom:10px;"
              v-model="telephone"
              placeholder="手机号码"
              :maxLength=11
            >
              <a-icon slot="prefix" type="mobile" /> </a-input
          ></a-col>
          <a-col
            ><a-input
              style="margin-bottom:10px;"
              v-model="email"
              placeholder="电子邮件"
              :maxLength=40
            >
              <a-icon slot="prefix" type="mail" /> </a-input
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
        
            <a-button
              class="login-text"
              style="background-color:#1890ff5e;border-color:#1890ff5e;"
              @click="registerRequest"
              :loading="registerloading"
            >
              注册
            </a-button></a-row>
      </a-layout-content>
      <a-layout-footer
        class="login-text"
        id="login-footer"
        style="padding:15px 50px;text-align:center;"
      >
        欢迎使用EasyMeeting<br />
        <a style="opacity:70%" @click="goback">返回登陆页面</a>
      </a-layout-footer>
    </a-layout>
</template>
<script>
const { ipcRenderer } = require("electron");
import { message } from "ant-design-vue";
const REGS = {
        username: /^[a-zA-z]\w{3,15}$/,
        telephone: /^1\d{10}$/,
        email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
      };
export default {
  data: () => ({
    registerloading: false,
    username: "",
    password: "",
    realname:"",
    telephone:"",
    email:""
  }),
  methods:{
      registerRequest:function(){
          this.registerloading=true;
          let that=this;
         if(this.validInput()){
              this.$http
        .post("/user/register", {
            username: that.username,
            certificate: that.password,
            realname: that.realname,
            telephone:that.telephone,
            email:that.email,
        }).then(response=>{
            that.registerloading=false;
            that.$store.commit("login/setLoginPage",'login');
            message.success('注册成功！请及时在设置中验证您的邮箱等信息');
        }).catch(e=>{
            that.registerloading=false;
        })
         }else{
             this.registerloading=false;
         }
      },
      validInput:function(){
           if (this.username==''||this.realname==''||this.telephone==''||this.email==''||this.password==''){
              message.error('请将所有信息填写完整！');
              return false;
          }
          if (!REGS.username.test(this.username)){
message.error('用户名必须以字母开头，请重新输入');return false;
          }else if(!REGS.telephone.test(this.telephone)){
message.error('手机号码输入有误，请重新输入');return false;
          }else if(!REGS.email.test(this.email)){
              message.error('电子邮件输入有误，请重新输入');return false;
          }
          return true;
      },
      goback:function(){
          this.$store.commit("login/setLoginPage",'login');
      }
  },
  mounted:function(){
    this.$matomo && this.$matomo.trackPageView('register');
  }
}
</script>