<template>
  <div style="margin:10px;">
    <a-row type="flex">
      <a-col :span="24">
        <a-card :bodyStyle="{padding:'5px'}" title="会议通知（未处理）" :bordered="false">
          <a-table class="msgList" :columns="columns" :data-source="data" style="max-height:400px;overflow:scroll;">
            <span slot="content" class="msg-content-style" slot-scope="text">{{
              text
            }}</span>
            <span slot="action" slot-scope="text, record">
              <a> <a-icon type="exclamation-circle" @click="showMore(record.index)"/> </a
              ><a-divider type="vertical" />
              <a-popconfirm
                title="接受此会议？"
                ok-text="接受"
                cancel-text="再想想"
                @confirm="confirmAccept(record.key)"
              >
                <a
                  ><a-icon style="color:green;" type="check-circle"
                /></a>
              </a-popconfirm>

              <a-divider type="vertical" />
              <a-popconfirm
                title="拒绝此会议？"
                ok-text="拒绝"
                cancel-text="再想想"
                @confirm="confirmReject(record.key)"
              >
                <a><a-icon style="color:red;" type="stop"/></a>
              </a-popconfirm>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model="moreVisible" title="详细信息" @ok="handleOk">
      <a-descriptions  layout="vertical" size="small" bordered :column="6">
    <a-descriptions-item label="主题" :span="2">
      {{moreObj.theme}}
    </a-descriptions-item>
    <a-descriptions-item label="发起人" :span="1">
      {{moreObj.sponsor}}
    </a-descriptions-item>
    <a-descriptions-item label="会议室" :span="3">
      {{moreObj.meetingRoom}}
    </a-descriptions-item>
    <a-descriptions-item label="日期" :span="3">
      {{moreObj.date}}
    </a-descriptions-item>
    <a-descriptions-item label="时间" :span="3">
      {{moreObj.time}}
    </a-descriptions-item>
    <a-descriptions-item label="参会人" :span="3">
      {{moreObj.members}}
    </a-descriptions-item>
    <a-descriptions-item label="备注" :span="3">
      {{moreObj.extra}}
    </a-descriptions-item>
  </a-descriptions>
    </a-modal>
  </div>
</template>
<style>
.msgList::-webkit-scrollbar {
  width: 2px;
  height: 0px;
}

.msgList::-webkit-scrollbar-thumb {
  border-radius: 1px;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.msgList::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  background: #ededed;
}
.msgList {
  overflow-x: hidden;
  overflow-y: auto;
}
.msg-content-style {
  display: block;
  max-width: 250px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
<script>
const columns = [
  {
    title: "主题",
    dataIndex: "theme",
    key: "theme",
  },
  {
    title: "会议时间",
    dataIndex: "datetime",
    key: "datetime",
  },
  {
    title: "内容",
    dataIndex: "content",
    key: "content",
    scopedSlots: { customRender: "content" },
  },
  {
    title: "处理",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
      index:0,
    key: "1",
    theme:"TextVQA组会",
    sponsor:"李国宇",
    members:"李国宇，李国宇，李国宇，李国宇，李国宇",
    date:"2020-01-01",
    time:"00:00 - 01:00",
    datetime:'2020-01-01 00:00 - 01:00',
    extra:"无",
    meetingRoom:'大会议室（6教北）',
    content:
      "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
  },
 
];
export default {
  data: () => ({
    data,
    columns,
    moreVisible:false,
    moreObj:{},
  }),
  methods:{
      confirmAccept:function(key){
          console.log(key);
      },
      confirmReject:function(key){

      },
      showMore:function(index){

this.moreObj=data[index];this.moreVisible=true;
      },
      handleOk:function(){

      }
  }
};
</script>
