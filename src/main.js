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
import { Option, Select } from "element-ui"
locale.use(lang)
Vue.use(Option)
Vue.use(Select)
Vue.config.productionTip = false
const saveToLocalStorage = state => {
  const keys = ["teams"]
  window.localStorage.setItem(storageKey, JSON.stringify(pick(state, keys)))
}

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case types.ADD_TEAM:
      return saveToLocalStorage(state)
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
