import axios from "axios";
const Utils=require('../../utils/utils.js');
const util=new Utils();
const state = {
    msgData:[],
  }
  
  const mutations = {
    setMsgData (state,data) {
      state.msgData=data;
    },
  }
  
  const actions = {
    getMeetingMsgSync ({ commit }) {
      console.log('in');
      let result=[];
      let idx=0;
      axios.get("/message/unreadMessage",{})
      .then(function(response){
        let a=response.data.data;
        for(let b of a){
          if(b.msgType=="MEETING_NOTICE"){
            let memberObj=JSON.parse(b.member);
            let memberList=[];
            for(let m of memberObj){
              memberList.push(JSON.parse(m).realname);
            }
            result.push(
              {
                index:idx,
                key: b.msgId, // msgid
                theme:b.theme,
                sponsor:b.sponsor,
                members:memberList.join(','),
                date:util.dateFormat(new Date(b.date),'yyyy-MM-dd'),
                time:util.dateFormat(new Date(b.time_begin),'hh:mm')+" - "+util.dateFormat(new Date(b.time_end),'hh:mm'),
                datetime:util.dateFormat(new Date(b.date),'yyyy-MM-dd')+" "+util.dateFormat(new Date(b.time_begin),'hh:mm')+" - "+util.dateFormat(new Date(b.time_end),'hh:mm'),
                extra:b.remark,
                meetingRoom:b.mname,
                content:
                  b.remark,
              }
            );
            idx++;
          }
        }
        commit('setMsgData',result);
      })
      .catch(function(error){
        console.error(error);
      })
    },
    sendFeedBack({commit,dispatch},fb){
      
    axios.post('/message/messageFeedback',fb)
      .then(function(response){
        if(response.data.code==200){
          dispatch('getMeetingMsgSync');
        }
      })
      .catch(function(e){console.error(e);})
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  