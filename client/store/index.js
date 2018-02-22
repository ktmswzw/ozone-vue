import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'
import news from './modules/news'
import product from './modules/product'
import inquiry from './modules/inquiry'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    app,
    product,
    user,
    news,
    inquiry,
    menu
  },
  state: {
    pkg
  },
  mutations: {
    user
  }
})

export default store
