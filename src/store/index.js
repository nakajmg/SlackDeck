import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import types from "./types"
import api from "../utils/api"
import notification from "../utils/notification"
import storageKey from "../variables/storageKey"
import map from "lodash/map"
import { includes, findIndex, cloneDeep } from "lodash"
import deepFreeze from "deep-freeze"
import registerSocketListeners from "./registerSocketListeners"
Vue.use(Vuex)
const sockets = new Map()
export default new Vuex.Store({
  state,
  modules: {
    teams: {},
    channels: {},
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
      const index = findIndex(tokens, ({ team_id }) => team_id === payload.team_id)
      tokens.splice(index, 1, payload)
      state.tokens = tokens
    },
    [types.ADD_CHANNEL](state, { channelId, team_id }) {
      const channelIds = map(state.channelsOrder, ({ channelId }) => channelId)
      if (includes(channelIds, channelId)) return
      state.channelsOrder.push(deepFreeze({ channelId, team_id }))
    },
    [types.REMOVE_CHANNEL](state, { channelId, team_id }) {
      const index = findIndex(
        state.channelsOrder,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      if (index === -1) return
      state.channelsOrder.splice(index, 1)
    },
    [types.MOVE_LEFT_CHANNEL](state, { channelId, team_id }) {
      const index = findIndex(
        state.channelsOrder,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      if (index === -1 || index === 0) return
      const target = state.channelsOrder[index]
      const prev = state.channelsOrder[index - 1]
      state.channelsOrder.splice(index - 1, 2, target, prev)
    },
    [types.MOVE_RIGHT_CHANNEL](state, { channelId, team_id }) {
      const index = findIndex(
        state.channelsOrder,
        channel => channel.channelId === channelId && channel.team_id === team_id,
      )
      if (index === -1 || index === state.channelsOrder.length - 1) return
      const target = state.channelsOrder[index]
      const prev = state.channelsOrder[index + 1]
      state.channelsOrder.splice(index, 2, prev, target)
    },
  },
  actions: {
    [types.CONNECT_RTM]({ state, commit, dispatch }, { access_token, team_id }) {
      if (sockets.get(access_token)) return Promise.resolve(sockets.get(access_token))
      return api(access_token)
        .rtm.connect()
        .then(socket => {
          sockets.set(access_token, socket)
          registerSocketListeners(socket, { team_id, state, commit, dispatch })
          return socket
        })
    },
    [types.PUSH_NOTIFICATION]({ getters }, { team_id, message }) {
      const user = getters[`${team_id}/users`][message.user]
      if (!user) return
      const title = user.name
      const icon = user.profile.image_72
      const body = message.text
      notification({
        title,
        icon,
        body,
        tag: message.ts,
      })
    },
  },
})
