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
  mounted:function(){
    this.$store.dispatch('landingPage/getMeetingList');
  }
};
</script>
