import Vue from 'vue'
import Vuex from 'vuex'

import username from './modules/username'
import wsStore from './modules/wsStore'
import beginGame from './modules/beginGame'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules:{
      username,
      wsStore,
      beginGame
  },
  strict: process.env.NODE_ENV !== 'production',
})