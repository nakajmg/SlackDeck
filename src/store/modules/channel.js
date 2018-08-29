import types from "../types"
import api from "../../modules/api"
import reverse from "lodash/reverse"
import deepFreeze from "deep-freeze"
export default {
  namespaced: true,
  state() {
    return {
      access_token: "",
      channelId: "",
      messages: [],
    }
  },
  mutations: {
    [types.ADD_MESSAGE](state, { message }) {
      state.messages.push(deepFreeze(message))
    },
    [types.SET_INFO](state, { access_token, channelId, messages }) {
      state.access_token = access_token
      state.channelId = channelId
      state.messages = state.messages.concat(deepFreeze(messages))
    },
  },
  actions: {
    async [types.INITIALIZE]({ commit }, { access_token, channelId }) {
      const messages = await api(access_token).channels.history({ channelId })
      commit(types.SET_INFO, {
        channelId,
        access_token,
        messages: reverse(messages),
      })
    },
  },
}
