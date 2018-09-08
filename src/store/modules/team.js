import deepFreeze from "deep-freeze"
import types from "../types"
import api from "../../utils/api"
import { map, zipObject } from "lodash"
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
    customEmojis(state) {
      return map(state.emojiList, (imageUrl, name) => {
        return {
          name,
          short_names: [name],
          text: "",
          emoticons: [],
          keywords: ["reacji", "slack"],
          imageUrl,
          custom: true,
        }
      })
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
