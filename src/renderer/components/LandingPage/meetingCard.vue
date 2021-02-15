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
          style="height: 160px; overflow: scroll; margin-top: -10px"
        >
          <a-list-item slot="renderItem" slot-scope="item" style="border-bottom:1px #00000022 solid">
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
            <!--<a v-if="item.isSponsor" @click="editMeeting(item.aid)" slot="actions"><a-icon type="edit" /></a>-->
            <a v-if="item.isSponsor" slot="actions">
              <a-popconfirm
    title="确定要删除该会议吗？该操作无法撤回！"
    ok-text="确定"
    cancel-text="取消"
    @confirm="confirmDelete(item.aid)"
  >
    <a-icon type="delete" />
  </a-popconfirm></a>
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
  }),
  computed:{
    todoData:function(){
      return this.$store.state.landingPage.todoList;
    },
    
  },
  methods:{
      addMeeting:function(){
          this.$store.dispatch('landingPage/openCreateMeetingModal',true);
      },
      confirmDelete:function(aid){
        this.$store.dispatch('landingPage/deleteMeeting',aid);
      },
      // TODO: 增加修改会议功能
  }
}
</script>