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
        prop="theme"
      >
        <a-input
          v-model="form.theme"
          @blur="
            () => {
              $refs.theme.onFieldBlur();
            }
          "
          :placeholder="themeGenerate"
        />
      </a-form-model-item>
      <a-form-model-item
        required
        class="createFormItem"
        label="会议室"
        prop="pos"
      >
        <a-select v-model="form.pos" placeholder="选择会议室" :loading="loadingRooms" :disabled="loadingRooms" @change="roomChange">
          <a-select-option v-for="room in rooms" v-bind:key='room.mid'  :value="room.mid"> {{room.name}}-{{room.position}}-约{{room.max_people}}人 </a-select-option>
          <a-select-option :value="'other'"> 其他会议室 </a-select-option>
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
          @change="dateChange"
        /><br />
        <div style="display: flex; justify-content: space-between; width: 100%">
          <a-time-picker
            v-model="form.timeBegin"
            prop="timeBegin"
            placeholder="开始时间"
            :minute-step="15"
            :second-step="10"
            :disabledHours="disabledHours"
            :disabledMinutes="disabledMinutes"
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
            <a-form-model-item class="createFormItem" label="参会人" prop="people" required>
        <a-tree-select
    v-model="form.people"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '200px', overflow: 'auto' }"
    :tree-data="treeData"
    showSearch
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
import { message } from "ant-design-vue";
import moment from "moment";
const { ipcRenderer } = require("electron");
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
  /*  
    treeData:[
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        value: '0-0-1',
        key: '',
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
],
*/
treeData:[],

acts:{},
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
    loadingRooms:function(){
      return this.$store.state.landingPage.loadingRooms;
    },
    rooms:function(){
      return this.$store.state.landingPage.rooms;
    },
    themeGenerate:function(){
      return ipcRenderer.sendSync('getStorageSync','UserInfo').realname+'发起的会议';
    }
  },
  methods: {
    handleOk: function () {
      this.confirmLoading=true;
      let that=this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if(moment(that.form.date.format('YYYY-MM-DD')+' '+that.form.timeBegin.format('HH:mm')+':00').valueOf()>=moment(that.form.date.format('YYYY-MM-DD')+' '+that.form.timeEnd.format('HH:mm')+':00').valueOf()){
        message.error("这个会议难道是倒着开的吗(●'◡'●)");this.confirmLoading=false;return;}
        this.$http.post("/meetings/createMeeting", {
                mid:that.form.pos,
                theme:that.form.theme,
                date:that.form.date.format('YYYY-MM-DD'),
                time_begin:moment(that.form.date.format('YYYY-MM-DD')+' '+that.form.timeBegin.format('HH:mm')+':00').valueOf(),
                time_end:moment(that.form.date.format('YYYY-MM-DD')+' '+that.form.timeEnd.format('HH:mm')+':00').valueOf(),
                member:JSON.stringify(that.form.people)||'{}',
                remark:that.form.desc||'',
            })
            .then(function(response) {
                that.acts=response.data.data;
                this.handleCancel();
                message.success('会议创建成功');
                that.confirmLoading=false;
            })
            .catch(function(error) {
              that.confirmLoading=false;
            });
        return;
        } else {
          this.confirmLoading=false;
          return false;
        }
      });

      

      // this.$store.commit("landingPage/setCreateMeetingModal", false);

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
    this.confirmLoading=false;
    },
    moment,
    roomChange:function(){

  },
  dateChange:function(){
    let that=this;
    this.$http.post("/meetings/getMeetingRoomActivities", {
                mid:that.form.pos,
                date:that.form.date.format('YYYY-MM-DD'),
            })
            .then(function(response) {
                that.acts=response.data.data;
            })
            .catch(function(error) {
  
            });
    // TODO: 额外功能：选中后再下方显示会议室活动
    // TODO: 额外功能：自动筛选掉有安排的人
    this.getMemberTree();
  },
  disabledHours:function(){
    let data=this.acts;
    let removeHour=[];
    for(let i=0;i<data.length;i++){
      let beginH=new Date(data[i].time_begin).getHours();
      let beginM=new Date(data[i].time_begin).getMinutes();
      let endH=new Date(data[i].time_end).getHours();
      let endM=new Date(data[i].time_end).getMinutes();
      if(beginM==0&&endH!=beginH){
        if(removeHour.indexOf(beginH)==-1)
        removeHour.push(beginH);
      }
      for(let k=beginH+1;k<endH;k++){
        if(removeHour.indexOf(k)==-1)
        removeHour.push(k);
      }
      return removeHour;
    }
  },
  disabledMinutes:function(hour){
    let data=this.acts;
    let removeMinute=[];
    for(let i=0;i<data.length;i++){
      let beginH=new Date(data[i].time_begin).getHours();
      let beginM=new Date(data[i].time_begin).getMinutes();
      let endH=new Date(data[i].time_end).getHours();
      let endM=new Date(data[i].time_end).getMinutes();
      if(hour>beginH&&hour<endH) return [0,15,30,45];
      if(hour==beginH&&hour==endH){
        for(let m of [0,15,30,45]){
          if(m>beginM&&m<endM&&removeMinute.indexOf(m)==-1){removeMinute.push(m);}
        }
        return removeMinute;
      }
      if(hour==beginH){
        for(let j of [0,15,30,45]){
          if(j>beginM&&removeMinute.indexOf(j)==-1){removeMinute.push(j);}
        }
        return removeMinute;
      }
      if(hour==endH){
        for(let k of [0,15,30,45]){
          if(k<endM&&removeMinute.indexOf(k)==-1){removeMinute.push(k);}
        }
        return removeMinute;
      }
    }
  },
  getMemberTree:function(){
    let that=this;
    this.$http.get("/meetings/getAllUsers", {
                
            })
            .then(function(response) {
                that.generateTree(response.data.data);
            })
            .catch(function(error) {
            });

  },
  generateTree:function(data){
    let tree=[];
    for(let i in data){
      tree.push({
        value:JSON.stringify({
          uid:data[i].uid,
          realname:data[i].realname,
      }),
        title:data[i].realname+'('+data[i].username+')',
        key:'0-'+i
      })
    }
    this.treeData=tree;
  }
  },
};
</script>