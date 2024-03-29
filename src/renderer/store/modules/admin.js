import { message } from "ant-design-vue";
import axios from "axios";
const Utils=require('../../utils/utils.js');
const util=new Utils();
const state = {
    meetingRoomData:[],
    deviceData:[],
  }
  
  const mutations = {
    setMeetingRoomData (state,data) {
      state.meetingRoomData=data;
    },
    setDeviceData (state,data) {
      state.deviceData=data;
    },
  }
  
  const actions = {
    getAdminMeetingRoom ({ commit }) {
      let result=[];
      let idx=0;
      axios.get("/meetings/adminMeetingRoomList",{})
      .then(function(response){
        let a=response.data.data;
        for(let b of a){
            result.push(
              {
                index:idx,
                key: b.mid, // msgid
                name:b.name,
                maxpeople:b.max_people,
                position:b.position,
                desc:b.desc,
              }
            );
            idx++;
        }
        commit('setMeetingRoomData',result);
      })
      .catch(function(error){
        console.error(error);
      })
    },
    deleteMeetingRoom({commit,dispatch},fb){
    axios.get('/meetings/deleteMeetingRoom',{params:{mid:fb}})
      .then(function(response){
        if(response.data.code==200){
          dispatch('getAdminMeetingRoom');
        }
      })
      .catch(function(e){console.error(e);})
    },
    createMeetingRoom({dispatch},obj){
        axios.post('/meetings/createMeetingRoom',{
            name:obj.name,maxpeople:obj.maxpeople,position:obj.position,description:obj.desc
        }).then(function(response){
            if(response.data.data==200){
                message.success("创建成功");
                dispatch('getAdminMeetingRoom');
            }
        })
        .catch(function(e){console.error(e);})
    },
    getAdminDevices ({ commit }) {
      let result=[];
      let idx=0;
      axios.get("/device/getAllDevice",{})
    .then(function(response){
      let a=response.data.data;
      for(let b of a){
          result.push(
            {
              index:idx,
              key: b.did, // msgid
              name:b.mname,
              extra:b.extra,
              ctime:util.dateFormat(new Date(b.createTime),'yyyy年MM月dd日 hh:mm'),
              pos:b.mpos,
            }
          );
          idx++;
      }
      commit('setDeviceData',result);
    })
    .catch(function(error){
      console.error(error);
    })
    },
    deleteDevice({commit,dispatch},fb){
      axios.get('/device/deleteDevice',{params:{did:fb}})
        .then(function(response){
          if(response.data.code==200){
            dispatch('getAdminDevices');
          }
        })
        .catch(function(e){console.error(e);})
      },
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  