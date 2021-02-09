import axios from "axios";
import { message } from "ant-design-vue";
const { ipcRenderer } = require("electron");
import moment from "moment";
const state = {
  createMeetingModal: false, // 创建会议对话框
  loadingRooms: true, // 等待加载会议室
  rooms: [], // 会议室列表
  todayMeetingCnt: "-", // 今日会议
  waitMeetingCnt: "-", // 待开会议
  userMeetingList: [], // 用户会议列表
  todoList: [], // 用户待开会议列表（首页下方列表）
};

const mutations = {
  setCreateMeetingModal(state, n) {
    state.createMeetingModal = n;
  },
  setLoadingRooms(state, n) {
    state.loadingRooms = n;
  },
  setRooms(state, n) {
    state.rooms = n;
  },
  setMeetingList(state, n) {
    state.userMeetingList = n;
  },
  setTodayMeetingCnt(state, n) {
    state.todayMeetingCnt = n;
  },
  setWaitMeetingCnt(state, n) {
    state.waitMeetingCnt = n;
  },
  setTodoList(state, n) {
    state.todoList = n;
  },
};

const actions = {
  openCreateMeetingModal({ commit }, value) {
    let that = this;
    commit("setCreateMeetingModal", value);
    if (value)
      axios
        .get("/meetings/getMeetingRoomList", {})
        .then(function(response) {
          commit("setLoadingRooms", false);
          if (response.data.code == 200) {
            commit("setRooms", response.data.data.slice(0));
          } else {
            message.error("获取会议室出现异常：" + response.data.msg);
          }
        })
        .catch(function(error) {
          commit("setLoadingRooms", false);
          if (!error.response) {
            message.error("网络错误，请检查网络并重试");
          } else {
            message.error("获取会议室出现错误：" + error.response.data.msg);
          }
        });
  },
  getMeetingList({ commit }) {
    axios
      .get("/meetings/getMeetingList")
      .then(function(response) {
        let todos = [];
        let loginUid=ipcRenderer.sendSync("getStorageSync","UserInfo").uid;
        for (let todo of response.data.data) {
          let part = "";
          let MAX_CNT = 10;
          for (let member of JSON.parse(todo.members)) {
            part += " " + JSON.parse(member).realname + ",";
            MAX_CNT--;
            if (MAX_CNT == 0) {
              part = part.substr(0, part.length - 1);
              part += " 等" + todo.members.length + "人,";
              break;
            }
          }
          part = part.substr(0, part.length - 1);
          todos.push({
            aid: todo.aid,
            theme: todo.theme,
            desc: "发起人：" + todo.sponsor + " 参与人：" + part,
            time: moment(new Date(todo.time_begin)).format(
              "YYYY年MM月DD日 HH:mm"
            ),
            pos: todo.mname,
            isSponsor:loginUid==todo.sponsor_uid
          });
        }
        commit("setMeetingList", response.data.data);
        commit("setTodayMeetingCnt", response.data.today);
        commit("setWaitMeetingCnt", response.data.data.length);
        commit("setTodoList", todos);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  deleteMeeting({commit,dispatch},aid){
    axios.get("/meetings/deleteMeeting",{
      params:{aid}
    }).then(response=>{
      if(response.data.code==200){
        message.success(response.data.msg);
        dispatch("getMeetingList");
      }
    }).catch(e=>{
      console.log(e);
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
