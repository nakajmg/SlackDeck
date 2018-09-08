import Vue from "vue"
import locale from "element-ui/lib/locale"
import lang from "element-ui/lib/locale/lang/ja"
import { Option, Select, Button } from "element-ui"

locale.use(lang)
Vue.use(Option)
Vue.use(Select)
Vue.use(Button)
