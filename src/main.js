import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import storeSubscriber from "./plugins/store"
import "./registerServiceWorker"
import "./plugins/element-ui"
import "./plugins/fontawesome"
import "./plugins/portal"

Vue.config.productionTip = false
storeSubscriber(store)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app")
