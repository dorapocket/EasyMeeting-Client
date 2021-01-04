<template>
<div>
  <div @click="getMedia">getMedia
  </div>
  <video id="videos" style="height:300px;width:600px;"></video>
</div>
</template>
<script>
import { desktopCapturer } from "electron";
export default {
  methods: {
    getMedia: function () {
      console.log("hh");

      desktopCapturer
        .getSources({ types: ["window", "screen"] })
        .then((sources) => {
          console.log(sources);
          let video=navigator.mediaDevices.getUserMedia({
            video: {
              mandatory: {
                chromeMediaSource: "desktop",
                chromeMediaSourceId: sources[0].id,
                minWidth: 640,
                maxWidth: 1920,
                minHeight: 360,
                maxHeight: 1080,
              },
            },
          });
          video.then((stream)=>{
              document.getElementById('videos').srcObject=stream;
              document.getElementById('videos').play();
          }).catch(e=>{
              console.log(e);
          });
          console.log(video);
        })
        .catch((err) => {
          alert("Error:" + err);
        });
      console.log();
    },
  },
};
</script>