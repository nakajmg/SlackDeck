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
      emojiList: {},
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
    [types.SET_TEAM_INFO](state, { access_token, teamInfo, channelsList, usersList, emojiList }) {
      state.access_token = access_token
      state.teamInfo = deepFreeze(teamInfo)
      state.channelsList = deepFreeze(channelsList)
      state.usersList = deepFreeze(usersList)
      state.emojiList = deepFreeze(emojiList)
    },
  },
  actions: {
    async [types.INITIALIZE]({ commit }, { access_token }) {
      const _api = api(access_token)
      const [channelsList, teamInfo, usersList, emojiList] = await Promise.all([
        _api.channels.list(),
        _api.team.info(),
        _api.users.list(),
        _api.emoji.list(),
      ])
      return commit(types.SET_TEAM_INFO, {
        access_token,
        channelsList,
        teamInfo,
        usersList,
        emojiList,
      })
    },
  },
}
