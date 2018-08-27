import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import types from "./types"
import storageKey from "../variables/storageKey"
// import map from "lodash/map"
// import cloneDeep from "lodash/cloneDeep"
// import includes from "lodash/includes"
import indexOf from "lodash/indexOf"
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations: {
    [types.RESTORE_FROM_LOCAL_STORAGE](state) {
      const data = window.localStorage.getItem(storageKey)
      if (!data) return
      Object.assign(state, JSON.parse(data))
    },
    [types.ADD_TEAM](state, payload) {
      console.log(payload, state)
      state.teams.push(payload)
      // const teamIds = map(state.teams, ({ team: { id } }) => id)
      // if (!includes(teamIds, payload.team.id)) return state.teams.push(payload)
      // const teams = cloneDeep(state.teams)
      // const index = indexOf(teams, ({ team: { id } }) => id === payload.team.id)
      // teams.splice(index, 1, payload)
      // state.teams = teams
    },
    [types.REMOVE_TEAM](state, { teamId }) {
      const index = indexOf(state.teams, ({ team: { id } }) => id === teamId)
      if (index === -1) return
      state.teams.splice(index, 1)
    },
    [types.ADD_CHANNEL](state, payload) {
      state.channels.push(payload)
    },
    [types.REMOVE_CHANNEL](state, payload) {
      return payload
      // state.channels.push(payload)
    },
    [types.SET_USERS](state, payload) {
      state.users[payload.team.id] = payload
    },
  },
  actions: {},
})
