import types from "../types"
export default {
  namespaced: true,
  state() {
    return {
      messages: [],
      reactions: [],
    }
  },
  mutations: {
    [types.ADD_MESSAGE](state, { message }) {
      state.messages.push(message)
    },
  },
}
