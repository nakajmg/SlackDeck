import Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { faSlack, faSlackHash } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(faSlack, faSlackHash, faLink)

Vue.component("FontAwesomeIcon", FontAwesomeIcon)
