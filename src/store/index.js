import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import types from "./types"
import storageKey from "../variables/storageKey"
import map from "lodash/map"
import cloneDeep from "lodash/cloneDeep"
import includes from "lodash/includes"
import indexOf from "lodash/indexOf"
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  modules: {
    teams: {},
    messages: {},
  },
  mutations: {
    [types.RESTORE_FROM_LOCAL_STORAGE](state) {
      const data = window.localStorage.getItem(storageKey)
      if (!data) return
      Object.assign(state, JSON.parse(data))
    },
    [types.INITIALIZE](state) {
      state.initialized = true
    },
    [types.ADD_TOKEN](state, payload) {
      console.log(payload, state)
      const teamIds = map(state.teams, ({ team_id }) => team_id)
      if (!includes(teamIds, payload.team_id)) {
        state.teams[payload.team_id] = {}
        return state.tokens.push(payload)
      }
      const tokens = cloneDeep(state.tokens)
      const index = indexOf(tokens, ({ team_id }) => team_id === payload.team_id)
      tokens.splice(index, 1, payload)
      state.tokens = tokens
    },
    [types.ADD_CHANNEL](state, { channelId, team_id }) {
      const channelIds = map(state.channels, ({ channelId }) => channelId)
      if (includes(channelIds, channelId)) return
      state.channels.push({ channelId, team_id })
    },
    [types.REMOVE_CHANNEL](state, { channelId, team_id }) {
      const index = indexOf(
        state.channels,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      if (index === -1) return
      state.channels.splice(index, 1)
    },
  },
  actions: {},
})
