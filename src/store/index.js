import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import types from "./types"
import api from "../modules/api"
import storageKey from "../variables/storageKey"
import map from "lodash/map"
import cloneDeep from "lodash/cloneDeep"
import includes from "lodash/includes"
import indexOf from "lodash/indexOf"
import deepFreeze from "deep-freeze"
Vue.use(Vuex)
const sockets = new Map()
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
        return state.tokens.push(deepFreeze(payload))
      }
      const tokens = cloneDeep(state.tokens)
      const index = indexOf(tokens, ({ team_id }) => team_id === payload.team_id)
      tokens.splice(index, 1, payload)
      state.tokens = tokens
    },
    [types.ADD_CHANNEL](state, { channelId, team_id }) {
      const channelIds = map(state.channels, ({ channelId }) => channelId)
      if (includes(channelIds, channelId)) return
      state.channels.push(deepFreeze({ channelId, team_id }))
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
  actions: {
    [types.CONNECT_RTM]({ state, commit }, { access_token }) {
      if (sockets.get(access_token)) return Promise.resolve()
      return api(access_token)
        .rtm.connect()
        .then(socket => {
          sockets.set(access_token, socket)
          socket.on("message", event => {
            const message = JSON.parse(event.data)
            if (!state.messages[message.channel]) return
            console.log("messageReceived", message)
            commit(`${message.channel}/${types.ADD_MESSAGE}`, {
              message,
            })
          })

          socket.on("reaction_added", event => {
            console.log(JSON.parse(event.data))
          })

          socket.on("message.message_changed", event => {
            console.log(JSON.parse(event.data))
          })
        })
    },
  },
})
