<template>
  <div :style="{ margin: '12px 8px', padding: '12px' }">
    <a-row>
      <a-col :span="14">
        <div style="display: flex; align-items: center; margin-bottom: 10px">
          <div id="dateCard">
            <div id="dateCard-month">一月</div>
            <div id="dateCard-day">10</div>
          </div>
          <div style="margin-left: 10px">
            <div style="font-weight: 700; font-size: 15px">早上好，李国宇</div>
            <div style="font-size: 12px">
              工作个毛起来嗨！！！！！！！！！！
            </div>
          </div>
        </div>
        <div></div>

        <a-card :bordered="false" size="small" style="width: 100%; height: 115px">
          <div slot="title">
            <!--<a-badge dot>-->
<a-icon type="heart" />
            快捷操作
            <!--</a-badge>-->
            
          </div>
          <div id="features" style="display: flex; align-items: center">
            <a><a-icon type="usergroup-add" />发起会议</a>
            <a><a-icon type="desktop" />投屏</a>
            <a><a-icon type="search" />搜索</a>
          </div>
        </a-card>
      </a-col>
      <a-col :span="9" :offset="1">
        <a-card 
          :bordered="false"
          style="width: 100%; margin-bottom: 10px"
        >
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
      </a-col>
    </a-row>
    <a-row>
      <a-card
        :bordered="false"
        style="width: 100%"
      >
        <div slot="title"><a-icon type="team" />会议安排</div>
        <a-button type="primary" shape="round" slot="extra" icon="usergroup-add" href="#">发起会议</a-button>
        <a-list
          item-layout="horizontal"
          :data-source="todoData"
          class="dateList"
          style="max-height: 160px; overflow: scroll; margin-top: -10px"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a slot="actions" >
              <a-popover>
                <div slot="title">
                  {{item.theme}}
                </div>
                <template slot="content">
                  {{item.desc}}
                </template>
                <a-icon type="info-circle" />
              </a-popover>
            </a>
            <a slot="actions"><a-icon type="edit" /></a>
            <a slot="actions"><a-icon type="delete" /></a>
            <a-list-item-meta>
              <a slot="title" href="#">
                <a-tag color="blue">
                  {{ item.time }}
                </a-tag>
                {{ item.theme }}
              </a>
            </a-list-item-meta>
            <div>{{ item.pos }}</div>
          </a-list-item>
        </a-list>
      </a-card>
    </a-row>
  </div>
</template>
<style>
#features {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 60px;
}
#features > a {
  padding: 10px;

}
.dateList::-webkit-scrollbar {
  /*滚动条整体样式*/

  width: 2px; /*高宽分别对应横竖滚动条的尺寸*/

  height: 0px;
}

.dateList::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/

  border-radius: 1px;

  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);

  background: #535353;
}

.dateList::-webkit-scrollbar-track {
  /*滚动条里面轨道*/

  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);

  border-radius: 1px;

  background: #ededed;
}
.dateList {
  overflow-x: hidden;
  overflow-y: auto;
}
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

<script>
export default {
  data: () => ({
    msgData:[
      '余宙邀请你加入会议：TextVQA组会',
      '李国宇接受了你的会议',
      '王璐瑶提交了请假请求',
      '余宙邀请你加入会议：TextVQA组会',
      '李国宇接受了你的会议',
      '王璐瑶提交了请假请求',
    ],
    todoData: [
      {
        theme: "TextVQA组会",
        desc: "发起人：余宙 参与人：王璐瑶，陈晨，李国宇等5人",
        time: "2020年1月11日 12：00",
        pos: "6W02 大会议室",
      },
      {
        theme: "TextVQA组会",
        desc: "发起人：余宙 参与人：王璐瑶，陈晨，李国宇等5人",
        time: "2020年1月11日 12：00",
        pos: "6W02 大会议室",
      },
      {
        theme: "TextVQA组会",
        desc: "发起人：余宙 参与人：王璐瑶，陈晨，李国宇等5人",
        time: "2020年1月11日 12：00",
        pos: "6W02 大会议室",
      },
      {
        theme: "TextVQA组会",
        desc: "发起人：余宙 参与人：王璐瑶，陈晨，李国宇等5人",
        time: "2020年1月11日 12：00",
        pos: "6W02 大会议室",
      },
      {
        theme: "TextVQA组会",
        desc: "发起人：余宙 参与人：王璐瑶，陈晨，李国宇等5人",
        time: "2020年1月11日 12：00",
        pos: "6W02 大会议室",
      },
    ],
  }),
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}

.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
