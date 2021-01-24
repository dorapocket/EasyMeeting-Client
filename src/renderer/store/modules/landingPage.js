const state = {
    createMeetingModal:true,
}

const mutations = {
    setCreateMeetingModal(state,n){
        state.createMeetingModal=n;
    }
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
