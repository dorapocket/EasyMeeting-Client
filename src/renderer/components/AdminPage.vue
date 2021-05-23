<template>
<div>
  <div v-if="currentPage=='meetingRoom'">
    <MeetingRoomPage></MeetingRoomPage>
  </div>
  <div v-if="currentPage=='device'">
    <DevicePage></DevicePage>
  </div>
</div>
</template>
<script>
import MeetingRoomPage from './AdminPage/meetingRoom';
import DevicePage from './AdminPage/device'; 
export default {
    components:{MeetingRoomPage,DevicePage},
    data:()=>({
        currentPage:'',
    }),
    mounted:function(){
      if(this.$route.name=='admin'){
          this.currentPage=this.$route.query.type;
      }
    },
    watch: {
    $route(to, from) {
      if(to.name=='admin'){
          this.currentPage=to.query.type;
      }
    }
  },
}
</script>