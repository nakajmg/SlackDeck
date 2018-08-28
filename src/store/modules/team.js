import deepFreeze from "deep-freeze"
import types from "../types"
import api from "../../modules/api"
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
      commit(types.SET_TEAM_INFO, {
        access_token,
        channelsList,
        teamInfo,
        usersList,
      })
    },
  },
}
