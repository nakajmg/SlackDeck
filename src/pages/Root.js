import Vue from "vue"
import { mapState } from "vuex"
import Signin from "./Signin"
import Teams from "../containers/Teams.vue"
import Channels from "../containers/Channels.vue"
export default Vue.extend({
  name: "Root",
  computed: {
    ...mapState(["initialized"]),
  },
  render() {
    return (
      <div>
        <header>
          <Signin />
        </header>
        <main>{this.initialized ? [<Teams />, <Channels />] : null}</main>
      </div>
    )
  },
})
