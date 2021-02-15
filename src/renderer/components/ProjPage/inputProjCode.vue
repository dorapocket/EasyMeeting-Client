<template>
  <div>
    <div style="display: flex; justify-content: center; padding-top: 25px">
      <img
        class="projbigimg"
        src="~@/assets/computer_proj.svg"
        alt="computer_proj"
      />
    </div>
    <div style="display: flex; justify-content: center; padding-top: 15px">
      <a-input
        id="inputProj"
        ref="projCode"
        v-model="projCode"
        placeholder="投屏码"
        style="width: 30vw"
      >
        <a-tooltip slot="suffix" title="投屏码请在投屏端的画面中寻找哦~">
          <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </a-input>
    </div>
    <div style="display: flex; justify-content: center; padding-top: 15px">
      <a-button
        :loading="btnloading"
        type="primary"
        shape="round"
        icon="api"
        size="large"
        style="margin-top: 10px"
        @click="connectToProj"
        >连接</a-button
      >
    </div>
  </div>
</template>
<style>
#inputProj {
  height: 50px;
  font-size: 140%;
  font-weight: 600;
  letter-spacing: 10px;
  text-align: center;
}
</style>
<script>
import { message } from "ant-design-vue";
const { ipcRenderer } = require("electron");
import io from "socket.io-client";
let store;
let $store;
export default {
  computed: {
    projCode: {
      get() {
        return store.projCode;
      },
      set(value) {
        $store.commit("projPage/setProjCode", value);
      },
    },
    btnloading: function() {
      return store.connectBtnLoading;
    },
  },
  created: function() {
    store = this.$store.state.projPage;
    $store = this.$store;
  },
  methods: {
    connectToProj: function() {
      let that = this;
      let socket = this.$sockets["rtc"];
      $store.commit("projPage/setConnectBtnLoading", true);
      if (socket) {
        socket.disconnect(); //!socket.connected
      }
      
        let rtcURL = ipcRenderer.sendSync("getStorageSync", "rtcServer");
        console.log(rtcURL);
        socket = io.connect(rtcURL);
        this.$sockets["rtc"] = socket;
      socket.on("connect", function() {
        /**/
      });
      socket.on("VERIFY",function(){
        let token = ipcRenderer.sendSync("getStorageSync", "UserToken");
        socket.emit("VERIFY_FEEDBACK",token);
      });
      socket.on("VERIFY_RESPONCE",function(obj){
        if(obj.code==200){
          socket.emit("CONFIG",ipcRenderer.sendSync("getStorageSync", "UserInfo"));
        }else{
          message.error(obj.msg);
        }
      });
      socket.on("CONFIG_FEEDBACK",obj=>{
        $store.commit("projPage/setRtcConfig",obj.config);
        console.log(obj);
        socket.emit("CONNECT_TO_TV", {
          username: "lgy",
          projCode: store.projCode.toUpperCase(),
        });
      });

      socket.on("CONNECT_TO_TV_FAILED", (data) => {
        console.error("Connecting to TV failed. Reason:" + data.msg);
        message.error(data.msg);
        socket.close();
        $store.commit("projPage/setConnectBtnLoading", false);
      });
      socket.on("CONNECT_TO_TV_SUCCESS", (data) => {
        console.log("Connecting success!");
        message.success(data.msg);
        $store.commit("projPage/setProjStep", 2);
        // this.getMedia();
      });
      socket.on("NEW_CLIENT_JOIN", (data) => {
        console.log("A new Client join, username: " + data.username);
      });
      socket.on("disconnect", function() {
        console.warn("A connection to server has disconnected.");
        $store.commit("projPage/setConnectBtnLoading", false);
      });
    },
  },
};
</script>
