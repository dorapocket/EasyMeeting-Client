<template>
    <a-card :bordered="false" style="width: 100%; margin-bottom: 10px">
          <div slot="title">
            <a-icon type="info-circle" />
            概览
          </div>
          <div class="overview">
            <div>
              <div>今日会议</div>
              <div class="meetingNumber" style="color: green">1</div>
            </div>
            <div
              style="height: 80%; width: 2px; border: 1px solid #00000022"
            ></div>
            <div>
              <div>待开会议</div>
              <div class="meetingNumber" style="color: #2677ff">4</div>
            </div>
          </div>
        </a-card>
</template>
<style>
.meetingNumber {
  font-size: 30px;
}
.overview {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
}
.overview > div {
  display: flex;
  flex-direction: column;
  width: 50%;
}
.overview > div > div {
  text-align: center;
}
</style>
<script>
import { message } from "ant-design-vue";
const { ipcRenderer } = require("electron");
export default {
  data:()=>({
    todayMeeting:'-',
    waitingMeeting:'-'
  }),
  mounted:function(){
    let that=this;

  }
}
</script>