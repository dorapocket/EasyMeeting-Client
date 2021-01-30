<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="main-avatar">
        <a-avatar :size="40" icon="user" />
        <div style="margin-left: 10px" v-show="!namedisplay">
          <div style="color: white">Dorapocket</div>
          <div style="color: white">李国宇</div>
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
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data: () => ({
    collapsed: false,
    namedisplay: false,
  }),
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
