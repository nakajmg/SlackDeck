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
import messageModule from "./store/modules/message"
locale.use(lang)
Vue.use(Option)
Vue.use(Select)
Vue.use(Button)
Vue.config.productionTip = false
const saveToLocalStorage = state => {
  const keys = ["tokens", "channels"]
  window.localStorage.setItem(storageKey, JSON.stringify(pick(state, keys)))
}

const registerTeamModule = team_id => {
  store.registerModule(["teams", team_id], teamModule)
}
const registerMessageModule = channelId => {
  store.registerModule(["messages", channelId], messageModule)
}
store.subscribe(async ({ type, payload }, state) => {
  switch (type) {
    case types.ADD_TOKEN:
      // 追加したtokenでteamモジュールを登録
      registerTeamModule(payload.team_id)
      await store.dispatch(`${payload.team_id}/${types.INITIALIZE}`, {
        access_token: payload.access_token,
      })
      return saveToLocalStorage(state)

    case types.ADD_CHANNEL:
      // 追加したチャンネルをモジュール登録
      registerMessageModule(payload.channelId)
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
      // state.channelsがあればmessageモジュールを登録する
      state.channels.forEach(({ channelId }) => {
        registerMessageModule(channelId)
      })
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
