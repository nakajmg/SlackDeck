import deepFreeze from "deep-freeze"
import types from "../types"
import api from "../../modules/api"
import zipObject from "lodash/zipObject"
import map from "lodash/map"
export default {
  namespaced: true,
  state() {
    return {
      access_token: "",
      teamInfo: {},
      channelsList: [],
      usersList: [],
    }
  },
  getters: {
    users(state) {
      return zipObject(map(state.usersList, ({ id }) => id), state.usersList)
    },
    channels(state) {
      return zipObject(map(state.channelsList, ({ id }) => id), state.channelsList)
    },
  },
  mutations: {
    [types.SET_TEAM_INFO](state, { access_token, teamInfo, channelsList, usersList }) {
      state.access_token = access_token
      state.teamInfo = deepFreeze(teamInfo)
      state.channelsList = deepFreeze(channelsList)
      state.usersList = deepFreeze(usersList)
    },
  },
  actions: {
    async [types.INITIALIZE]({ commit }, { access_token }) {
      const [channelsList, teamInfo, usersList] = await Promise.all([
        api(access_token).channels.list(),
        api(access_token).team.info(),
        api(access_token).users.list(),
      ])
      return commit(types.SET_TEAM_INFO, {
        access_token,
        channelsList,
        teamInfo,
        usersList,
      })
    },
  },
}
