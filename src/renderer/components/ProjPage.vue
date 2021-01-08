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
      <div style="display: flex; justify-content: center; padding-top: 25px">
        <img
          id="computer_proj"
          src="~@/assets/computer_proj.svg"
          alt="computer_proj"
        />
      </div>
      <div style="display: flex; justify-content: center; padding-top: 15px">
        <a-input
          id="inputProj"
          ref="projCode"
          v-model="step1.projCode"
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
          :loading="step1.btnloading"
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
    <div v-if="step == 2" style="height: 100%">
      <h2 style="text-align: center; margin-top: 15px">请选择你要投影的屏幕</h2>
      <a-button
        type="primary"
        shape="round"
        style="margin-top: 10px"
        @click="getMedia"
        >测试</a-button
      >
      <div
        style="
          height: 80%;
          display: flex;
          justify-content: space-around;
          align-content: space-around;
          padding-top: 25px;
          flex-flow: wrap;
        "
        @click="getScreenSelected"
        id="screens"
      ></div>
    </div>
    <div v-if="step == 3" style="height: 100%">
      <h2 style="text-align: center; margin-top: 15px">屏幕</h2>
      <video id="preview" autoplay></video>
    </div>
  </div>
</template>
<style lang="css">
#inputProj {
  height: 50px;
  font-size: 140%;
  font-weight: 600;
  letter-spacing: 10px;
  text-align: center;
}
video.selectList {
  box-shadow: none;
  width: 200px;
  height: 110px;
  object-fit: fill;
}
video.selectList:hover {
  box-shadow: -1px -1px 10px 3px #1890ff;
  border-color: #00000000;
  transition: all 0.2s ease-in-out;
}
span.screenName {
  display: block;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
}
</style>
<script>
import { message } from "ant-design-vue";
import { desktopCapturer } from "electron";
import io from "socket.io-client";
let socket;
let peerConnection;
let Screensources;
let dataChannel;
let transferStream=new MediaStream();
const configuration = {
  iceServers: [
    {
      urls: "turn:turn.lgyserver.top:3478",
      username: "1610096811:samantha",
      credential: "Q8U5JnuY3gKt3JGcQGEKIbpaaNY=",
    },
    { urls: "stun:turn.lgyserver.top:3478" },
  ],
  iceCandidatePoolSize: 2,
};
export default {
  data: () => ({
    step: 1,
    step1: {
      projCode: "",
      btnloading: false,
    },
  }),
  methods: {
    connectToProj: function () {
      let that = this;
      that.step1.btnloading = true;
      if (!socket || !socket.connected) {
        socket = io.connect("http://47.106.167.117:65534/rtc");
        socket.on("connect", function () {
          socket.emit("CONNECT_TO_TV", {
            username: "lgy",
            projCode: that.step1.projCode,
          });
        });
        socket.on("CONNECT_TO_TV_FAILED", (data) => {
          console.error("Connecting to TV failed. Reason:" + data.msg);
          message.error(data.msg);
          socket.close();
          that.step1.btnloading = false;
        });
        socket.on("CONNECT_TO_TV_SUCCESS", (data) => {
          console.log("Connecting success!");
          message.success(data.msg);
          that.step = 2;
          this.getMedia();
        });
        socket.on("NEW_CLIENT_JOIN", (data) => {
          console.log("A new Client join, username: " + data.username);
        });
        socket.on("disconnect", function () {
          console.warn("A connection to server has disconnected.");
          that.step1.btnloading = false;
        });
      }
    },
    getMedia: function () {
      desktopCapturer
        .getSources({ types: ["screen"] })
        .then((sources) => {
          Screensources = sources;
          console.log(sources);
          for (let screenID = 0; screenID < sources.length; screenID++) {
            let screendiv = document.getElementById("screens");
            let v = document.createElement("video");
            let text = document.createElement("span");
            text.innerText = sources[screenID].name;
            text.className = "screenName";
            v.width = 200;
            v.height = 100;
            v.className = "selectList";
            v.setAttribute("data-screenid", screenID);

            let video = navigator.mediaDevices.getUserMedia({
              video: {
                mandatory: {
                  chromeMediaSource: "desktop",
                  chromeMediaSourceId: sources[screenID].id,
                  minWidth: 640,
                  maxWidth: 1920,
                  minHeight: 360,
                  maxHeight: 1080,
                },
              },
            });
            video
              .then((stream) => {
                v.srcObject = stream;
                v.play();
              })
              .catch((e) => {
                console.log(e);
              });
            let temp = document.createElement("div");
            temp.appendChild(v);
            temp.appendChild(text);
            screendiv.appendChild(temp);
          }
        })
        .catch((err) => {
          alert("Error:" + err);
        });
      console.log();
    },
    getScreenSelected: async function (e) {
      const id=e.target.getAttribute("data-screenid");
      console.log('Project Screen:',id);
      this.step = 3;
      await this.connectRTC(id);
    },
    connectRTC: async function (screenid) {
      try {
        peerConnection = new RTCPeerConnection(configuration);
        //peerConnection.onicecandidate = this.handleIceCandidate;
        peerConnection.onicecandidate = function (e) {
          console.log(e);
          if (e.candidate) {
            socket.emit("RTC_Candidate_Exchange", {
              iceCandidate: event.candidate,
            });
          }
        };
        peerConnection.oniceconnectionstatechange = function (e) {
          console.log("iceconnectionstatechange", e);
        };
        peerConnection.onconnectionstatechange = function (event) {
          if (peerConnection.connectionState == "connected") {
            console.log("RTC Create Success");
          }
        };
        peerConnection.onicegatheringstatechange = function (event) {
          console.log("RTC ICE State Change:", peerConnection.connectionState);
        };
peerConnection.addStream(transferStream);
        
        dataChannel = peerConnection.createDataChannel("testChannel");
        dataChannel.addEventListener("open", (event) => {
          console.log('channel state change',dataChannel);
          dataChannel.send("hi! tv!");
          console.log("sending test message",dataChannel,peerConnection);
        });
        navigator.mediaDevices
          .getUserMedia({
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
          })
          .then((localStream) => {
            // peerConnection.addStream(localStream);
            transferStream=localStream;
            console.log("detect stream:", localStream,peerConnection);
            setTimeout(() => {
              document.getElementById("preview").srcObject = localStream;
              document.getElementById("preview").play();
            }, 3000);
          });
      } catch (e) {
        console.log("RTC Error:", e);
      }

      const offer = await peerConnection.createOffer({
        offerToReceiveVideo: 1,
        offerToReceiveAudio: 1,
      });
      console.log("myoffer", offer);
      await peerConnection.setLocalDescription(offer);
      socket.emit("RTC_Client_Offer_To_Server", {
        offer: offer,
      });
      socket.on("RTC_TV_Answer_To_Client", async (msg) => {
        if (msg.answer) {
          const remoteDesc = new RTCSessionDescription(msg.answer);
          await peerConnection.setRemoteDescription(remoteDesc);
          console.log("RTC TV answer received", peerConnection);
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

      /*localStream.getTracks().forEach((track) => {
        console.log("stream:", localStream);
        peerConnection.addTrack(track, localStream);
      });*/
    },
  },
};
</script>