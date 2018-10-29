import Vue from "vue"
import locale from "element-ui/lib/locale"
import lang from "element-ui/lib/locale/lang/ja"
import {
  Option,
  Select,
  Button,
  Popover,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
} from "element-ui"

locale.use(lang)
Vue.use(Option)
Vue.use(Select)
Vue.use(Button)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
