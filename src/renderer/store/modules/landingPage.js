import axios from "axios";
import { message } from "ant-design-vue";
const { ipcRenderer } = require("electron");
const state = {
    createMeetingModal:false, // 创建会议对话框
    loadingRooms:true, // 等待加载会议室
rooms:[], // 会议室列表
}

const mutations = {
    setCreateMeetingModal(state,n){
        state.createMeetingModal=n;
    },
    setLoadingRooms(state,n){
        state.loadingRooms=n;
    },
    setRooms(state,n){
state.rooms=n;
    },
}

const actions = {
    openCreateMeetingModal({commit},value){
        let that=this;
        commit('setCreateMeetingModal',value);
        if(value)
         axios
            .get("/meetings/getMeetingRoomList", {
            })
            .then(function(response) {
              commit('setLoadingRooms',false);
              if (response.data.code == 200) {
                commit('setRooms',response.data.data.slice(0));
              } else {
                message.error('获取会议室出现异常：'+response.data.msg);
              }
            })
            .catch(function(error) {
                commit('setLoadingRooms',false);
              if (!error.response) {
                message.error('网络错误，请检查网络并重试');
              } else {
                message.error('获取会议室出现错误：'+error.response.data.msg);
              }
            });
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
