<template>
  <div style="margin: 10px">
    <a-row type="flex">
      <a-col :span="24">
        <a-card
          :bodyStyle="{ padding: '5px' }"
          title="我的设备"
          :bordered="false"
        >
        <a-button
          type="primary"
          shape="round"
          slot="extra"
          icon="plus"
          href="#"
          @click="showCreateModal"
          >添加设备</a-button
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
                title="删除设备？"
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
    title: "绑定的会议室",
    dataIndex: "name",
    key: "name",
  },
    {
    title: "地点",
    dataIndex: "pos",
    key: "pos",
  },
      {
    title: "描述",
    dataIndex: "extra",
    key: "extra",
  },
    {
    title: "创建时间",
    dataIndex: "ctime",
    key: "ctime",
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
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  }),
  computed: {
    data: function () {
      return this.$store.state.admin.deviceData;
    },
  },
  methods: {
    showCreateModal: function () {
      message.warning('暂不支持电脑端添加设备，请移步小程序哦～');
    },
    confirmDelete: function (idx) {
      let that = this;
      this.$store.dispatch("admin/deleteDevice", that.data[idx].key);
    },
  },
  beforeMount: function () {
    this.$store.dispatch("admin/getAdminDevices");
  },
};
</script>
