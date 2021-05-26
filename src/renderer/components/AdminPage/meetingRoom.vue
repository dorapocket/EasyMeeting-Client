<template>
  <div style="margin: 10px">
    <a-row type="flex">
      <a-col :span="24">
        <a-card
          :bodyStyle="{ padding: '5px' }"
          title="我的会议室"
          :bordered="false"
        >
        <a-button
          type="primary"
          shape="round"
          slot="extra"
          icon="plus"
          href="#"
          @click="showCreateModal"
          >添加会议室</a-button
        >

          <a-table
            class="msgList"
            :columns="columns"
            :data-source="data"
            style="max-height: 400px; overflow: scroll"
          >
            <span slot="content" class="msg-content-style" slot-scope="text">{{
              text
            }}</span>
            <span slot="action" slot-scope="text, record">
              <a>
                <a-icon
                  type="exclamation-circle"
                  @click="showMore(record.index)"
                /> </a
              ><a-divider type="vertical" />
              <a-popconfirm
                title="删除会议室？"
                ok-text="删除"
                okType="danger"
                cancel-text="再想想"
                @confirm="confirmDelete(record.index)"
              >
                <a><a-icon style="color: red" type="delete" /></a>
              </a-popconfirm>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-modal
      v-model="moreVisible"
      title="详细信息"
      @cancel="moreClose"
      @ok="moreClose"
      okText="确定"
      cancelText="取消"
    >
      <a-descriptions layout="vertical" size="small" bordered :column="6">
        <a-descriptions-item label="会议室名称" :span="2">
          {{ moreObj.name }}
        </a-descriptions-item>
        <a-descriptions-item label="最大人数" :span="1">
          {{ moreObj.maxpeople }}
        </a-descriptions-item>
        <a-descriptions-item label="位置" :span="3">
          {{ moreObj.position }}
        </a-descriptions-item>
        <a-descriptions-item label="描述" :span="3">
          {{ moreObj.desc }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <a-modal
      v-model="createVisible"
      title="创建会议室"
      @cancel="createClose"
      @ok="submit"
      okText="创建"
      cancelText="取消"
    >
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="名称">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item label="容纳人数">
          <a-input-number v-model="form.maxpeople" :min="1" :max="9999" />
        </a-form-model-item>
        <a-form-model-item label="位置">
          <a-input v-model="form.position" />
        </a-form-model-item>
        <a-form-model-item label="描述">
          <a-input v-model="form.desc" />
        </a-form-model-item>
      </a-form-model>
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
import { message } from "ant-design-vue";
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "最大人数",
    dataIndex: "maxpeople",
    key: "maxpeople",
  },
  {
    title: "位置",
    dataIndex: "position",
    key: "position",
    scopedSlots: { customRender: "content" },
  },
  {
    title: "处理",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  data: () => ({
    columns,
    moreVisible: false,
    createVisible: false,
    moreObj: {},
    replyText: "",
    form: {
      name: "",
      maxpeople: 1,
      position: "",
      desc: "",
    },
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }),
  computed: {
    data: function () {
      return this.$store.state.admin.meetingRoomData;
    },
  },
  methods: {
    createClose: function () {
      this.createVisible = false;
    },
    submit: function () {
      this.$store.dispatch("admin/createMeetingRoom", this.form);
      this.createVisible = false;
      this.form = {
        name: "",
        maxpeople: 1,
        position: "",
        desc: "",
      };
    },
    showCreateModal: function () {
      this.createVisible = true;
    },
    confirmDelete: function (idx) {
      let that = this;
      this.$store.dispatch("admin/deleteMeetingRoom", that.data[idx].key);
    },
    showMore: function (index) {
      this.moreObj = this.data[index];
      this.moreVisible = true;
    },
    moreClose: function () {
      this.moreVisible = false;
    },
  },
  beforeMount: function () {
    this.$store.dispatch("admin/getAdminMeetingRoom");
  },
};
</script>
