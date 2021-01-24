<template>
<div>
    <a-card :bordered="false" style="width: 100%">
        <div slot="title"><a-icon type="team" />会议安排</div>
        <a-button
          type="primary"
          shape="round"
          slot="extra"
          icon="usergroup-add"
          href="#"
          @click="addMeeting"
          >发起会议</a-button
        >
        <a-list
          item-layout="horizontal"
          :data-source="todoData"
          class="dateList"
          style="max-height: 160px; overflow: scroll; margin-top: -10px"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a slot="actions">
              <a-popover>
                <div slot="title">
                  {{ item.theme }}
                </div>
                <template slot="content">
                  {{ item.desc }}
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
      <CreateMeetingModal></CreateMeetingModal>
      </div>
</template>
<style>
.dateList::-webkit-scrollbar {
  width: 2px;
  height: 0px;
}

.dateList::-webkit-scrollbar-thumb {
  border-radius: 1px;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.dateList::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  background: #ededed;
}
.dateList {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<script>
import CreateMeetingModal from './createMeetingModal'
export default {
    components:{CreateMeetingModal},
    data: () => ({
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
  methods:{
      addMeeting:function(){
          this.$store.commit('landingPage/setCreateMeetingModal',true);
      }
  }
}
</script>