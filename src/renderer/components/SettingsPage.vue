<template>
  <div
    :style="{
      margin: '24px 16px',
      padding: '0px 24px 24px 24px',
      background: '#fff',
    }"
  >
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="setting" />
          通用
        </span>
        Tab 1
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="cloud" />
          服务器
        </span>
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          style="padding-top: 20px"
        >
          <a-form-model-item required label="会议服务器地址">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item required label="投屏服务器地址">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="openNotification"> 保存 </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import { message } from "ant-design-vue";
const { ipcRenderer } = require('electron');

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    openNotification() {
      message.success("保存成功");
      ipcRenderer.invoke('setStore', 'tokenServer','test').then((result)=>{
          console.log(result);
      });
    },
  },
};
</script>