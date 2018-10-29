import types from "../types"
import api from "../../utils/api"
import deepFreeze from "deep-freeze"
import { reverse, cloneDeep, findIndex, reject, includes } from "lodash"
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
      message.parent_user_id = parentMessage.user
      state.messages.push(deepFreeze(message))
    },
    [types.UPDATE_MESSAGE](
      state,
      {
        message: { message, previous_message },
      },
    ) {
      const index = findIndex(state.messages, ({ ts }) => ts === previous_message.ts)
      if (index === -1) return
      state.messages.splice(index, 1, deepFreeze(message))
    },
    [types.DELETE_MESSAGE](
      state,
      {
        message: { previous_message },
      },
    ) {
      const index = findIndex(state.messages, ({ ts }) => ts === previous_message.ts)
      if (index === -1) return
      state.messages.splice(index, 1)
    },
    [types.REPLIED_MESSAGE](
      state,
      {
        message: { message },
      },
    ) {
      const index = findIndex(state.messages, ({ ts }) => ts === message.ts)
      if (index === -1) return
      state.messages.splice(index, 1, deepFreeze(message))
    },
    [types.SET_INFO](state, { access_token, channelId, messages }) {
      state.access_token = access_token
      state.channelId = channelId
      state.messages = state.messages.concat(deepFreeze(messages))
    },
    [types.ADD_REACTION](state, { message }) {
      const index = findIndex(state.messages, ({ ts }) => ts === message.item.ts)
      if (index === -1) return
      const prevMessage = cloneDeep(state.messages[index])
      if (!prevMessage.reactions) {
        prevMessage.reactions = [
          {
            count: 1,
            name: message.reaction,
            users: [message.user],
          },
        ]
        return state.messages.splice(index, 1, deepFreeze(prevMessage))
      }
      const reactionIndex = findIndex(
        prevMessage.reactions,
        reaction => reaction.name === message.reaction,
      )
      if (reactionIndex === -1) {
        prevMessage.reactions.push({
          count: 1,
          name: message.reaction,
          users: [message.user],
        })
        return state.messages.splice(index, 1, deepFreeze(prevMessage))
      }
      const prevReaction = prevMessage.reactions[reactionIndex]
      prevReaction.count = prevReaction.count + 1
      if (includes(prevReaction.users, message.user)) return
      prevReaction.users.push(message.user)
      return state.messages.splice(index, 1, deepFreeze(prevMessage))
    },
    [types.REMOVE_REACTION](state, { message }) {
      const index = findIndex(state.messages, ({ ts }) => ts === message.item.ts)
      if (index === -1) return
      const prevMessage = cloneDeep(state.messages[index])
      const reactionIndex = findIndex(
        prevMessage.reactions,
        reaction => reaction.name === message.reaction,
      )
      if (prevMessage.reactions[reactionIndex].count === 1) {
        prevMessage.reactions.splice(reactionIndex, 1)
      } else {
        prevMessage.reactions[reactionIndex].users = reject(
          prevMessage.reactions[reactionIndex].users,
          user => user === message.user,
        )
      }
      return state.messages.splice(index, 1, deepFreeze(prevMessage))
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
    async [types.REACTION_TO_MESSAGE]({ state }, { channelId, ts, name }) {
      await api(state.access_token).reactions.add({
        channel: channelId,
        timestamp: ts,
        name,
      })
    },
    async [types.REACTION_TO_REMOVE]({ state }, { channelId, ts, name }) {
      await api(state.access_token).reactions.remove({
        channel: channelId,
        timestamp: ts,
        name,
      })
    },
    async [types.SUBMIT_MESSAGE]({ state }, { channelId, message }) {
      await api(state.access_token).chat.postMessage({
        channel: channelId,
        text: message,
      })
      console.log(channelId, message)
    },
  },
}
