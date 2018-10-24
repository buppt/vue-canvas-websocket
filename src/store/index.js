import Vue from 'vue'
import Vuex from 'vuex'

import username from './modules/username'
import wsStore from './modules/wsStore'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
      username,
      wsStore
  },
  strict: process.env.NODE_ENV !== 'production',
})