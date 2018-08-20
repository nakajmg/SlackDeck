import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slackToken: null,
  },
  mutations: {
    setSlackToken(state, query) {
      state.slackToken = query.access_token
    },
  },
  actions: {},
})
