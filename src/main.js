import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"
import types from "./store/types"
import storageKey from "./variables/storageKey"
import pick from "lodash/pick"
import locale from "element-ui/lib/locale"
import lang from "element-ui/lib/locale/lang/ja"
import { Option, Select, Button } from "element-ui"
import teamModule from "./store/modules/team"
import channelModule from "./store/modules/channel"
locale.use(lang)
Vue.use(Option)
Vue.use(Select)
Vue.use(Button)
Vue.config.productionTip = false
const saveToLocalStorage = state => {
  const keys = ["tokens", "channelsOrder"]
  window.localStorage.setItem(storageKey, JSON.stringify(pick(state, keys)))
}

const registerTeamModule = team_id => {
  store.registerModule(["teams", team_id], teamModule)
}
const registerChannelModule = channelId => {
  store.registerModule(["channels", channelId], channelModule)
}
store.subscribe(async ({ type, payload }, state) => {
  switch (type) {
    case types.ADD_TOKEN:
      // 追加したtokenでteamモジュールを登録
      registerTeamModule(payload.team_id)
      await store.dispatch(`${payload.team_id}/${types.INITIALIZE}`, {
        access_token: payload.access_token,
      })
      await store.dispatch(types.CONNECT_RTM, payload)
      return saveToLocalStorage(state)

    case types.ADD_CHANNEL:
      // 追加したチャンネルをモジュール登録
      registerChannelModule(payload.channelId)
      await store.dispatch(`${payload.channelId}/${types.INITIALIZE}`, {
        access_token: state.teams[payload.team_id].access_token,
        channelId: payload.channelId,
      })
      return saveToLocalStorage(state)

    case types.REMOVE_CHANNEL:
      store.unregisterModule(["messages", payload.channelId])
      return saveToLocalStorage(state)

    case types.RESTORE_FROM_LOCAL_STORAGE:
      // localStorageからの復元後
      // tokensがあればteamモジュールに登録したあとteamのinfoを取りに行く
      await Promise.all(
        state.tokens.map(({ team_id, access_token }) => {
          registerTeamModule(team_id)
          return store.dispatch(`${team_id}/${types.INITIALIZE}`, { access_token })
        }),
      )
      // state.channelOrderがあればmessageモジュールを登録する
      await Promise.all(
        state.channelsOrder.map(({ channelId, team_id }) => {
          registerChannelModule(channelId)
          const { access_token } = state.teams[team_id]
          return store.dispatch(`${channelId}/${types.INITIALIZE}`, { access_token, channelId })
        }),
      )
      await Promise.all(
        state.tokens.map(({ team_id, access_token }) => {
          return store.dispatch(types.CONNECT_RTM, { team_id, access_token })
        }),
      )
      // 初期化完了後にAppがコンポーネント表示
      store.commit(types.INITIALIZE)
      return
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
