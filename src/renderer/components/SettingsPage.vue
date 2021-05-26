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
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="自动登录">
            <a-switch v-model="form.autoLogin" />
          </a-form-model-item>
          <a-form-model-item label="允许后台通知">
            <a-switch v-model="form.allowNotification" />
          </a-form-model-item>
          <a-form-model-item label="会议提醒类别">
            <a-checkbox-group v-model="form.notifyType">
              <a-checkbox value="wechat" name="type">
                微信推送
              </a-checkbox>
              <a-checkbox value="sms" name="type">
                短信通知
              </a-checkbox>
              <a-checkbox value="mail" name="type">
                邮件通知
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          
          <a-form-model-item label="投屏分辨率">
      <a-select v-model="form.pixel" placeholder="1920*1080">
        <a-select-option value="1920*1080">
          1920*1080
        </a-select-option>
      </a-select>
    </a-form-model-item>
        </a-form-model>
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
            <a-input v-model="form.meetingServer" />
          </a-form-model-item>
          <a-form-model-item required label="投屏服务器地址">
            <a-input v-model="form.projServer" />
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
const { ipcRenderer } = require("electron");

export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        autoLogin:true,
        allowNotification:true,
        notifyType:['mail'],
        pixel:'1920*1080',
        meetingServer:'https://lgyserver.top:65534',
        projServer:'https://lgyserver.top:65534/rtc'
      },
    };
  },
  methods: {
    openNotification() {
      message.success("保存成功");
      ipcRenderer
        .invoke("setStore", "meetingServer", this.form.meetingServer)
        .then((result) => {
          console.log(result);
        });
      ipcRenderer
        .invoke("setStore", "projServer", this.form.projServer)
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>
