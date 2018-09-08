import Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faSlack, faSlackHash } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(faSlack, faSlackHash)

Vue.component("FontAwesomeIcon", FontAwesomeIcon)
