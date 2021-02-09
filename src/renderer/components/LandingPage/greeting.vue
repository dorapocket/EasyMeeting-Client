<template>
    <div style="display: flex; align-items: center; margin-bottom: 10px">
          <div id="dateCard">
            <div id="dateCard-month">{{month}}</div>
            <div id="dateCard-day">{{day}}</div>
          </div>
          <div style="margin-left: 10px">
            <div style="font-weight: 700; font-size: 15px">你好，{{username}}</div>
            <div style="font-size: 12px">
              {{greetings}}
            </div>
          </div>
        </div>
</template>
<script>
const { ipcRenderer } = require("electron");
const date=new Date();
const monthHZ=['一','二','三','四','五','六','七','八','九','十','十一','十二'];
const GREETING_WORDS={
  MORNING:'早上好，今天也请加油哦！',
  NOON:'中午了，适当休息一下吧~',
  AFTERNOON:'下午好，打起精神冲冲冲！',
  EVENING:'晚上啦，今天一天辛苦了！',
  NIGHT:'深夜了，别太拼了，早点睡觉哦！'
}
export default {
  data:()=>({
    month:monthHZ[date.getMonth()]+'月',
    day:date.getDate(),
  }),
  computed: {
    greetings:function(){
      let hour=date.getHours();
      if(hour<5) return GREETING_WORDS.NIGHT;
      if(hour>=5&&hour<11) return GREETING_WORDS.MORNING;
      if(hour>=11&&hour<13) return GREETING_WORDS.NOON;
      if(hour>=13&&hour<17) return GREETING_WORDS.AFTERNOON;
      if(hour>=17&&hour<22) return GREETING_WORDS.EVENING;
      if(hour>=22&&hour<=23) return GREETING_WORDS.NIGHT;
    },
    username:function(){
      return ipcRenderer.sendSync('getStorageSync','UserInfo').realname;
    }
  },
}
</script>
<style>
#dateCard {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 8px;
}
#dateCard-month {
  font-size: 10px;
  color: #2677ff;
}
#dateCard-day {
  font-size: 20px;
  font-weight: 700;
}
#dailyTips {
  display: inline-flex;
  flex-direction: column;
}
</style>