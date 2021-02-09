import Vue from 'vue'
import vueElectron from 'vue-electron'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
