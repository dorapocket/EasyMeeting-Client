<template>
  <div>
    <h2 style="text-align: center; margin-top: 30px">请选择你要投影的屏幕</h2>
    <div
      style="
        height: 70%;
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
</template>
<style>
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
import { desktopCapturer } from "electron";
let store;
let $store;
export default {
created:function(){
       store = this.$store.state.projPage;
    $store = this.$store;
  },
  mounted: function () {
    desktopCapturer
      .getSources({ types: ["screen"] })
      .then((sources) => {
        $store.commit('projPage/setScreenSources',sources.slice()); // 深拷贝 不然改数组会触发state修改错误
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

          navigator.mediaDevices.getUserMedia({
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
          }).then((stream) => {
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
  },
  methods: {
    getScreenSelected: async function (e) {
      const id = e.target.getAttribute("data-screenid");
      console.log("Project Screen:", id);
      $store.commit('projPage/setSelectScreenID',id);
      $store.commit('projPage/setProjStep',3);
      // await this.connectRTC(id);
    },
  },
};
</script>