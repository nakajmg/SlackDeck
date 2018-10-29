import Vue from "vue"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faLink, faSignOutAlt, faReply } from "@fortawesome/free-solid-svg-icons"
import { faFilePdf } from "@fortawesome/free-regular-svg-icons/faFilePdf"
import { faFile } from "@fortawesome/free-regular-svg-icons/faFile"
import { faGrinSquint } from "@fortawesome/free-regular-svg-icons/faGrinSquint"
import { faCommentDots } from "@fortawesome/free-regular-svg-icons/faCommentDots"
import { faSlack, faSlackHash } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(
  faSlack,
  faSlackHash,
  faLink,
  faSignOutAlt,
  faGrinSquint,
  faFilePdf,
  faFile,
  faCommentDots,
  faReply,
)

Vue.component("FontAwesomeIcon", FontAwesomeIcon)
