import types from "../types"
import api from "../../modules/api"
import reverse from "lodash/reverse"
import deepFreeze from "deep-freeze"
import cloneDeep from "lodash/cloneDeep"
import findIndex from "lodash/findIndex"
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
    [types.ADD_THREAD_MESSAGE](state, { message }) {
      const index = findIndex(state.messages, ({ ts }) => ts === message.thread_ts)
      if (index === -1) {
        message.parent_user_id = message.thread_ts
        return state.messages.push(deepFreeze(message))
      }
      const parentMessage = cloneDeep(state.messages[index])
      parentMessage.replies = parentMessage.replies || []
      parentMessage.replies.push(
        deepFreeze({
          ts: message.ts,
          user: message.user,
        }),
      )
      message.parent_user_id = parentMessage.user
      state.messages.splice(index, 1, deepFreeze(parentMessage))
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
