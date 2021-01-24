<template>
  <div>
    <a-spin
      size="large"
      :tip="tip"
      v-if="connectloading"
      style="margin:auto;transform(1.2);"
    />
    <div
      v-if="!connectloading"
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-top: 15px;
      "
    >
      <img
        v-if="connectionStatus"
        class="projbigimg"
        src="~@/assets/projector.svg"
        alt="projector"
      />
      <img
        v-if="!connectionStatus"
        class="projbigimg"
        src="~@/assets/error.svg"
        alt="error"
      />
      <h2 style="text-align: center">{{ tip }}</h2>
      <a-button
        type="danger"
        shape="round"
        :icon="step3btnicon"
        size="large"
        style="margin: auto; margin-top: 15px"
        @click="stopShare"
        >{{ step3btn }}</a-button
      >
    </div>
  </div>
</template>
<script>
let store;
let $store;
let peerConnection;
let socket;
let transferStream = new MediaStream();
let Screensources;
const configuration = {
  iceServers: [
    {
      urls: "turn:turn.lgyserver.top:3478?transport=udp",
      username: "1610198274:dorapocket",
      credential: "EJMqW3VxFEoxwwT+0p2NOwLFLBQ=",
    },
    {
      urls: "turn:turn.lgyserver.top:3478?transport=tcp",
      username: "1610198274:dorapocket",
      credential: "EJMqW3VxFEoxwwT+0p2NOwLFLBQ=",
    },
    { urls: "stun:turn.lgyserver.top:3478" },
  ],
  iceCandidatePoolSize: 2,
};
export default {
  data: () => ({
    tip: "正在连接到投屏端...",
    connectloading: true,
    connectionStatus: false,
  }),
  computed: {
    tip: function () {
      return store.connectTip;
    },
    step3btnicon: function () {
      return this.connectionStatus ? "close" : "rollback";
    },
    step3btn: function () {
      return this.connectionStatus ? "停止投屏" : "重试";
    },
  },
  created:function(){
       store = this.$store.state.projPage;
    $store = this.$store;
  },
  mounted: async function () {
    socket = this.$sockets['rtc'];
    transferStream = new MediaStream();
    Screensources = store.screenSources;
    await this.connectRTC(store.selectScreenID);
  },
  methods: {
    connectRTC: async function (screenid) {
      let that = this;
      try {
        this.tip = "正在连接到投屏端...";
        peerConnection = new RTCPeerConnection(configuration);
        peerConnection.onicecandidate = function (event) {
          console.log(event);
          if (event.candidate) {
            socket.emit("RTC_Candidate_Exchange", {
              iceCandidate: event.candidate,
            });
          }
        };
        peerConnection.onconnectionstatechange = function (event) {
          console.log(
            "RTC Connection State Change :",
            peerConnection.connectionState
          );
          if (peerConnection.connectionState == "connected") {
            that.tip = "正在投屏";
            that.connectloading = false;
            that.connectionStatus = true;
          }
          if (peerConnection.connectionState == "failed") {
            that.tip = "连接失败，请稍后重试";
            that.connectloading = false;
            that.connectionStatus = false;
          }
          if (peerConnection.connectionState == "disconnected") {
            that.tip = "连接断开，请重试";
            that.connectloading = false;
            that.connectionStatus = false;
          }
        };
        peerConnection.onicegatheringstatechange = function (event) {
          console.log("RTC ICE Gathering State Change:", event);
        };
        peerConnection.onicecandidateerror = function (event) {
          console.log("RTC ICE Err:", event);
        };

        transferStream = await navigator.mediaDevices.getUserMedia({
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: Screensources[screenid].id,
              minWidth: 640,
              maxWidth: 1920,
              minHeight: 360,
              maxHeight: 1080,
            },
          },
        });
      } catch (e) {
        console.log("RTC Error", e);
        that.tip = "初始化投屏信息时出错";
        that.connectloading = false;
        that.connectionStatus = false;
      }

      peerConnection.addStream(transferStream);
      const offer = await peerConnection.createOffer({
        offerToReceiveVideo: 1,
      });
      await peerConnection.setLocalDescription(offer);
      socket.emit("RTC_Client_Offer_To_Server", {
        offer: offer,
      });
      socket.on("RTC_TV_Answer_To_Client", async (msg) => {
        if (msg.answer) {
          try {
            const remoteDesc = new RTCSessionDescription(msg.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
            console.log("RTC TV answer received", peerConnection);
          } catch (e) {
            that.tip = "建立与投屏端的链接时出错";
            that.connectloading = false;
            that.connectionStatus = false;
          }
        }
      });
      socket.on("RTC_Candidate_Exchange", async (message) => {
        if (message.iceCandidate) {
          try {
            await peerConnection.addIceCandidate(message.iceCandidate);
          } catch (e) {
            console.error("Error adding received ice candidate", e);
          }
        }
      });
    },
    stopShare:function(){
        transferStream=new MediaStream();
        this.tip="正在连接到投屏端...";
        this.connectloading= true;
        this.connectionStatus= false;
        $store.commit('projPage/restoreStates');
        this.$sockets['rtc'].close();
        this.$sockets['rtc'].disconnect();
        peerConnection.close();
    }
  },
};
</script>