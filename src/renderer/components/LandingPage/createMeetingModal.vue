<template>
  <a-modal
    title="创建会议"
    class="createModal"
    :visible="visible"
    :confirm-loading="confirmLoading"
    :closable="false"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        required
        class="createFormItem"
        ref="theme"
        label="主题"
        placeholder="主题"
        prop="theme"
      >
        <a-input
          v-model="form.theme"
          @blur="
            () => {
              $refs.theme.onFieldBlur();
            }
          "
        />
      </a-form-model-item>
      <a-form-model-item
        required
        class="createFormItem"
        label="会议室"
        prop="pos"
      >
        <a-select v-model="form.pos" placeholder="选择会议室">
          <a-select-option value="6W01"> 6W01大会议室 </a-select-option>
          <a-select-option value="6W05"> 6W05小会议室 </a-select-option>
          <a-select-option value="other"> 其他 </a-select-option>
        </a-select>
        <a-input v-if="form.pos == 'other'" v-model="form.posOther" />
      </a-form-model-item>
      <a-form-model-item
        class="createFormItem"
        label="时间"
        required
        prop="date"
      >
        <a-date-picker
          v-model="form.date"
          prop="date"
          style="width: 100%"
          placeholder="日期"
        /><br />
        <div style="display: flex; justify-content: space-between; width: 100%">
          <a-time-picker
            v-model="form.timeBegin"
            prop="timeBegin"
            placeholder="开始时间"
            :minute-step="15"
            :second-step="10"
            format="HH:mm"
          />
          <div style="margin: 0px 5px; display: inline-block; margin-top: -5px">
            ~
          </div>
          <a-time-picker
            v-model="form.timeEnd"
            placeholder="结束时间"
            prop="timeEnd"
            :minute-step="15"
            :second-step="10"
            format="HH:mm"
          />
          <!-- :default-value="moment('12:08', 'HH:mm')" -->
        </div>
      </a-form-model-item>
            <a-form-model-item class="createFormItem" label="参会人" prop="people">
        <a-tree-select
    v-model="form.people"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    allow-clear
    multiple
    placeholder="选择参会人"
  >
  </a-tree-select>
      </a-form-model-item>
      <a-form-model-item class="createFormItem" label="备注" prop="desc">
        <a-input v-model="form.desc" type="textarea" />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button key="back" @click="handleCancel"> 取消 </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="confirmLoading"
        @click="handleOk"
        placeholder="备注"
      >
        预约
      </a-button>
    </template>
  </a-modal>
</template>
<style>
.createModal > * .ant-modal {
  top: 25px !important;
}
.createFormItem {
  margin-bottom: 12px !important;
}
</style>
<script>
import moment from "moment";
export default {
  data: () => ({
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    confirmLoading: false,
    form: {
      theme: "",
      pos: undefined,
      posOther: undefined,
      date: undefined,
      timeBegin: undefined,
      timeEnd: undefined,
      desc: "",
      people:undefined,
    },
    treeData:[
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        value: '0-0-1',
        key: '0-0-1',
        scopedSlots: {
          // custom title
          title: 'title',
        },
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
]
  }),
  computed: {
    visible: {
      get: function () {
        return this.$store.state.landingPage.createMeetingModal;
      },
      set: function (value) {
        this.$store.commit("landingPage/setCreateMeetingModal", value);
      },
    },
  },
  methods: {
    handleOk: function () {
      this.$store.commit("landingPage/setCreateMeetingModal", false);
    },
    handleCancel: function () {
      this.$store.commit("landingPage/setCreateMeetingModal", false);
      this.form={
      theme: "",
      pos: undefined,
      posOther: undefined,
      date: undefined,
      timeBegin: undefined,
      timeEnd: undefined,
      desc: "",
    };
    },
    moment,
  },
};
</script>