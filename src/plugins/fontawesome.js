import Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faLink, faSignOutAlt, faGrinSquint } from "@fortawesome/free-solid-svg-icons"
import { faFilePdf } from "@fortawesome/free-regular-svg-icons/faFilePdf"
import { faFile } from "@fortawesome/free-regular-svg-icons/faFile"
import { faSlack, faSlackHash } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(faSlack, faSlackHash, faLink, faSignOutAlt, faGrinSquint, faFilePdf, faFile)

Vue.component("FontAwesomeIcon", FontAwesomeIcon)
