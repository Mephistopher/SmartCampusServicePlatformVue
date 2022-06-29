import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: {}
  },
  getters: {
    getLoginUser(state){
      return state.loginUser
    }
  },
  mutations: {
    setLoginUser(state, user){
      this.state.loginUser = user
    }
  },
  actions: {
  },
  modules: {
  }
})
