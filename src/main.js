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
locale.use(lang)
Vue.use(Option)
Vue.use(Select)
Vue.use(Button)
Vue.config.productionTip = false
const saveToLocalStorage = state => {
  const keys = ["tokens", "channels"]
  window.localStorage.setItem(storageKey, JSON.stringify(pick(state, keys)))
}

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case types.ADD_TOKEN:
      return saveToLocalStorage(state)
    case types.ADD_CHANNEL:
      return saveToLocalStorage(state)
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
