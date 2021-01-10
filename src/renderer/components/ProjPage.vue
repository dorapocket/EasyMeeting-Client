<template>
  <div
    :style="{
      margin: '24px 16px',
      padding: '24px',
      height: '90%',
      background: '#fff',
    }"
  >
    <!--<div @click="getMedia">getMedia
  </div>
  <video id="videos" style="height:300px;width:600px;"></video>-->
    <a-steps>
      <a-step
        :status="step > 1 ? 'finish' : step == 1 ? 'process' : 'wait'"
        title="投屏码"
      >
        <a-icon slot="icon" type="lock" />
      </a-step>
      <a-step
        :status="step > 2 ? 'finish' : step == 2 ? 'process' : 'wait'"
        title="投屏内容"
      >
        <a-icon slot="icon" type="block" />
      </a-step>
      <a-step
        :status="step > 3 ? 'finish' : step == 3 ? 'process' : 'wait'"
        title="开始投屏"
      >
        <a-icon slot="icon" type="video-camera" />
      </a-step>
    </a-steps>

    <div v-if="step == 1">
      <input-proj-code></input-proj-code>
    </div>
    <div v-if="step == 2" style="height: 100%">
      <select-proj-screen></select-proj-screen>
    </div>
    <div
      v-if="step == 3"
      style="display: flex; flex-direction: column; height: 100%"
    >
      <rtc-connection></rtc-connection>
    </div>
  </div>
</template>
<style lang="css">
</style>
<script>
import { message } from "ant-design-vue";
import { desktopCapturer } from "electron";
import io from "socket.io-client";
import InputProjCode from "./ProjPage/inputProjCode.vue";
import SelectProjScreen from "./ProjPage/selectProjScreen.vue";
import RtcConnection from './ProjPage/rtcConnection.vue';
let socket;
let peerConnection;
let Screensources;

export default {
  components: { InputProjCode, SelectProjScreen, RtcConnection },
  computed: {
      step:function(){
      return this.$store.state.projPage.projStep;
    }
  },
  methods: {
  },
  created:function(){
    console.log(this.$store);
  }
};
</script>