import Vue from 'vue'
import Vuex from 'vuex'
import square from './square'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    square,
  },
})
