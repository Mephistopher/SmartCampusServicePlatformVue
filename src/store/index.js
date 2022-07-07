import Vue from 'vue'
import Vuex from 'vuex'
import {queryUserSemester} from "@/network/user";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUser: {},
    semester: null
  },
  getters: {
    getLoginUser(state){
      return state.loginUser
    },
    getUserSemester(state){
      if(state.semester === null){

      }
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
