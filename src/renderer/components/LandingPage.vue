<template>
  <div :style="{ margin: '12px 8px', padding: '12px' }">
    <a-row>
      <a-col :span="14">
        <Greeting></Greeting>
        <FavouriteCard></FavouriteCard>
      </a-col>
      <a-col :span="9" :offset="1">
        <OverviewCard></OverviewCard>
      </a-col>
    </a-row>
    <a-row>
      <MeetingCard></MeetingCard>
    </a-row>
  </div>
</template>
<style></style>

<script>
import Greeting from "./LandingPage/greeting";
import FavouriteCard from "./LandingPage/favouriteCard";
import OverviewCard from "./LandingPage/overviewCard";
import MeetingCard from "./LandingPage/meetingCard";
import { message } from "ant-design-vue";
const { ipcRenderer } = require("electron");
export default {
  components: { Greeting, FavouriteCard, OverviewCard, MeetingCard },
  methods: {},
  created:function(){
    let that=this;
    this.$http.post("/meetings/getMeetingList", {
    })
            .then(function(response) {
                that.acts=response.data.data;
                this.handleCancel();
                message.success('会议创建成功');
                that.confirmLoading=false;
                message.error('新建会议异常：'+response.data.msg);
            })
            .catch(function(error) {
              that.confirmLoading=false;
            });
  }
};
</script>
