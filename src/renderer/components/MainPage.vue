<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="main-avatar">
        <a-avatar :size="40" icon="user" />
        <div style="margin-left: 10px" v-show="!namedisplay">
          <div style="color: white">{{username}}</div>
          <div style="color: white">{{realname}}</div>
        </div>
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item class="clickable" key="1"
          ><router-link to="/home">
            <a-icon type="user" />
            <span>日程</span></router-link
          >
        </a-menu-item>

        <a-menu-item class="clickable" key="2"
          ><router-link to="/proj">
            <a-icon type="video-camera" />
            <span>投屏</span></router-link
          >
        </a-menu-item>

<a-menu-item class="clickable" key="3"
          ><router-link to="/message">
            <a-icon type="message" />
            <span>通知</span></router-link
          >
        </a-menu-item>
        <a-sub-menu class="clickable" key="sub1">
          <span slot="title"><a-icon type="appstore" /><span>管理</span></span>
          <a-menu-item key="sub1-1">
            <router-link to="/admin?type=meetingRoom">会议室管理</router-link>
          </a-menu-item>
          <a-menu-item key="sub1-2">
            <router-link to="/admin?type=device">设备管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item class="clickable" key="4"
          ><router-link to="/settings">
            <a-icon type="setting" />
            <span>设置</span></router-link
          >
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger clickable"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collclick"
        />
      </a-layout-header>
      <a-layout-content>
          <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
const { ipcRenderer } = require("electron");
export default {
  data: () => ({
    collapsed: false,
    namedisplay: false,
  }),
  computed:{
    username:function(){
      return ipcRenderer.sendSync('getStorageSync','UserInfo').username;
    },
    realname:function(){
return ipcRenderer.sendSync('getStorageSync','UserInfo').realname
    }
  },
  methods: {
    collclick: function () {
      this.collapsed = !this.collapsed;
      if (!this.collapsed) {
        setTimeout(() => {
          this.namedisplay = !this.namedisplay;
        }, 100);
      } else {
        this.namedisplay = !this.namedisplay;
      }
    },
  },

};
</script>
<style>
.clickable {
  -webkit-app-region: no-drag;
}
#components-layout-demo-custom-trigger {
  height: 100vh;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  margin: 16px;
  color: white;
  font-size: 20px;
  font-weight: 600;
}
.main-avatar {
  display: flex;
  flex-direction: row;
  margin: 10px 0px 10px 20px;
  color: white;
}
</style>
