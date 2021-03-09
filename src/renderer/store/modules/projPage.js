const state = {
    projStep:1, // 投屏步骤
    projCode:"", // 投屏码
    connectBtnLoading:false, // 步骤一的loading状态
    screenSources:null, // 投屏api获取的屏幕数组
    selectScreenID:0, // 用户选择的屏幕在屏幕数组的位置
    rtcConfig:{}, // ice配置
}

const mutations = {
    setProjStep(state,n) {
        state.projStep=n;
    },
    setProjCode(state,n) {
        state.projCode=n.toUpperCase();
    },
    setConnectBtnLoading(state,n){
        state.connectBtnLoading=n;
    },
    setScreenSources(state,n){
        state.screenSources=n;
    },
    setSelectScreenID(state,n){
        state.selectScreenID=n;
    },
    setRtcConfig(state,n){
        state.rtcConfig=n;
    },
    restoreStates(state){
        state.projStep=1;
        state.projCode="";
        state.connectBtnLoading=false;
        /*state.socket.close();
        state.socket.disconnect();
        state.peerConnection.close();*/
    },
    
}

const actions = {
    someAsyncTask({ commit }) {
        // do something async
        commit('INCREMENT_MAIN_COUNTER')
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
